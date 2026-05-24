import {afterEach, describe, expect, test, beforeAll} from "bun:test";
import {Baie, VirtualProxy} from "../src";

async function waitForListen(): Promise<void> {
	await new Promise((r) => setTimeout(r, 100));
}

describe("VirtualProxy", () => {
	let baie: Baie;
	let proxy: VirtualProxy;

	beforeAll(async () => {
		baie = new Baie("proxy-test", "10.0.42.0/24");
		await baie.createVM("web");
		proxy = new VirtualProxy(baie);
	});

	afterEach(() => {
		proxy.stop();
	});

	test("listPorts returns empty initially", () => {
		expect(proxy.listPorts()).toHaveLength(0);
	});

	test("exposePort creates a forwarding rule", async () => {
		proxy.exposePort("web", 80, 0);
		await waitForListen();

		const ports = proxy.listPorts();
		expect(ports).toHaveLength(1);
		expect(ports[0]!.vmName).toBe("web");
		expect(ports[0]!.vmPort).toBe(80);
	});

	test("exposePort replaces existing rule on same hostPort", async () => {
		proxy.exposePort("web", 80, 9999);
		await waitForListen();
		expect(proxy.listPorts()).toHaveLength(1);

		proxy.exposePort("web", 8080, 9999);
		await waitForListen();
		const ports = proxy.listPorts();
		expect(ports).toHaveLength(1);
		expect(ports[0]!.vmPort).toBe(8080);
	});

	test("removePort removes forwarding rule", async () => {
		proxy.exposePort("web", 80, 9998);
		await waitForListen();
		expect(proxy.listPorts()).toHaveLength(1);

		proxy.removePort(9998);
		expect(proxy.listPorts()).toHaveLength(0);
	});

	test("removePort on nonexistent port does nothing", async () => {
		proxy.exposePort("web", 80, 9997);
		await waitForListen();
		proxy.removePort(99999);
		expect(proxy.listPorts()).toHaveLength(1);
	});

	test("stop clears all ports", async () => {
		proxy.exposePort("web", 80, 9996);
		await waitForListen();
		proxy.exposePort("web", 443, 9995);
		await waitForListen();
		expect(proxy.listPorts()).toHaveLength(2);

		proxy.stop();
		expect(proxy.listPorts()).toHaveLength(0);
	});

	test("exposePort with unknown VM does not crash", async () => {
		proxy.exposePort("nonexistent", 80, 9994);
		await waitForListen();
		const ports = proxy.listPorts();
		expect(ports).toHaveLength(1);
		expect(ports[0]!.vmName).toBe("nonexistent");
	});
});
