#!/usr/bin/env node
/**
 * Secret & Credential Scanner
 * Prevents accidental commits of credentials, API keys, database URLs, and private files.
 * Supports:
 *   - Pre-commit mode: Scans staged files (`git diff --cached`)
 *   - Full mode (`--all` or in CI): Scans all tracked repository files (`git ls-files`)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Patterns that must NEVER be committed to Git
const BLOCKED_PATTERNS = [
  { name: 'Stripe Secret Key (sk_live / sk_test)', regex: /sk_(live|test)_[0-9a-zA-Z]{20,}/ },
  { name: 'Stripe Webhook Secret (whsec_)', regex: /whsec_[0-9a-zA-Z]{24,}/ },
  { name: 'GitHub Personal Access Token', regex: /(ghp|gho|ghu|ghs|ghr)_[0-9a-zA-Z]{36}/ },
  { name: 'GitHub Fine-Grained Token', regex: /github_pat_[0-9a-zA-Z_]{82}/ },
  { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z\\-_]{35}/ },
  { name: 'PostgreSQL URI with Credentials', regex: /postgresql:\/\/[^:\s'"]+:[^@\s'"]+@[a-zA-Z0-9.-]+:[0-9]+/ },
  { name: 'Generic Database Connection String with Credentials', regex: /(mongodb|mysql):\/\/[^:\s'"]+:[^@\s'"]+@/ },
  { name: 'Private Key Block', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'Slack Bot Token', regex: /xox[baprs]-[0-9a-zA-Z]{10,}/ },
];

// Files that should never be tracked or committed
const BLOCKED_FILENAMES = [
  /^\.env(\..+)?$/, // any .env, .env.local, .env.prod EXCEPT .env.example
  /\.pem$/,
  /\.key$/,
  /\.pfx$/,
  /id_rsa$/,
  /id_ed25519$/,
];

function getFilesToScan(scanAll) {
  try {
    const cmd = scanAll ? 'git ls-files' : 'git diff --cached --name-only --diff-filter=ACM';
    const output = execSync(cmd, { encoding: 'utf8' });
    return output.split('\n').map(f => f.trim()).filter(Boolean);
  } catch (err) {
    return [];
  }
}

function scan() {
  const isCI = process.env.CI === 'true' || process.argv.includes('--all');
  const files = getFilesToScan(isCI);

  if (files.length === 0) {
    console.log('No files to scan.');
    process.exit(0);
  }

  let errorsFound = 0;

  for (const file of files) {
    const basename = path.basename(file);

    // 1. Check filename rules
    if (basename.endsWith('.env.example') || basename.endsWith('.example')) {
      // Allowed template
    } else {
      for (const pattern of BLOCKED_FILENAMES) {
        if (pattern.test(basename)) {
          console.error(`\x1b[31m[SECURITY ERROR]\x1b[0m Sensitive file tracked: "${file}" matches ${pattern}`);
          errorsFound++;
        }
      }
    }

    if (!fs.existsSync(file)) continue;
    const stat = fs.statSync(file);
    if (stat.isDirectory() || stat.size > 2 * 1024 * 1024) continue; // Skip large files

    // 2. Check file content
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');

      // Skip this scanner script itself
      if (file.includes('check-secrets.js')) continue;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        for (const rule of BLOCKED_PATTERNS) {
          if (rule.regex.test(line)) {
            console.error(`\x1b[31m[SECURITY ERROR]\x1b[0m ${rule.name} detected in:`);
            console.error(`  --> ${file}:${i + 1}`);
            console.error(`  --> \x1b[33m${line.trim().substring(0, 100)}\x1b[0m\n`);
            errorsFound++;
          }
        }
      }
    } catch (readErr) {
      // Ignore binary files
    }
  }

  if (errorsFound > 0) {
    console.error(`\x1b[31m✖ Security Scan Failed:\x1b[0m Found ${errorsFound} secret(s) or sensitive file(s).`);
    console.error(`Please replace with environment variables before pushing.\n`);
    process.exit(1);
  }

  console.log(`\x1b[32m✔ Security Scan Passed:\x1b[0m Scanned ${files.length} file(s). Zero exposed secrets.`);
  process.exit(0);
}

scan();
