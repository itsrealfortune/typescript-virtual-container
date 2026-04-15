import { describe, expect, test } from "bun:test";
import { executePipeline } from "../src/SSHMimic/executor";
import { VirtualUserManager } from "../src/SSHMimic/users";
import VirtualFileSystem from "../src/VirtualFileSystem";
import { parseShellPipeline } from "../src/VirtualShell/shellParser";

describe("Pipeline parser and executor", () => {
  test("parses simple pipeline", () => {
    const pipeline = parseShellPipeline("echo hello | grep h");
    expect(pipeline.isValid).toBe(true);
    expect(pipeline.commands).toHaveLength(2);
    expect(pipeline.commands[0]?.name).toBe("echo");
    expect(pipeline.commands[1]?.name).toBe("grep");
  });

  test("handles invalid syntax", () => {
    const pipeline = parseShellPipeline("echo hello |");
    expect(pipeline.isValid).toBe(false);
    expect(pipeline.error).toBeDefined();
  });

  test("executes simple pipeline", async () => {
    const vfs = new VirtualFileSystem("/tmp");
    const users = new VirtualUserManager(vfs, "root-pass");
    const pipeline = parseShellPipeline("echo hello | grep h");

    const result = await executePipeline(
      pipeline,
      "root",
      "localhost",
      users,
      "shell",
      "/",
      vfs,
    );

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("hello");
  });
});