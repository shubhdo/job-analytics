#!/bin/bash

# Check if there's any uncommitted changes
git diff-index --quiet HEAD || {
    echo "You have uncommitted changes. Please commit them first."
    exit 1
}

# Add all changes to staging
git add .

# Prompt for commit message
echo "Enter commit message: "
read commit_message

# Commit the changes
git commit -m "$commit_message"

# Push changes to the remote repository
echo "Pushing changes to GitHub..."
git push origin main  # Replace 'main' with your branch name if needed

echo "Code changes successfully pushed to GitHub."
