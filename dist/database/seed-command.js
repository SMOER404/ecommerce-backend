"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const seedFilePath = path.resolve(__dirname, "seed.ts");
console.log("Running database seed script...");
(0, child_process_1.exec)(`npx ts-node ${seedFilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
});
//# sourceMappingURL=seed-command.js.map