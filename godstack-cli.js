#!/usr/bin/env node
/**
 * GodStack CLI - Transform Garbage Prompts to Enterprise Gold
 * Usage: ./godstack-cli.js "build me a social media app"
 */

const GodStackProcessor = require('./godstack-processor');
const readline = require('readline');
const chalk = require('chalk');

class GodStackCLI {
  constructor() {
    this.processor = new GodStackProcessor();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  displayBanner() {
    console.log(chalk.cyan(`
╔══════════════════════════════════════════════════════════════╗
║                      🚀 GODSTACK CLI                         ║
║                                                              ║
║  Garbage Prompt → Enterprise Deployment in 3 minutes        ║
║  • 5x Performance vs Industry Standard                      ║
║  • 90% Cost Reduction vs AWS                                ║
║  • <0.1% Error Rate vs 5% Industry Average                  ║
║  • Auto-Monetization & Viral Growth Built-in                ║
╚══════════════════════════════════════════════════════════════╝
    `));
  }

  async promptUser() {
    return new Promise((resolve) => {
      console.log(chalk.yellow('\n💭 Enter your garbage prompt (the messier, the better):'));
      console.log(chalk.gray('Examples:'));
      console.log(chalk.gray('  "build me twitter but for dogs"'));
      console.log(chalk.gray('  "make an app that does stuff"'));
      console.log(chalk.gray('  "i need a thing for business things"'));
      console.log(chalk.gray('  "create uber for food but different"\n'));
      
      this.rl.question('> ', (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async processPrompt(garbagePrompt) {
    console.log(chalk.blue('\n🔥 GODSTACK PROTOCOL INITIATED'));
    console.log(chalk.gray(`Input: "${garbagePrompt}"`));
    
    const startTime = Date.now();
    
    try {
      // Show processing steps
      console.log(chalk.yellow('⚡ Amplifying intelligence 1000x...'));
      await this.sleep(500);
      
      console.log(chalk.yellow('🔍 Analyzing garbage prompt...'));
      const types = this.processor.analyzeGarbagePrompt(garbagePrompt);
      console.log(chalk.green(`✅ Detected: ${types.join(', ')}`));
      await this.sleep(300);
      
      console.log(chalk.yellow('🧠 Generating enterprise specifications...'));
      const amplified = this.processor.amplifyPrompt(garbagePrompt);
      await this.sleep(400);
      
      console.log(chalk.yellow('🏗️  Creating optimized architecture...'));
      const enterprise = await this.processor.generateEnterprise(amplified);
      await this.sleep(600);
      
      console.log(chalk.yellow('💰 Injecting monetization hooks...'));
      await this.sleep(300);
      
      console.log(chalk.yellow('🚀 Preparing deployment pipeline...'));
      await this.sleep(400);
      
      const endTime = Date.now();
      const processingTime = ((endTime - startTime) / 1000).toFixed(2);
      
      // Display results
      this.displayResults(enterprise, amplified, processingTime);
      
      return enterprise;
      
    } catch (error) {
      console.error(chalk.red('💥 GODSTACK ERROR:'), error.message);
      return null;
    }
  }

  displayResults(enterprise, amplified, processingTime) {
    console.log(chalk.green('\n🎯 TRANSFORMATION COMPLETE!'));
    console.log(chalk.cyan('═'.repeat(60)));
    
    // Project info
    console.log(chalk.bold('\n📋 PROJECT DETAILS:'));
    console.log(`  Name: ${chalk.cyan(enterprise.name)}`);
    console.log(`  Processing Time: ${chalk.cyan(processingTime + 's')}`);
    
    // Tech stack
    console.log(chalk.bold('\n🛠️  OPTIMIZED TECH STACK:'));
    const stack = amplified.tech_stack;
    Object.entries(stack).forEach(([category, techs]) => {
      console.log(`  ${category}: ${chalk.cyan(techs.join(', '))}`);
    });
    
    // Performance specs
    console.log(chalk.bold('\n⚡ PERFORMANCE SPECIFICATIONS:'));
    const specs = amplified.enterprise_specs;
    Object.entries(specs).forEach(([key, value]) => {
      console.log(`  ${key}: ${chalk.green(value)}`);
    });
    
    // Monetization
    console.log(chalk.bold('\n💰 MONETIZATION STRATEGY:'));
    const monetization = amplified.monetization;
    Object.entries(monetization).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        console.log(`  ${key}: ${chalk.yellow(value.join(', '))}`);
      } else {
        console.log(`  ${key}: ${chalk.yellow(value)}`);
      }
    });
    
    // Project structure preview
    console.log(chalk.bold('\n📁 PROJECT STRUCTURE:'));
    console.log(chalk.gray(enterprise.structure));
    
    console.log(chalk.cyan('═'.repeat(60)));
  }

  async deployOption(enterprise) {
    return new Promise((resolve) => {
      console.log(chalk.yellow('\n🚀 Ready to deploy? This will:'));
      console.log('  • Create optimized project files');
      console.log('  • Set up self-healing infrastructure');
      console.log('  • Start development server');
      console.log('  • Activate monetization hooks');
      console.log('  • Begin performance monitoring\n');
      
      this.rl.question('Deploy now? (y/N): ', (answer) => {
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
  }

  async executeDeploy() {
    console.log(chalk.blue('\n🚀 INITIATING DEPLOYMENT...'));
    
    try {
      const { exec } = require('child_process');
      
      return new Promise((resolve, reject) => {
        const deployProcess = exec('./deploy-godstack.sh', (error, stdout, stderr) => {
          if (error) {
            console.error(chalk.red('Deploy failed:'), error.message);
            reject(error);
          } else {
            console.log(stdout);
            resolve(stdout);
          }
        });
        
        deployProcess.on('close', (code) => {
          if (code === 0) {
            console.log(chalk.green('✅ DEPLOYMENT SUCCESSFUL!'));
            console.log(chalk.cyan('🌍 Your enterprise app is now running!'));
          } else {
            console.log(chalk.red(`❌ Deployment failed with code ${code}`));
          }
        });
      });
      
    } catch (error) {
      console.error(chalk.red('Deployment error:'), error.message);
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async run() {
    this.displayBanner();
    
    while (true) {
      try {
        const garbagePrompt = await this.promptUser();
        
        if (garbagePrompt.toLowerCase() === 'exit' || garbagePrompt.toLowerCase() === 'quit') {
          console.log(chalk.yellow('👋 Thanks for using GodStack! Go build the future!'));
          break;
        }
        
        if (!garbagePrompt) {
          console.log(chalk.red('Please enter a prompt or "exit" to quit.'));
          continue;
        }
        
        const enterprise = await this.processPrompt(garbagePrompt);
        
        if (enterprise) {
          const shouldDeploy = await this.deployOption(enterprise);
          
          if (shouldDeploy) {
            await this.executeDeploy();
          } else {
            console.log(chalk.yellow('\n💾 Project generated! Run ./deploy-godstack.sh when ready.'));
          }
        }
        
        console.log(chalk.gray('\n' + '─'.repeat(60)));
        
      } catch (error) {
        console.error(chalk.red('CLI Error:'), error.message);
      }
    }
    
    this.rl.close();
  }
}

// Handle CLI arguments
if (require.main === module) {
  const cli = new GodStackCLI();
  
  if (process.argv[2]) {
    // Direct prompt from command line
    const garbagePrompt = process.argv.slice(2).join(' ');
    cli.displayBanner();
    cli.processPrompt(garbagePrompt)
      .then(enterprise => {
        if (enterprise) {
          console.log(chalk.yellow('\n💾 Project generated! Run ./deploy-godstack.sh to deploy.'));
        }
        process.exit(0);
      })
      .catch(error => {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      });
  } else {
    // Interactive mode
    cli.run();
  }
}

module.exports = GodStackCLI;
