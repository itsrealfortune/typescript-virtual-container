/** Request from host to worker to execute a command. */
export interface ExecRequest {
	type: "exec";
	id: string;
	cmd: string;
	user: string;
	cwd: string;
}

/** Request from host to worker to initialize. */
export interface InitRequest {
	type: "init";
}

/** Request from host to worker to terminate. */
export interface TerminateRequest {
	type: "terminate";
}

/** Union of all messages the host sends to the worker. */
export type HostMessage = ExecRequest | InitRequest | TerminateRequest;

/** Response from worker indicating it is ready. */
export interface ReadyResponse {
	type: "ready";
}

/** Response from worker with command execution result. */
export interface ExecResponse {
	type: "result";
	id: string;
	exitCode: number;
	stdout: string;
	stderr: string;
}

/** Response from worker with an error. */
export interface ErrorResponse {
	type: "error";
	id: string;
	message: string;
}

/** Union of all messages the worker sends to the host. */
export type WorkerMessage = ReadyResponse | ExecResponse | ErrorResponse;
