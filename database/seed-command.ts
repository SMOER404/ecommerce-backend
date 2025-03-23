// Run this file with: npx ts-node src/database/seed-command.ts
import { exec } from "child_process"
import * as path from "path"

const seedFilePath = path.resolve(__dirname, "seed.ts")

console.log("Running database seed script...")
exec(`npx ts-node ${seedFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`)
    return
  }
  console.log(stdout)
})

