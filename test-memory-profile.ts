import VirtualFileSystem from "./src/VirtualFileSystem";

type Usage = ReturnType<typeof process.memoryUsage>;

function toMb(bytes: number): number {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

function printUsage(label: string, usage: Usage): void {
  console.log(label, {
    rssMb: toMb(usage.rss),
    heapTotalMb: toMb(usage.heapTotal),
    heapUsedMb: toMb(usage.heapUsed),
    externalMb: toMb(usage.external),
    arrayBuffersMb: toMb(usage.arrayBuffers),
  });
}

function printDiff(label: string, before: Usage, after: Usage): void {
  console.log(label, {
    rssMb: toMb(after.rss - before.rss),
    heapTotalMb: toMb(after.heapTotal - before.heapTotal),
    heapUsedMb: toMb(after.heapUsed - before.heapUsed),
    externalMb: toMb(after.external - before.external),
    arrayBuffersMb: toMb(after.arrayBuffers - before.arrayBuffers),
  });
}

const vfs = new VirtualFileSystem();

const start = process.memoryUsage();
printUsage("[1] before restoreMirror", start);

await vfs.restoreMirror();

const afterRestore = process.memoryUsage();
printUsage("[2] after restoreMirror", afterRestore);
printDiff("[delta] restoreMirror", start, afterRestore);

const home = vfs.list("/home");
console.log("Listed /home:", home.length, "items");

const afterList = process.memoryUsage();
printUsage("[3] after list /home", afterList);
printDiff("[delta] list /home", afterRestore, afterList);

type TopEntry = { path: string; size: number };
const topFiles: TopEntry[] = [];

function pushTop(path: string, size: number): void {
  topFiles.push({ path, size });
  topFiles.sort((a, b) => b.size - a.size);
  if (topFiles.length > 20) {
    topFiles.length = 20;
  }
}

function walk(dir: string): void {
  const entries = vfs.list(dir);
  for (const name of entries) {
    const childPath = dir === "/" ? `/${name}` : `${dir}/${name}`;
    const st = vfs.stat(childPath);
    if (st.type === "file") {
      pushTop(childPath, st.size);
    } else {
      walk(childPath);
    }
  }
}

walk("/");
console.log("Top 20 largest VFS files:");
for (const item of topFiles) {
  console.log(`${toMb(item.size)} MB\t${item.path}`);
}