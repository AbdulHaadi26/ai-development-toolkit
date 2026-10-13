#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const command = process.argv[2] ?? "check";
const validCommands = new Set(["check", "update"]);

if (!validCommands.has(command)) {
  console.error(
    "Usage: node workflow-kit/scripts/workflow-kit.mjs [check|update]",
  );
  process.exit(2);
}

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function readVersionAt(ref, toolkitRoot) {
  try {
    return git(["show", `${ref}:workflow-kit/VERSION`], toolkitRoot);
  } catch {
    return "unknown";
  }
}

function reportFailure(message) {
  console.error(`Workflow toolkit check failed: ${message}`);
  process.exit(1);
}

let repositoryRoot;
try {
  repositoryRoot = git(["rev-parse", "--show-toplevel"], process.cwd());
} catch {
  reportFailure("run this command from inside a Git repository.");
}

const toolkitRoot = resolve(repositoryRoot, "workflow-kit");
if (!existsSync(resolve(toolkitRoot, ".git"))) {
  reportFailure(
    "workflow-kit is missing or is not initialized as a Git submodule. Run `git submodule update --init --recursive workflow-kit`.",
  );
}

let currentSha;
try {
  currentSha = git(["-C", toolkitRoot, "rev-parse", "HEAD"]);
  git(["-C", toolkitRoot, "fetch", "origin", "main"]);
} catch (error) {
  reportFailure(
    `could not read the toolkit pointer or fetch origin/main. Check GitHub access and remote configuration. ${error.stderr?.toString().trim() ?? ""}`,
  );
}

let latestSha;
try {
  latestSha = git(["-C", toolkitRoot, "rev-parse", "FETCH_HEAD"]);
} catch {
  reportFailure(
    "origin/main was fetched, but its commit could not be resolved.",
  );
}

const currentVersion = existsSync(resolve(toolkitRoot, "workflow-kit/VERSION"))
  ? readFileSync(resolve(toolkitRoot, "workflow-kit/VERSION"), "utf8").trim()
  : "unknown";
const latestVersion = readVersionAt(latestSha, toolkitRoot);
const isOutdated = currentSha !== latestSha;

console.log(
  `Workflow toolkit pointer: ${currentVersion} (${currentSha.slice(0, 12)})`,
);
console.log(
  `Latest toolkit main:      ${latestVersion} (${latestSha.slice(0, 12)})`,
);

if (command === "check") {
  if (isOutdated) {
    console.log(
      "The adopted toolkit pointer is outdated. Inform the user before updating it; review and update the pointer through a feature branch and PR.",
    );
  } else {
    console.log("The adopted toolkit pointer is current.");
  }
  process.exitCode = isOutdated ? 1 : 0;
} else {
  if (!isOutdated) {
    console.log("No toolkit pointer update is needed.");
    process.exit(0);
  }

  console.log(
    "Updating the workflow-kit submodule pointer from origin/main...",
  );
  try {
    git(
      ["submodule", "update", "--init", "--remote", "--merge", "workflow-kit"],
      repositoryRoot,
    );
  } catch (error) {
    reportFailure(
      `Git could not update the submodule. Resolve conflicts or check repository access, then retry. ${error.stderr?.toString().trim() ?? ""}`,
    );
  }

  const updatedSha = git(["-C", toolkitRoot, "rev-parse", "HEAD"]);
  const updatedVersion = existsSync(
    resolve(toolkitRoot, "workflow-kit/VERSION"),
  )
    ? readFileSync(resolve(toolkitRoot, "workflow-kit/VERSION"), "utf8").trim()
    : "unknown";
  console.log(
    `Updated workflow toolkit pointer: ${updatedVersion} (${updatedSha.slice(0, 12)}). Review the submodule diff and commit it on a feature branch.`,
  );
}
