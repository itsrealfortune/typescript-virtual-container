/**
 * biome-ignore-all lint/suspicious/noTemplateCurlyInString: shell tokens
 */
import { describe, expect, test } from "bun:test";
import { tokenizeCommand } from "../src/utils/tokenize";

describe("tokenizeCommand", () => {
	test("simple command", () => {
		expect(tokenizeCommand("echo hello world")).toEqual(["echo", "hello", "world"]);
	});

	test("single quotes preserve spaces", () => {
		expect(tokenizeCommand("echo 'hello world'")).toEqual(["echo", "hello world"]);
	});

	test("double quotes preserve spaces", () => {
		expect(tokenizeCommand('echo "hello world"')).toEqual(["echo", "hello world"]);
	});

	test("backslash before space is literal backslash", () => {
		expect(tokenizeCommand("echo hello\\ world")).toEqual(["echo", "hello\\", "world"]);
	});

	test("pipes", () => {
		expect(tokenizeCommand("cat file | grep foo")).toEqual(["cat", "file", "|", "grep", "foo"]);
	});

	test("pipe with stderr", () => {
		expect(tokenizeCommand("cmd |& grep foo")).toEqual(["cmd", "|&", "grep", "foo"]);
	});

	test("stdout redirect", () => {
		expect(tokenizeCommand("echo foo > out")).toEqual(["echo", "foo", ">", "out"]);
	});

	test("append redirect", () => {
		expect(tokenizeCommand("echo foo >> out")).toEqual(["echo", "foo", ">>", "out"]);
	});

	test("stderr redirect", () => {
		expect(tokenizeCommand("cmd 2> err")).toEqual(["cmd", "2>", "err"]);
	});

	test("stderr append redirect", () => {
		expect(tokenizeCommand("cmd 2>> err")).toEqual(["cmd", "2>>", "err"]);
	});

	test("stderr to stdout", () => {
		expect(tokenizeCommand("cmd 2>&1")).toEqual(["cmd", "2>&1"]);
	});

	test("stderr append to stdout", () => {
		expect(tokenizeCommand("cmd 2>>&1")).toEqual(["cmd", "2>>&1"]);
	});

	test("heredoc", () => {
		expect(tokenizeCommand("cat << EOF")).toEqual(["cat", "<<", "EOF"]);
	});

	test("heredoc with dash", () => {
		expect(tokenizeCommand("cat <<- EOF")).toEqual(["cat", "<<-", "EOF"]);
	});

	test("here string", () => {
		expect(tokenizeCommand("cat <<< text")).toEqual(["cat", "<<<", "text"]);
	});

	test("logical AND", () => {
		expect(tokenizeCommand("cmd1 && cmd2")).toEqual(["cmd1", "&&", "cmd2"]);
	});

	test("logical OR", () => {
		expect(tokenizeCommand("cmd1 || cmd2")).toEqual(["cmd1", "||", "cmd2"]);
	});

	test("background", () => {
		expect(tokenizeCommand("cmd &")).toEqual(["cmd", "&"]);
	});

	test("subshell parentheses are kept as part of tokens", () => {
		expect(tokenizeCommand("(cmd1; cmd2)")).toEqual(["(cmd1;", "cmd2)"]);
	});

	test("read-write redirect", () => {
		expect(tokenizeCommand("cmd <> file")).toEqual(["cmd", "<>", "file"]);
	});

	test("stdin redirect", () => {
		expect(tokenizeCommand("cmd < input")).toEqual(["cmd", "<", "input"]);
	});

	test("empty input", () => {
		expect(tokenizeCommand("")).toEqual([]);
	});

	test("only spaces", () => {
		expect(tokenizeCommand("   ")).toEqual([]);
	});

	test("tabs are not whitespace for tokenizer", () => {
		expect(tokenizeCommand("echo\tfoo\tbar")).toEqual(["echo\tfoo\tbar"]);
	});

	test("multiple redirects", () => {
		expect(tokenizeCommand("cmd < in > out 2> err")).toEqual([
			"cmd", "<", "in", ">", "out", "2>", "err",
		]);
	});

	test("quoted string with special chars", () => {
		expect(tokenizeCommand('echo "foo > bar"')).toEqual(["echo", "foo > bar"]);
	});

	test("mixed quotes and redirects", () => {
		expect(tokenizeCommand('echo "hello" > out')).toEqual(["echo", "hello", ">", "out"]);
	});

	test("variable in double quotes preserved", () => {
		expect(tokenizeCommand('echo "$HOME"')).toEqual(["echo", "$HOME"]);
	});
});
