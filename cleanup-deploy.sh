#!/bin/bash

# Script to ensure only built files are deployed
# Remove any source file references that might confuse GitHub Pages

echo "Cleaning up deployment directory..."

# Remove source files from dist if they somehow got copied
rm -rf dist/src/
rm -rf dist/node_modules/
rm -rf dist/public/
rm -f dist/package.json
rm -f dist/vite.config.js
rm -f dist/README.md

# Verify no source references exist
if grep -r "/src/" dist/ --exclude-dir=assets; then
    echo "ERROR: Found source references in built files!"
    exit 1
fi

echo "Deployment directory cleaned successfully"
