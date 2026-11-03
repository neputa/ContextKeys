#!/usr/bin/env node

/**
 * ContextKeys XPI Build Script
 * 
 * Generates a .xpi (zip) file for distribution
 * Usage: node scripts/build.js [output-dir]
 * 
 * Output: contextkeys-1.0.0.xpi (in dist/ or specified directory)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PKG_JSON = require('../package.json');
const MANIFEST = require('../manifest.json');
const VERSION = MANIFEST.version || PKG_JSON.version;
const OUTPUT_DIR = process.argv[2] || 'dist';
const OUTPUT_FILE = path.join(OUTPUT_DIR, `contextkeys-${VERSION}.xpi`);

// Files and directories to include in XPI
const INCLUDE_PATTERNS = [
  'manifest.json',
  'background.js',
  'shortcut-dialog.html',
  'shortcut-dialog.css',
  'shortcut-dialog.js',
  'data/',
  'LICENSE',
  'README.md',
];

// Files and directories to exclude
const EXCLUDE_PATTERNS = [
  '.git',
  '.gitignore',
  'node_modules',
  'dist',
  'scripts',
  'docs',
  'package.json',
  'package-lock.json',
  '.DS_Store',
  '*.xpi',
];

async function build() {
  try {
    console.log(`🔨 Building ContextKeys v${VERSION}...`);
    
    // Create output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
    }

    // Check if zip command is available
    try {
      execSync('which zip', { stdio: 'ignore' });
    } catch (e) {
      console.error('❌ Error: "zip" command not found. Please install it:');
      console.error('   Windows: Install 7-Zip or use WSL');
      console.error('   macOS:   brew install zip');
      console.error('   Linux:   sudo apt-get install zip');
      process.exit(1);
    }

    // Generate XPI using zip command
    const zipCommand = `cd /home/takuma/repos/ContextKeys && zip -r -q "${path.resolve(OUTPUT_FILE)}" ${INCLUDE_PATTERNS.join(' ')} -x ${EXCLUDE_PATTERNS.map(p => `"${p}"/*`).join(' ')}`;
    
    console.log(`📦 Packaging files...`);
    execSync(zipCommand, { stdio: 'inherit' });

    // Verify output file
    if (fs.existsSync(OUTPUT_FILE)) {
      const fileSize = fs.statSync(OUTPUT_FILE).size;
      console.log(`✅ Build successful!`);
      console.log(`📄 Output: ${OUTPUT_FILE}`);
      console.log(`📊 Size: ${(fileSize / 1024).toFixed(2)} KB`);
      console.log(`\n🚀 Next steps:`);
      console.log(`   1. Install in Thunderbird: ツール → アドオン → ⚙️ → ファイルからインストール`);
      console.log(`   2. Test the addon by pressing Ctrl+Shift+H`);
      console.log(`   3. Verify shortcuts display correctly in all contexts (mail, calendar, etc.)`);
    } else {
      throw new Error('Failed to create XPI file');
    }
  } catch (error) {
    console.error(`❌ Build failed:`, error.message);
    process.exit(1);
  }
}

build();
