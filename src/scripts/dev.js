#!/usr/bin/env node
import { execSync } from "child_process"

function run(cmd) {
    execSync(cmd, { stdio: "inherit", shell: true })
}

try {
    // Check if Infisical CLI exists
    execSync("infisical --version", { stdio: "ignore" })

    console.log("Infisical detected — running with synced secrets...")
    run("infisical run -- npm run dev")
} catch {
    console.log("Infisical not found — using local .env file instead.")
    run("npm run dev")
}
