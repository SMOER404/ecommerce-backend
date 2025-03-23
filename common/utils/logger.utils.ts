import * as fs from 'fs';
import * as path from 'path';

export function ensureLogDirectory() {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return logDir;
} 