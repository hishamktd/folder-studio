#!/bin/bash

# Smart Git Commit Script
# Automatically generates commit messages based on git diff

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if there are changes to commit
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
    exit 0
fi

# Get git status
echo -e "${GREEN}Analyzing changes...${NC}"
git status --short

# Stage all changes if nothing is staged
if git diff --cached --quiet; then
    echo -e "${YELLOW}Staging all changes...${NC}"
    git add .
fi

# Generate commit message based on changes
COMMIT_MSG=""

# Check for new files
NEW_FILES=$(git diff --cached --name-only --diff-filter=A | wc -l)
if [ "$NEW_FILES" -gt 0 ]; then
    FILES=$(git diff --cached --name-only --diff-filter=A | head -3 | tr '\n' ', ' | sed 's/,$//')
    if [ "$NEW_FILES" -le 3 ]; then
        COMMIT_MSG="Add $FILES"
    else
        COMMIT_MSG="Add $NEW_FILES new files"
    fi
fi

# Check for modified files
MODIFIED_FILES=$(git diff --cached --name-only --diff-filter=M | wc -l)
if [ "$MODIFIED_FILES" -gt 0 ]; then
    if [ -n "$COMMIT_MSG" ]; then
        COMMIT_MSG="$COMMIT_MSG and update"
    else
        FILES=$(git diff --cached --name-only --diff-filter=M | head -3 | tr '\n' ', ' | sed 's/,$//')
        if [ "$MODIFIED_FILES" -le 3 ]; then
            COMMIT_MSG="Update $FILES"
        else
            COMMIT_MSG="Update $MODIFIED_FILES files"
        fi
    fi
fi

# Check for deleted files
DELETED_FILES=$(git diff --cached --name-only --diff-filter=D | wc -l)
if [ "$DELETED_FILES" -gt 0 ]; then
    if [ -n "$COMMIT_MSG" ]; then
        COMMIT_MSG="$COMMIT_MSG and remove files"
    else
        FILES=$(git diff --cached --name-only --diff-filter=D | head -3 | tr '\n' ', ' | sed 's/,$//')
        if [ "$DELETED_FILES" -le 3 ]; then
            COMMIT_MSG="Remove $FILES"
        else
            COMMIT_MSG="Remove $DELETED_FILES files"
        fi
    fi
fi

# Allow custom message via argument
if [ -n "$1" ]; then
    COMMIT_MSG="$1"
fi

# Show proposed commit message
echo -e "${GREEN}Commit message:${NC} $COMMIT_MSG"

# Create commit
git commit -m "$COMMIT_MSG"

echo -e "${GREEN}✓ Commit created successfully${NC}"
