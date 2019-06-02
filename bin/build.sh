#!/bin/sh

rm -rf dist/*

mkdir -p dist/public/
cp -r public/* dist/public/
cp package* dist

tsc -b functions/tsconfig.json

parcel build --out-dir=dist public/ui.tsx ui/server.tsx
