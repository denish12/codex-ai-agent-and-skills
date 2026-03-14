# NPM Publish Checklist

## Package Info
- **Name:** `code-ai-installer`
- **Registry:** [npmjs.com/package/code-ai-installer](https://www.npmjs.com/package/code-ai-installer)
- **Binary:** `code-ai`

## Pre-publish checks
```bash
npm run lint          # tsc --noEmit
npm test              # vitest run (53+ tests must pass)
npm run build         # clean compile
npm publish --dry-run # verify tarball contents and size
```

## Auth and account
```bash
npm adduser           # or npm login
npm whoami            # verify logged in
# If 2FA enabled for publish — ensure OTP device is available
```

## Release command
```bash
npm version patch     # or minor / major — updates package.json + git tag
git push --follow-tags
npm publish --access public
```

## Post-publish verification
```bash
npm view code-ai-installer version   # confirm new version
npm i -g code-ai-installer           # install globally
code-ai --help                       # verify binary
code-ai targets                      # verify targets list
code-ai doctor . --target claude     # verify doctor
```

## Rollback / deprecate (if needed)
```bash
npm deprecate code-ai-installer@<version> "message"
# Unpublish is restricted by npm policy; prefer deprecation.
```
