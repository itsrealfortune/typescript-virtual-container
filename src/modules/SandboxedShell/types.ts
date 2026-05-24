export interface ExecRequest {
	type: "exec";
	id: string;
	cmd: string;
	user: string;
	cwd: string;
}

export interface InitRequest {
	type: "init";
}

export interface TerminateRequest {
	type: "terminate";
}

export type HostMessage = ExecRequest | InitRequest | TerminateRequest;

export interface ReadyResponse {
	type: "ready";
}

export interface ExecResponse {
	type: "result";
	id: string;
	exitCode: number;
	stdout: string;
	stderr: string;
}

export interface ErrorResponse {
	type: "error";
	id: string;
	message: string;
}

export type WorkerMessage = ReadyResponse | ExecResponse | ErrorResponse;
