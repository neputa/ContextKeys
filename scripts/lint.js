#!/usr/bin/env node

/**
 * ContextKeys Lint Script
 * 
 * Validates JSON and JavaScript syntax
 * Usage: node scripts/lint.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const errors = [];
const warnings = [];

console.log('🔍 Linting ContextKeys...\n');

// 1. Check manifest.json syntax
try {
  console.log('📋 Checking manifest.json...');
  const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  
  // Validate required fields
  if (!manifest.name) errors.push('manifest.json: Missing "name" field');
  if (!manifest.version) errors.push('manifest.json: Missing "version" field');
  if (!manifest.permissions) errors.push('manifest.json: Missing "permissions" field');
  
  console.log('   ✅ manifest.json syntax OK');
} catch (error) {
  errors.push(`manifest.json: ${error.message}`);
}

// 2. Check data/shortcuts.json syntax
try {
  console.log('📋 Checking data/shortcuts.json...');
  const shortcuts = JSON.parse(fs.readFileSync('data/shortcuts.json', 'utf8'));
  
  // Validate structure
  const contexts = Object.keys(shortcuts);
  if (contexts.length === 0) {
    errors.push('data/shortcuts.json: No contexts defined');
  }
  
  let totalShortcuts = 0;
  for (const context of contexts) {
    const ctx = shortcuts[context];
    if (!ctx.title || !Array.isArray(ctx.shortcuts)) {
      errors.push(`data/shortcuts.json: Invalid structure for context "${context}"`);
    } else {
      totalShortcuts += ctx.shortcuts.length;
    }
  }
  
  console.log(`   ✅ data/shortcuts.json syntax OK (${totalShortcuts} shortcuts)`);
} catch (error) {
  errors.push(`data/shortcuts.json: ${error.message}`);
}

// 3. Check JavaScript syntax
const jsFiles = ['background.js', 'shortcut-dialog.js'];
for (const file of jsFiles) {
  try {
    console.log(`📋 Checking ${file}...`);
    execSync(`node --check "${file}"`, { stdio: 'ignore' });
    console.log(`   ✅ ${file} syntax OK`);
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

// 4. Check required files exist
console.log('📋 Checking required files...');
const requiredFiles = [
  'manifest.json',
  'background.js',
  'shortcut-dialog.html',
  'shortcut-dialog.css',
  'shortcut-dialog.js',
  'data/shortcuts.json',
  'LICENSE',
  'README.md',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

if (requiredFiles.every(f => fs.existsSync(f))) {
  console.log('   ✅ All required files present');
}

// 5. Check file sizes (warnings only)
console.log('📋 Checking file sizes...');
const manifestSize = fs.statSync('manifest.json').size;
const shortcutsSize = fs.statSync('data/shortcuts.json').size;
const bgSize = fs.statSync('background.js').size;
const jsSize = fs.statSync('shortcut-dialog.js').size;
const cssSize = fs.statSync('shortcut-dialog.css').size;

if (manifestSize > 5000) warnings.push(`manifest.json is large (${manifestSize} bytes)`);
if (shortcutsSize > 100000) warnings.push(`data/shortcuts.json is large (${shortcutsSize} bytes)`);

console.log(`   ✅ File sizes OK`);

// Summary
console.log('\n' + '='.repeat(50));
if (errors.length === 0) {
  console.log('✅ Lint passed! No errors found.');
} else {
  console.log(`❌ Lint failed with ${errors.length} error(s):`);
  errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} warning(s):`);
  warnings.forEach((warn, i) => console.log(`   ${i + 1}. ${warn}`));
}

process.exit(errors.length > 0 ? 1 : 0);
