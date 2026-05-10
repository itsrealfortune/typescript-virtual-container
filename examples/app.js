import { createWebShell } from './web.min.js';

const out = document.getElementById('output');
const cmd = document.getElementById('cmd');

function print(s){
  out.textContent += s;
  out.scrollTop = out.scrollHeight;
}

const shell = createWebShell('web-vm');

cmd.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const value = cmd.value.trim();
    print(`$ ${value}\n`);
    if (value) {
      try {
        const res = await shell.executeCommandLine(value);
        if (res.stdout) print(res.stdout);
        if (res.stderr) print(res.stderr);
      } catch (err) {
        print(String(err) + '\n');
      }
    }
    cmd.value = '';
  }
});
