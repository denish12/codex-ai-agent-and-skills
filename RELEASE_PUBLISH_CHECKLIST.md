# NPM Publish Checklist

## Current Status (2026-02-18)
- Package name: `code-ai-installer`
- Version: `1.0.0`
- Registry lookup: package not found (`npm view code-ai-installer version` -> 404)
- Publish dry-run: passed
- Auth status: not logged in (`npm whoami` -> ENEEDAUTH)

## Pre-publish checks
1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `npm publish --dry-run`

## Auth and account
1. `npm adduser`
2. `npm whoami`
3. (If 2FA enabled for publish) ensure OTP device is available.

## Release command
1. `npm version patch` (or `minor` / `major`)
2. `git push --follow-tags`
3. `npm publish --access public`

## Post-publish verification
1. `npm view code-ai-installer version`
2. `npm i -g code-ai-installer`
3. `code-ai --help`
4. `code-ai targets`

## Rollback / deprecate (if needed)
- Deprecate specific version:
  - `npm deprecate code-ai-installer@<version> "message"`
- Unpublish is restricted by npm policy; prefer deprecation.
