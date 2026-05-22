import { describe, expect, test } from "bun:test";
import { Baie, VirtualNetworkManager } from "../src";

describe("VirtualNetworkManager - Multiple Interfaces", () => {
	test("addInterface creates new interface", () => {
		const net = new VirtualNetworkManager();
		const result = net.addInterface({
			name: "eth1",
			type: "ether",
			mac: "02:42:ac:11:00:02",
			mtu: 1500,
			ipv4: "192.168.1.2",
			ipv4Mask: 24,
			ipv6: "fe80::1",
		});
		expect(result).toBe(true);
		const ifaces = net.getInterfaces();
		expect(ifaces.some((i) => i.name === "eth1")).toBe(true);
	});

	test("addInterface rejects duplicate names", () => {
		const net = new VirtualNetworkManager();
		expect(net.addInterface({
			name: "eth0",
			type: "ether",
			mac: "02:42:ac:11:00:02",
			mtu: 1500,
			ipv4: "192.168.1.2",
			ipv4Mask: 24,
			ipv6: "fe80::1",
		})).toBe(false);
	});

	test("removeInterface removes interface and related routes", () => {
		const net = new VirtualNetworkManager();
		net.addInterface({
			name: "eth1",
			type: "ether",
			mac: "02:42:ac:11:00:02",
			mtu: 1500,
			ipv4: "192.168.1.2",
			ipv4Mask: 24,
			ipv6: "fe80::1",
		});
		net.addRoute("192.168.1.0", "0.0.0.0", "255.255.255.0", "eth1");
		expect(net.removeInterface("eth1")).toBe(true);
		expect(net.getInterface("eth1")).toBeUndefined();
		expect(net.getRoutes().some((r) => r.device === "eth1")).toBe(false);
	});

	test("cannot remove loopback interface", () => {
		const net = new VirtualNetworkManager();
		expect(net.removeInterface("lo")).toBe(false);
	});

	test("setInterfaceMtu changes MTU", () => {
		const net = new VirtualNetworkManager();
		expect(net.setInterfaceMtu("eth0", 9000)).toBe(true);
		expect(net.getInterface("eth0")?.mtu).toBe(9000);
	});

	test("setInterfaceSpeed stores speed", () => {
		const net = new VirtualNetworkManager();
		expect(net.setInterfaceSpeed("eth0", 10000)).toBe(true);
		expect(net.getInterface("eth0")?.speed).toBe(10000);
	});

	test("getInterface returns undefined for unknown", () => {
		const net = new VirtualNetworkManager();
		expect(net.getInterface("nonexistent")).toBeUndefined();
	});
});

describe("VirtualNetworkManager - Advanced Routing", () => {
	test("addRoute with metric", () => {
		const net = new VirtualNetworkManager();
		net.addRoute("10.10.0.0", "10.0.0.1", "255.255.255.0", "eth0", 200);
		const routes = net.getRoutes();
		const newRoute = routes.find((r) => r.destination === "10.10.0.0");
		expect(newRoute?.metric).toBe(200);
	});

	test("addRoutingTable creates new table", () => {
		const net = new VirtualNetworkManager();
		const id = net.addRoutingTable("custom");
		expect(id).toBeGreaterThan(0);
		const table = net.getRoutingTable(id);
		expect(table).toBeDefined();
		expect(table?.name).toBe("custom");
	});

	test("addRouteToTable adds route to specific table", () => {
		const net = new VirtualNetworkManager();
		const id = net.addRoutingTable("custom");
		expect(net.addRouteToTable("10.10.0.0", "10.0.0.1", "255.255.255.0", "eth0", id)).toBe(true);
		const table = net.getRoutingTable(id);
		expect(table?.routes.length).toBe(1);
	});

	test("addPolicyRule creates rule", () => {
		const net = new VirtualNetworkManager();
		const priority = net.addPolicyRule({
			from: "10.0.0.0/8",
			table: 100,
			action: "lookup",
		});
		expect(priority).toBeGreaterThan(0);
		const rules = net.listPolicyRules();
		expect(rules.length).toBe(1);
		expect(rules[0]?.from).toBe("10.0.0.0/8");
	});

	test("delPolicyRule removes rule", () => {
		const net = new VirtualNetworkManager();
		const priority = net.addPolicyRule({ from: "10.0.0.0/8", table: 100, action: "lookup" });
		expect(net.delPolicyRule(priority)).toBe(true);
		expect(net.listPolicyRules().length).toBe(0);
	});

	test("formatIpRule shows policy rules", () => {
		const net = new VirtualNetworkManager();
		net.addPolicyRule({ from: "10.0.0.0/8", table: 100, action: "lookup" });
		const output = net.formatIpRule();
		expect(output).toContain("from 10.0.0.0/8");
		expect(output).toContain("lookup");
	});

	test("resolveRoute finds matching route", () => {
		const net = new VirtualNetworkManager();
		const result = net.resolveRoute("10.0.0.5");
		expect(result.route).toBeDefined();
		expect(result.table).toBe(254);
	});
});

describe("VirtualNetworkManager - Connection Tracking", () => {
	test("addConntrackEntry creates entry", () => {
		const net = new VirtualNetworkManager();
		const entry = net.addConntrackEntry({
			protocol: "tcp",
			srcIp: "10.0.0.2",
			dstIp: "10.0.0.1",
			srcPort: 12345,
			dstPort: 80,
			state: "NEW",
		});
		expect(entry).not.toBeNull();
		expect(net.getConntrackCount()).toBe(1);
	});

	test("updateConntrack updates existing entry", () => {
		const net = new VirtualNetworkManager();
		net.addConntrackEntry({
			protocol: "tcp",
			srcIp: "10.0.0.2",
			dstIp: "10.0.0.1",
			srcPort: 12345,
			dstPort: 80,
			state: "NEW",
		});
		net.updateConntrack("10.0.0.2", "10.0.0.1", "tcp", 12345, 80, 100);
		expect(net.getConntrackCount()).toBe(1);
	});

	test("flushConntrack clears all entries", () => {
		const net = new VirtualNetworkManager();
		net.addConntrackEntry({ protocol: "tcp", srcIp: "10.0.0.2", dstIp: "10.0.0.1", state: "NEW" });
		net.flushConntrack();
		expect(net.getConntrackCount()).toBe(0);
	});

	test("getConntrackMax returns default", () => {
		const net = new VirtualNetworkManager();
		expect(net.getConntrackMax()).toBe(65536);
	});

	test("setConntrackMax changes limit", () => {
		const net = new VirtualNetworkManager();
		net.setConntrackMax(1000);
		expect(net.getConntrackMax()).toBe(1000);
	});

	test("formatConntrack returns formatted output", () => {
		const net = new VirtualNetworkManager();
		net.addConntrackEntry({
			protocol: "tcp",
			srcIp: "10.0.0.2",
			dstIp: "10.0.0.1",
			srcPort: 12345,
			dstPort: 80,
			state: "ESTABLISHED",
		});
		const output = net.formatConntrack();
		expect(output).toContain("tcp");
		expect(output).toContain("10.0.0.2");
		expect(output).toContain("ESTABLISHED");
	});
});

describe("VirtualSwitch - Bandwidth Enforcement", () => {
	test("bandwidth limit allows small packets", async () => {
		const baie = new Baie("bw-test", "10.0.1.0/24");
		void baie.createVM("test");
		const port = baie.switch.getPorts().values().next().value;
		if (!port) return;

		baie.switch.setTrafficRule(port.mac, {
			vms: ["test"],
			maxBandwidthMbps: 100,
		});

		const result = await baie.switch.route({
			srcIp: port.ip,
			srcMac: port.mac,
			dstIp: "10.0.1.3",
			protocol: "tcp",
			payload: "small",
			size: 64,
		});

		expect(result.action).toBe("ACCEPT");
		baie.switch.removeTrafficRule(port.mac);
	});
});

describe("VirtualSwitch - Qdisc Rules", () => {
	test("addQdiscRule stores rule", () => {
		const baie = new Baie("qdisc", "10.0.1.0/24");
		baie.switch.addQdiscRule("test-mac", {
			interface: "eth0",
			type: "netem",
			latencyMs: 50,
			jitterMs: 10,
			packetLossPct: 1,
		});
		const rules = baie.switch.getQdiscRules("test-mac");
		expect(rules.length).toBe(1);
		expect(rules[0]?.latencyMs).toBe(50);
	});

	test("removeQdiscRule removes specific interface", () => {
		const baie = new Baie("qdisc2", "10.0.1.0/24");
		baie.switch.addQdiscRule("test-mac", { interface: "eth0", type: "netem", latencyMs: 50 });
		baie.switch.addQdiscRule("test-mac", { interface: "eth1", type: "tbf", rateMbps: 10 });
		baie.switch.removeQdiscRule("test-mac", "eth0");
		const rules = baie.switch.getQdiscRules("test-mac");
		expect(rules.length).toBe(1);
		expect(rules[0]?.interface).toBe("eth1");
	});

	test("removeQdiscRule without interface removes all", () => {
		const baie = new Baie("qdisc3", "10.0.1.0/24");
		baie.switch.addQdiscRule("test-mac", { interface: "eth0", type: "netem" });
		baie.switch.removeQdiscRule("test-mac");
		expect(baie.switch.getQdiscRules("test-mac").length).toBe(0);
	});
});

describe("VirtualSwitch - Packet Reordering", () => {
	test("reorderPct can mark packets as reordered", async () => {
		const baie = new Baie("reorder", "10.0.1.0/24");
		void baie.createVM("test");
		const port = baie.switch.getPorts().values().next().value;
		if (!port) return;

		baie.switch.addQdiscRule(port.mac, {
			interface: "eth0",
			type: "netem",
			latencyMs: 10,
			reorderPct: 100,
		});

		const result = await baie.switch.route({
			srcIp: port.ip,
			srcMac: port.mac,
			dstIp: "10.0.1.3",
			protocol: "tcp",
			payload: "test",
		});

		expect(result.reordered).toBe(true);
	});
});

describe("VirtualSwitch - MTU Enforcement", () => {
	test("packet exceeding MTU is dropped", async () => {
		const baie = new Baie("mtu", "10.0.1.0/24");
		void baie.createVM("test");
		const port = baie.switch.getPorts().values().next().value;
		if (!port) return;

		const result = await baie.switch.route({
			srcIp: port.ip,
			srcMac: port.mac,
			dstIp: "10.0.1.3",
			protocol: "tcp",
			payload: "x".repeat(2000),
			size: 2000,
		});

		expect(result.action).toBe("DROP");
		expect(result.fragmented).toBe(true);
	});
});

describe("VirtualSwitch - Gaussian Jitter", () => {
	test("jitterMs adds variable latency", async () => {
		const baie = new Baie("jitter", "10.0.1.0/24");
		void baie.createVM("test");
		const port = baie.switch.getPorts().values().next().value;
		if (!port) return;

		baie.switch.setTrafficRule(port.mac, {
			vms: ["test"],
			latencyMs: 100,
			jitterMs: 50,
		});

		const latencies: number[] = [];
		for (let i = 0; i < 5; i++) {
			const start = performance.now();
			await baie.switch.route({
				srcIp: port.ip,
				srcMac: port.mac,
				dstIp: "10.0.1.3",
				protocol: "tcp",
			});
			latencies.push(performance.now() - start);
		}

		baie.switch.removeTrafficRule(port.mac);

		const min = Math.min(...latencies);
		const max = Math.max(...latencies);
		expect(min).toBeGreaterThan(50);
		expect(max).toBeGreaterThan(min);
	});
});

describe("Baie - getNetwork access", () => {
	test("switch.getNetwork returns VirtualNetworkManager", () => {
		const baie = new Baie("net-access", "10.0.1.0/24");
		const net = baie.switch.getNetwork();
		expect(net).toBeDefined();
		expect(net.getInterfaces().length).toBeGreaterThan(0);
	});
});
