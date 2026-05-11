// Fallback app for Cloudflare environments
// Uses IIFE bundle instead of ESM to avoid module loading issues with CF challenges

const out = document.getElementById('output');
const cmd = document.getElementById('cmd');

function print(s) {
  out.textContent += s;
  out.scrollTop = out.scrollHeight;
}

async function main() {
  // Wait for WebShellLib to be loaded from web-iife.min.js
  if (typeof WebShellLib === 'undefined') {
    print('Error: WebShellLib not loaded\n');
    return;
  }

  const { createWebShell } = WebShellLib;
  const shell = createWebShell('web-shell');

  await shell.ensureInitialized();
  print(`$ `);

  cmd.addEventListener('keydown', async (ev) => {
    if (ev.key !== 'Enter') return;
    const input = cmd.value;
    cmd.value = '';

    if (!input.trim()) {
      print('\n$ ');
      return;
    }

    print(`${input}\n`);
    try {
      const result = await shell.executeCommandLine(input);
      if (result.stdout) print(result.stdout);
      if (result.stderr) print(result.stderr);
      if ((result.exitCode ?? 0) !== 0) {
        print(`exit code: ${result.exitCode}\n`);
      }
    } catch (e) {
      print(`Error: ${e instanceof Error ? e.message : String(e)}\n`);
    }

    print(`$ `);
  });
}

// Load IIFE bundle
const script = document.createElement('script');
script.src = './web-iife.min.js';
script.onload = main;
script.onerror = () => {
  print('Error: Failed to load web-iife.min.js\n');
};
document.head.appendChild(script);
