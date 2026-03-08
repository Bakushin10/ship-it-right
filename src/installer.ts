#!/usr/bin/env node

/**
 * Ship-It-Right Installer
 *
 * NPX installer that sets up Ship-It-Right integration with Claude Code.
 * Usage: npx ship-it-right --claude --global
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Command } from 'commander';

const program = new Command();

function error(message: string): void {
  console.error(`❌ Error: ${message}`);
  process.exit(1);
}

function success(message: string): void {
  console.log(`✅ ${message}`);
}

function copyRecursive(src: string, dest: string): void {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    items.forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    // Make sure destination directory exists
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function installToClaude(global: boolean): void {
  const homeDir = os.homedir();
  const claudeDir = path.join(homeDir, '.claude');

  if (!fs.existsSync(claudeDir)) {
    error('Claude Code not found. Please install Claude Code first.');
  }

  const targetDir = path.join(claudeDir, 'ship-it-right');
  const sourceDir = path.join(__dirname, 'claude-integration');

  console.log('🚀 Installing Ship-It-Right to Claude Code...');

  // Remove existing installation
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log('🗑️  Removed existing installation');
  }

  // Copy files to Claude directory
  copyRecursive(sourceDir, targetDir);
  success(`Copied Ship-It-Right files to ${targetDir}`);

  // Make sir-tools executable
  const sirToolsPath = path.join(targetDir, 'bin', 'sir-tools.js');
  if (fs.existsSync(sirToolsPath)) {
    fs.chmodSync(sirToolsPath, '755');
    success('Made sir-tools executable');
  }

  // Create command shortcuts in Claude commands directory
  const commandsDir = path.join(claudeDir, 'commands');
  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }

  const sirCommandsDir = path.join(commandsDir, 'sir');
  if (!fs.existsSync(sirCommandsDir)) {
    fs.mkdirSync(sirCommandsDir, { recursive: true });
  }

  // Copy command files
  const srcCommandsDir = path.join(targetDir, 'commands');
  if (fs.existsSync(srcCommandsDir)) {
    copyRecursive(srcCommandsDir, sirCommandsDir);
    success('Set up /sir:* commands in Claude Code');
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 SHIP-IT-RIGHT INSTALLED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Available commands in Claude Code:');
  console.log('  /sir:init   — Initialize structured project');
  console.log('  /sir:status — Check project progress');
  console.log('');
  console.log('Get started: Open Claude Code and run /sir:init');
  console.log('');
}

function uninstall(global: boolean): void {
  const homeDir = os.homedir();
  const claudeDir = path.join(homeDir, '.claude');
  const targetDir = path.join(claudeDir, 'ship-it-right');
  const commandsDir = path.join(claudeDir, 'commands', 'sir');

  console.log('🗑️  Uninstalling Ship-It-Right...');

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
    success('Removed Ship-It-Right files');
  }

  if (fs.existsSync(commandsDir)) {
    fs.rmSync(commandsDir, { recursive: true, force: true });
    success('Removed /sir:* commands');
  }

  console.log('');
  console.log('✅ Ship-It-Right uninstalled successfully');
}

// CLI Setup
program
  .name('ship-it-right')
  .description('Ship-It-Right installer for Claude Code')
  .version('0.1.0');

program
  .option('--claude', 'Install for Claude Code')
  .option('--global', 'Install globally')
  .option('--local', 'Install locally')
  .option('--uninstall', 'Uninstall Ship-It-Right')
  .action((options) => {
    if (!options.claude) {
      error('Please specify --claude for Claude Code installation');
    }

    if (!options.global && !options.local) {
      error('Please specify --global or --local');
    }

    if (options.uninstall) {
      uninstall(options.global);
    } else {
      installToClaude(options.global);
    }
  });

program.parse();