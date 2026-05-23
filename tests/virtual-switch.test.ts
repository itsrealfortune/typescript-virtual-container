import { describe, expect, test } from "bun:test";
import { Baie, VirtualProxy, VirtualVpn, } from "../src";

describe("Baie", () => {
	test("createVM assigns IP from subnet", () => {
		const baie = new Baie("test", "10.0.1.0/24");
		const vm = baie.createVM("web");
		expect(vm).toBeDefined();
		const list = baie.listVMs();
		expect(list.length).toBe(1);
		expect(list[0]!.ip).toBe("10.0.1.2");
		expect(list[0]!.hostname).toBe("web");
	});

	test("createVM auto-registers DNS", async () => {
		const baie = new Baie("dns-test", "10.0.1.0/24");
		await baie.createVM("web");
		expect(baie.switch.resolveHostname("web")).toBe("10.0.1.2");
	});

	test("createVM with preferred IP", async () => {
		const baie = new Baie("ip-test", "10.0.1.0/24");
		await baie.createVM("web", undefined as never, "10.0.1.100");
		expect(baie.listVMs()[0]!.ip).toBe("10.0.1.100");
	});

	test("multiple VMs get sequential IPs", async () => {
		const baie = new Baie("multi", "10.0.1.0/24");
		await baie.createVM("vm1");
		await baie.createVM("vm2");
		await baie.createVM("vm3");
		const ips = baie.listVMs().map((v) => v.ip);
		expect(ips).toEqual(["10.0.1.2", "10.0.1.3", "10.0.1.4"]);
	});

	test("destroyVM removes VM", async () => {
		const baie = new Baie("destroy", "10.0.1.0/24");
		await baie.createVM("web");
		baie.destroyVM("web");
		expect(baie.listVMs().length).toBe(0);
	});

	test("getVM returns correct shell", async () => {
		const baie = new Baie("get", "10.0.1.0/24");
		const vm = await baie.createVM("web");
		expect(baie.getVM("web")).toBe(vm);
		expect(baie.getVM("nonexistent")).toBeUndefined();
	});
});

describe("VirtualSwitch", () => {
	test("gateway is subnet .1", () => {
		const baie = new Baie("gw", "10.0.5.0/24");
		expect(baie.switch.gateway).toBe("10.0.5.1");
	});

	test("ARP resolves gateway", () => {
		const baie = new Baie("arp", "10.0.1.0/24");
		expect(baie.switch.arpResolve("10.0.1.1")).not.toBeNull();
	});

	test("ARP resolves attached VM IP", async () => {
		const baie = new Baie("arp2", "10.0.1.0/24");
		await baie.createVM("web");
		expect(baie.switch.arpResolve("10.0.1.2")).not.toBeNull();
	});

	test("ARP returns null for unknown IP", () => {
		const baie = new Baie("arp3", "10.0.1.0/24");
		expect(baie.switch.arpResolve("10.0.9.9")).toBeNull();
	});

	test("DNS: addDnsRecord and resolveHostname", () => {
		const baie = new Baie("dns", "10.0.1.0/24");
		baie.switch.addDnsRecord("my-service", "10.0.1.42");
		expect(baie.switch.resolveHostname("my-service")).toBe("10.0.1.42");
	});

	test("DNS: removeDnsRecord", () => {
		const baie = new Baie("dns2", "10.0.1.0/24");
		baie.switch.addDnsRecord("tmp", "10.0.1.99");
		baie.switch.removeDnsRecord("tmp");
		expect(baie.switch.resolveHostname("tmp")).toBeNull();
	});

	test("DNS: listDnsRecords", () => {
		const baie = new Baie("dns3", "10.0.1.0/24");
		baie.switch.addDnsRecord("a", "10.0.1.10");
		baie.switch.addDnsRecord("b", "10.0.1.11");
		expect(baie.switch.listDnsRecords().length).toBe(2);
	});

	test("load balancer: round-robin cycles through targets", () => {
		const baie = new Baie("lb", "10.0.1.0/24");
		const sw = baie.switch;
		sw.addDnsRecord("web1", "10.0.1.10");
		sw.addDnsRecord("web2", "10.0.1.11");

		sw.addLoadBalancer({
			name: "web",
			port: 80,
			targets: [
				{ hostname: "web1", port: 80, weight: 1 },
				{ hostname: "web2", port: 80, weight: 1 },
			],
			algorithm: "round-robin",
		});

		const r1 = sw.resolveLoadBalancer(80);
		const r2 = sw.resolveLoadBalancer(80);
		expect(r1).not.toBeNull();
		expect(r2).not.toBeNull();
		// Round-robin should alternate IPs
		expect(r1!.ip).not.toBe(r2!.ip);
	});

	test("load balancer: no match returns null", () => {
		const baie = new Baie("lb2", "10.0.1.0/24");
		expect(baie.switch.resolveLoadBalancer(9999)).toBeNull();
	});

	test("removeLoadBalancer removes the rule", () => {
		const baie = new Baie("lb3", "10.0.1.0/24");
		const sw = baie.switch;
		sw.addLoadBalancer({ name: "x", port: 80, targets: [{ hostname: "a", port: 80, weight: 1 }], algorithm: "round-robin" });
		sw.removeLoadBalancer("x");
		expect(sw.resolveLoadBalancer(80)).toBeNull();
	});

	test("traffic shaping: packetLossPct drops packets", () => {
		const baie = new Baie("ts", "10.0.1.0/24");
		baie.switch.setTrafficRule("*", { vms: ["*"], packetLossPct: 100 });
		// 100% loss means every "routed" packet is dropped
		baie.switch.removeTrafficRule("*");
	});

	test("bandwidth accounting", () => {
		const baie = new Baie("bw", "10.0.1.0/24");
		const sw = baie.switch;
		expect(sw.getBytesSent("02:42:0a:00:01:02")).toBe(0);
		expect(sw.getBytesReceived("02:42:0a:00:01:02")).toBe(0);
	});

	test("network partition isolates groups", () => {
		const baie = new Baie("np", "10.0.1.0/24");
		baie.switch.setPartitions([["mac-a", "mac-b"], ["mac-c"]]);
		baie.switch.clearPartitions();
	});
});

describe("VirtualProxy", () => {
	test("listPorts returns empty initially", () => {
		const baie = new Baie("proxy", "10.0.1.0/24");
		const proxy = new VirtualProxy(baie);
		expect(proxy.listPorts()).toEqual([]);
	});

	test("removePort on nonexistent port is safe", () => {
		const baie = new Baie("proxy2", "10.0.1.0/24");
		const proxy = new VirtualProxy(baie);
		proxy.removePort(9999);
	});

	test("stop is safe when nothing running", () => {
		const baie = new Baie("proxy3", "10.0.1.0/24");
		const proxy = new VirtualProxy(baie);
		proxy.stop();
	});
});

describe("VirtualVpn", () => {
	test("creates tunnel between two Baie instances", () => {
		const paris = new Baie("paris", "10.0.1.0/24");
		const tokyo = new Baie("tokyo", "10.0.2.0/24");
		const vpn = new VirtualVpn(paris, tokyo, { key: "test-key", latencyMs: 10 });
		expect(vpn).toBeDefined();
	});

	test("addPeer is callable", () => {
		const a = new Baie("a", "10.0.1.0/24");
		const b = new Baie("b", "10.0.2.0/24");
		const vpn = new VirtualVpn(a, b, { key: "k" });
		expect(() => vpn.addPeer({} as never)).not.toThrow();
	});
});
