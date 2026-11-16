import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteCli = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const children = [];
let stopping = false;

const stop = (exitCode) => {
  if (stopping) return;
  stopping = true;
  process.exitCode = exitCode;
  children.forEach((child) => {
    if (child.exitCode === null) child.kill();
  });
};

const start = (name, args) => {
  const child = spawn(process.execPath, args, { cwd: projectRoot, stdio: 'inherit' });
  children.push(child);
  child.on('error', (error) => {
    console.error(`Could not start ${name}:`, error);
    stop(1);
  });
  child.on('exit', (code, signal) => {
    if (!stopping) {
      console.error(`${name} exited unexpectedly (${signal || code}).`);
      stop(code ?? 1);
    }
  });
};

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

start('Application API', ['server.js']);
start('Vite development server', [viteCli, '--port=3000', '--host=0.0.0.0', '--strictPort']);
