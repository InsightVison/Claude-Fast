#!/usr/bin/env ts-node

// 🚀 RUN THE SAAS DATABASE EXTRACTION
// This generates all training datasets from your 3000+ interface collection

import { extractSaasDatabase } from './lib/saas-database-extractor';

async function main() {
  console.log('🔥 SAAS DATABASE EXTRACTION STARTING...\n');
  
  try {
    await extractSaasDatabase();
    
    console.log('\n✅ EXTRACTION COMPLETE!');
    console.log('📁 Generated datasets:');
    console.log('   - interface-analysis.jsonl');
    console.log('   - react-generation.jsonl'); 
    console.log('   - design-system.jsonl');
    console.log('   - ui-patterns.jsonl');
    console.log('   - raw-interfaces.json');
    console.log('\n🚀 Ready for fine-tuning!');
    
  } catch (error) {
    console.error('❌ Extraction failed:', error);
    process.exit(1);
  }
}

main();
