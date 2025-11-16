# Git Automation Scripts

Collection of scripts to automate git workflows without AI signatures.

## Scripts

### commit.sh
Smart commit script that automatically generates commit messages based on file changes.

**Usage:**
```bash
# Auto-generate commit message
./scripts/commit.sh

# Custom commit message
./scripts/commit.sh "Your custom message here"
```

**Features:**
- Automatically detects new, modified, and deleted files
- Generates descriptive commit messages
- Stages all changes if nothing is staged
- Shows changes before committing

**Examples:**
```bash
./scripts/commit.sh
# Output: "Add components/NewComponent.tsx"

./scripts/commit.sh "Fix navigation bug"
# Output: Custom message used
```

### release.sh
Smart release script that creates version tags and updates changelog.

**Usage:**
```bash
./scripts/release.sh <version> [message]
```

**Features:**
- Updates package.json version
- Generates changelog entry
- Creates git tag
- Validates semantic versioning
- Checks for existing tags

**Examples:**
```bash
./scripts/release.sh 1.0.3 "Add dark mode support"
# Creates v1.0.3 tag with changelog entry

./scripts/release.sh 1.1.0 "Major UI redesign"
# Creates v1.1.0 tag with changelog entry
```

## Quick Start

Make scripts executable (if not already):
```bash
chmod +x scripts/*.sh
```

Create a commit:
```bash
./scripts/commit.sh "Your commit message"
```

Create a release:
```bash
./scripts/release.sh 1.0.3 "Release description"
```

Push to remote:
```bash
git push origin <branch-name>
git push origin v1.0.3
```

## Notes

- All commits and tags are created without AI/Claude signatures
- Scripts use standard git commands
- Version format must follow semantic versioning (X.Y.Z)
- Changelog entries are automatically dated
