import { spawn } from 'child_process';

console.log('Starting Satus Development Server with Node.js...');

// Spawning style watcher
const stylesProcess = spawn('npx', ['tsx', '--watch', './lib/styles/scripts/setup-styles.ts'], {
  stdio: 'inherit',
  shell: true
});

// Spawning Next.js dev server
const nextProcess = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle exit
function cleanup() {
  console.log('\nShutting down development servers...');
  try { stylesProcess.kill(); } catch (e) {}
  try { nextProcess.kill(); } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

stylesProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Styles process exited with code ${code}`);
    cleanup();
  }
});

nextProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Next.js process exited with code ${code}`);
    cleanup();
  }
});
