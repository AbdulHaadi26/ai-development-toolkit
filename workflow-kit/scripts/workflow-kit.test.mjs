import assert from "node:assert/strict";
import { runWorkflowKit } from "./workflow-kit.mjs";

const tests = [];
function test(name, callback) {
  tests.push({ name, callback });
}

const root = "C:/consumer";
const toolkitRoot = `${root}/workflow-kit`;
const currentSha = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const latestSha = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

function createHarness(
  state,
  { fetchFails = false, branchMismatch = false } = {},
) {
  const calls = [];
  const output = [];
  const errors = [];
  let pointer = currentSha;

  function runGit(args) {
    calls.push(args);
    if (args[0] === "rev-parse" && args[1] === "--show-toplevel") return root;
    if (
      args.includes("--get") &&
      args.at(-1) === "submodule.workflow-kit.branch"
    ) {
      if (args.includes("-f")) return "main";
      if (branchMismatch) return "release";
      const error = new Error("branch not configured locally");
      error.status = 1;
      throw error;
    }
    if (args.includes("fetch")) {
      if (fetchFails) throw new Error("network unavailable");
      return "";
    }
    if (args.includes("FETCH_HEAD"))
      return state === "current" ? currentSha : latestSha;
    if (args.includes("rev-parse") && args.includes("HEAD")) return pointer;
    if (args.includes("merge-base")) {
      const ancestor = args.at(-2);
      const descendant = args.at(-1);
      const isAncestor =
        state === "current"
          ? ancestor === currentSha && descendant === currentSha
          : state === "behind"
            ? ancestor === currentSha && descendant === latestSha
            : state === "ahead"
              ? ancestor === latestSha && descendant === currentSha
              : false;
      if (isAncestor) return "";
      const error = new Error("not an ancestor");
      error.status = 1;
      throw error;
    }
    if (args.includes("show")) return "1.1.0";
    if (args.includes("submodule.workflow-kit.branch")) return "";
    if (args[0] === "submodule" && args[1] === "update") {
      pointer = latestSha;
      return "";
    }
    throw new Error(`Unexpected git command: ${args.join(" ")}`);
  }

  return {
    calls,
    output,
    errors,
    options: {
      cwd: root,
      runGit,
      isInitialized: () => true,
      readVersion: () => "1.1.0",
      write: (message) => output.push(message),
      writeError: (message) => errors.push(message),
    },
  };
}

test("check reports a current pointer without updating it", () => {
  const harness = createHarness("current");
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 0);
  assert.ok(harness.output.some((line) => line.includes("pointer is current")));
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("check fetches the branch from .gitmodules when local config is unset", () => {
  const harness = createHarness("behind");
  runWorkflowKit("check", harness.options);

  assert.ok(
    harness.calls.some(
      (args) => args.includes("fetch") && args.at(-1) === "main",
    ),
  );
});

test("check reports a pointer behind main without updating it", () => {
  const harness = createHarness("behind");
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 1);
  assert.ok(harness.output.some((line) => line.includes("behind origin/main")));
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("check identifies an ahead pointer without suggesting an update", () => {
  const harness = createHarness("ahead");
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 1);
  assert.ok(harness.output.some((line) => line.includes("pointer is ahead")));
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("check identifies a diverged pointer without updating it", () => {
  const harness = createHarness("diverged");
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 1);
  assert.ok(
    harness.output.some((line) => line.includes("pointer is diverged")),
  );
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("update advances only a pointer behind main and initializes local branch config", () => {
  const harness = createHarness("behind");
  const result = runWorkflowKit("update", harness.options);

  assert.equal(result, 0);
  assert.equal(
    harness.calls.filter((args) => args[0] === "submodule").length,
    1,
  );
  assert.ok(
    harness.calls.some(
      (args) =>
        args.includes("config") &&
        args.includes("submodule.workflow-kit.branch") &&
        args.at(-1) === "main",
    ),
  );
  assert.ok(
    harness.output.some((line) => line.includes(latestSha.slice(0, 12))),
  );
});

test("update does not merge an ahead pointer", () => {
  const harness = createHarness("ahead");
  const result = runWorkflowKit("update", harness.options);

  assert.equal(result, 1);
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("update does not merge a diverged pointer", () => {
  const harness = createHarness("diverged");
  const result = runWorkflowKit("update", harness.options);

  assert.equal(result, 1);
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("update is a no-op for a current pointer", () => {
  const harness = createHarness("current");
  const result = runWorkflowKit("update", harness.options);

  assert.equal(result, 0);
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("check rejects a conflicting local branch override", () => {
  const harness = createHarness("current", { branchMismatch: true });
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 1);
  assert.ok(harness.errors[0].includes("override differs"));
  assert.equal(
    harness.calls.some((args) => args.includes("fetch")),
    false,
  );
});

test("fetch failure reports an actionable error and exits non-zero", () => {
  const harness = createHarness("current", { fetchFails: true });
  const result = runWorkflowKit("check", harness.options);

  assert.equal(result, 1);
  assert.ok(
    harness.errors.some((line) => line.includes("Check GitHub access")),
  );
  assert.equal(
    harness.calls.some((args) => args[0] === "submodule"),
    false,
  );
});

test("invalid commands show usage without invoking Git", () => {
  const harness = createHarness("current");
  const result = runWorkflowKit("unexpected", harness.options);

  assert.equal(result, 2);
  assert.ok(harness.errors[0].includes("Usage:"));
  assert.equal(harness.calls.length, 0);
});

let failed = false;
for (const { name, callback } of tests) {
  try {
    callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${name}`);
    console.error(error);
  }
}

console.log(
  `${tests.length - Number(failed)} of ${tests.length} tests passed.`,
);
if (failed) process.exitCode = 1;
