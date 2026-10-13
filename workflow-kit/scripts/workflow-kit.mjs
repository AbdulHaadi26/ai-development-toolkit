#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function classifyPointer(currentSha, latestSha, isAncestor) {
  if (currentSha === latestSha) return "current";
  if (isAncestor(currentSha, latestSha)) return "behind";
  if (isAncestor(latestSha, currentSha)) return "ahead";
  return "diverged";
}

function readVersionAt(ref, toolkitRoot, runGit) {
  try {
    return runGit(["-C", toolkitRoot, "show", `${ref}:workflow-kit/VERSION`]);
  } catch {
    return "unknown";
  }
}

function reportError(message, writeError) {
  writeError(`Workflow toolkit check failed: ${message}`);
  return 1;
}

export function runWorkflowKit(command, options = {}) {
  const runGit = options.runGit ?? ((args, cwd) => git(args, cwd));
  const cwd = options.cwd ?? process.cwd();
  const isInitialized =
    options.isInitialized ?? ((path) => existsSync(resolve(path, ".git")));
  const readVersion =
    options.readVersion ?? ((path) => readFileSync(path, "utf8").trim());
  const write = options.write ?? console.log;
  const writeError = options.writeError ?? console.error;

  if (!new Set(["check", "update"]).has(command)) {
    writeError(
      "Usage: node workflow-kit/scripts/workflow-kit.mjs [check|update]",
    );
    return 2;
  }

  let repositoryRoot;
  try {
    repositoryRoot = runGit(["rev-parse", "--show-toplevel"], cwd);
  } catch {
    return reportError(
      "run this command from inside a Git repository.",
      writeError,
    );
  }

  const toolkitRoot = resolve(repositoryRoot, "workflow-kit");
  if (!isInitialized(toolkitRoot)) {
    return reportError(
      "workflow-kit is missing or is not initialized as a Git submodule. Run `git submodule update --init --recursive workflow-kit`.",
      writeError,
    );
  }

  let targetBranch;
  try {
    targetBranch = runGit([
      "-C",
      repositoryRoot,
      "config",
      "-f",
      ".gitmodules",
      "--get",
      "submodule.workflow-kit.branch",
    ]);
    const activeBranch = runGit([
      "-C",
      repositoryRoot,
      "config",
      "--get",
      "submodule.workflow-kit.branch",
    ]);
    if (!targetBranch || targetBranch !== activeBranch) {
      throw new Error("configured submodule branch is missing or inconsistent");
    }
  } catch {
    return reportError(
      "the workflow-kit branch is missing or differs between .gitmodules and local Git config. Initialize the submodule and configure the intended branch before checking or updating.",
      writeError,
    );
  }

  let currentSha;
  let latestSha;
  try {
    currentSha = runGit(["-C", toolkitRoot, "rev-parse", "HEAD"]);
    runGit(["-C", toolkitRoot, "fetch", "origin", targetBranch]);
    latestSha = runGit(["-C", toolkitRoot, "rev-parse", "FETCH_HEAD"]);
  } catch (error) {
    const details = error.stderr?.toString().trim();
    return reportError(
      `could not read the toolkit pointer or fetch origin/main. Check GitHub access and remote configuration.${details ? ` ${details}` : ""}`,
      writeError,
    );
  }

  const isAncestor = (ancestor, descendant) => {
    try {
      runGit([
        "-C",
        toolkitRoot,
        "merge-base",
        "--is-ancestor",
        ancestor,
        descendant,
      ]);
      return true;
    } catch (error) {
      if (error.status === 1) return false;
      throw error;
    }
  };

  let pointerState;
  try {
    pointerState = classifyPointer(currentSha, latestSha, isAncestor);
  } catch {
    return reportError(
      "could not compare the toolkit commits. Check that both commits are available.",
      writeError,
    );
  }

  let currentVersion;
  try {
    currentVersion = readVersion(resolve(toolkitRoot, "workflow-kit/VERSION"));
  } catch {
    currentVersion = "unknown";
  }
  const latestVersion = readVersionAt(latestSha, toolkitRoot, runGit);
  write(
    `Workflow toolkit pointer: ${currentVersion} (${currentSha.slice(0, 12)})`,
  );
  write(
    `Latest toolkit main:      ${latestVersion} (${latestSha.slice(0, 12)})`,
  );

  if (pointerState === "current") {
    write("The adopted toolkit pointer is current.");
    return 0;
  }

  if (pointerState === "ahead" || pointerState === "diverged") {
    write(
      `The adopted toolkit pointer is ${pointerState} from origin/${targetBranch}. Do not update automatically; resolve the branch relationship with the user.`,
    );
    return 1;
  }

  if (command === "check") {
    write(
      `The adopted toolkit pointer is behind origin/${targetBranch}. Inform the user before updating it; review and update the pointer through a feature branch and PR.`,
    );
    return 1;
  }

  write("Updating the workflow-kit submodule pointer from origin/main...");
  try {
    runGit(
      ["submodule", "update", "--init", "--remote", "--merge", "workflow-kit"],
      repositoryRoot,
    );
  } catch (error) {
    const details = error.stderr?.toString().trim();
    return reportError(
      `Git could not update the submodule. Resolve conflicts or check repository access, then retry.${details ? ` ${details}` : ""}`,
      writeError,
    );
  }

  const updatedSha = runGit(["-C", toolkitRoot, "rev-parse", "HEAD"]);
  let updatedVersion;
  try {
    updatedVersion = readVersion(resolve(toolkitRoot, "workflow-kit/VERSION"));
  } catch {
    updatedVersion = "unknown";
  }
  write(
    `Updated workflow toolkit pointer: ${updatedVersion} (${updatedSha.slice(0, 12)}). Review the submodule diff and commit it on a feature branch.`,
  );
  return 0;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  process.exitCode = runWorkflowKit(process.argv[2] ?? "check");
}
