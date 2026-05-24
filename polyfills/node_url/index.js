/**
 * Polyfill for `node:url` — browser environments (esbuild-compatible).
 */

const _URL = globalThis.URL;
const _URLSearchParams = globalThis.URLSearchParams;

export { _URL as URL, _URLSearchParams as URLSearchParams };

export function fileURLToPath(url) {
	const u = typeof url === "string" ? new _URL(url) : url;
	if (u.protocol !== "file:") {
		throw new TypeError(`The URL must use the file: protocol. Got "${u.protocol}"`);
	}
	return decodeURIComponent(u.pathname);
}

export function pathToFileURL(path) {
	const normalised = path.startsWith("/") ? path : `/${path}`;
	return new _URL(`file://${normalised}`);
}

export function format(urlOrOptions) {
	if (typeof urlOrOptions === "string") return urlOrOptions;
	return urlOrOptions.href;
}

export function resolve(from, to) {
	const base =
		from.startsWith("file://") || from.startsWith("http")
			? from
			: new _URL(from, globalThis.location?.href ?? "file:///").href;
	return new _URL(to, base).href;
}