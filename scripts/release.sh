#!/bin/bash

# Smart Release Script
# Creates version tags and updates changelog

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if version argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Usage: $0 <version> [message]${NC}"
    echo -e "Example: $0 1.0.3 'Add new feature'"
    exit 1
fi

VERSION=$1
MESSAGE=${2:-"Release v$VERSION"}

# Validate version format (simple check)
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}Invalid version format. Use semantic versioning (e.g., 1.0.3)${NC}"
    exit 1
fi

# Check if tag already exists
if git tag -l | grep -q "^v$VERSION$"; then
    echo -e "${RED}Tag v$VERSION already exists${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
    read -p "Do you want to commit them first? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        bash scripts/commit.sh "$MESSAGE"
    else
        echo -e "${RED}Aborting release${NC}"
        exit 1
    fi
fi

# Update package.json version
echo -e "${BLUE}Updating package.json version to $VERSION...${NC}"
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Update CHANGELOG.md
echo -e "${BLUE}Updating CHANGELOG.md...${NC}"
DATE=$(date +%Y-%m-%d)

# Create new changelog entry
NEW_ENTRY="## [$VERSION] - $DATE

### Changed
- $MESSAGE
"

# Insert after the "# Changelog" header
if [ -f CHANGELOG.md ]; then
    # Create temporary file with new entry
    {
        head -n 3 CHANGELOG.md
        echo ""
        echo "$NEW_ENTRY"
        tail -n +4 CHANGELOG.md
    } > CHANGELOG.md.tmp
    mv CHANGELOG.md.tmp CHANGELOG.md
fi

# Stage and commit version changes
git add package.json CHANGELOG.md
git commit -m "Release v$VERSION: $MESSAGE"

# Create git tag
echo -e "${BLUE}Creating tag v$VERSION...${NC}"
git tag -a "v$VERSION" -m "Release v$VERSION: $MESSAGE"

echo -e "${GREEN}✓ Release v$VERSION created successfully${NC}"
echo -e "${YELLOW}To push to remote, run:${NC}"
echo -e "  git push origin $(git branch --show-current)"
echo -e "  git push origin v$VERSION"
