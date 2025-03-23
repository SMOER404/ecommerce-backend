"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLogDirectory = ensureLogDirectory;
const fs = require("fs");
const path = require("path");
function ensureLogDirectory() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    return logDir;
}
//# sourceMappingURL=logger.utils.js.map