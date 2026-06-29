#!/bin/bash
set -e
bun run build
wrangler pages deploy dist --project-name learnru --branch main
