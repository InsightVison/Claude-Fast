import fs from 'fs';
import path from 'path';
import { InterfaceData } from '../lib/deployment-engine';

interface DatasetEntry {
  instruction: string;
  input: string;
  output: string;
  metadata: {
    category: string;
    style: string;
    industry: string;
    tags: string[];
    complexity: 'simple' | 'medium' | 'complex';
    interfaceId: string;
  };
}

interface FineTuneDataset {
  entries: DatasetEntry[];
  summary: {
    totalEntries: number;
    categoriesCount: Record<string, number>;
    stylesCount: Record<string, number>;
    industriesCount: Record<string, number>;
    complexityDistribution: Record<string, number>;
  };
}

/**
 * 🚀 CLAUDE-TO-CASH DATASET GENERATOR
 * 
 * This is your SECRET WEAPON - transforms your 3000+ gorgeous interfaces
 * into training datasets for specialized AI agents that will DOMINATE
 * the prompt-to-app generation space.
 * 
 * Each interface becomes multiple training examples:
 * - Component-level instructions
 * - Layout pattern instructions  
 * - Style and theme instructions
 * - Industry-specific variations
 */
export class DatasetGenerator {
  private interfaces: InterfaceData[] = [];
  private dataset: FineTuneDataset = {
    entries: [],
    summary: {
      totalEntries: 0,
      categoriesCount: {},
      stylesCount: {},
      industriesCount: {},
      complexityDistribution: {}
    }
  };

  constructor(interfaces: InterfaceData[]) {
    this.interfaces = interfaces;
    console.log(`🎯 DATASET GENERATOR INITIALIZED with ${interfaces.length} interfaces`);
  }

  /**
   * Generate comprehensive training dataset from interface collection
   */
  async generateDataset(): Promise<FineTuneDataset> {
    console.log('🏭 STARTING MASS DATASET GENERATION...');
    
    for (const interface_ of this.interfaces) {
      // Generate multiple training examples per interface
      await this.generateInterfaceExamples(interface_);
    }

    this.calculateSummary();
    console.log(`✨ DATASET COMPLETE: ${this.dataset.entries.length} training examples`);
    
    return this.dataset;
  }

  /**
   * Generate multiple training examples from a single interface
   */
  private async generateInterfaceExamples(interface_: InterfaceData) {
    const complexity = this.determineComplexity(interface_);
    
    // 1. COMPONENT-LEVEL INSTRUCTIONS
    this.generateComponentInstructions(interface_, complexity);
    
    // 2. LAYOUT PATTERN INSTRUCTIONS
    this.generateLayoutInstructions(interface_, complexity);
    
    // 3. STYLE & THEME INSTRUCTIONS
    this.generateStyleInstructions(interface_, complexity);
    
    // 4. INDUSTRY-SPECIFIC INSTRUCTIONS
    this.generateIndustryInstructions(interface_, complexity);
    
    // 5. FULL APP GENERATION INSTRUCTIONS
    this.generateFullAppInstructions(interface_, complexity);
  }

  /**
   * Generate component-level training examples
   */
  private generateComponentInstructions(interface_: InterfaceData, complexity: string) {
    const components = this.extractComponents(interface_);
    
    components.forEach(component => {
      const instruction = this.createComponentInstruction(component, interface_);
      const output = this.createComponentCode(component, interface_);
      
      this.addDatasetEntry({
        instruction,
        input: `Create a ${component.type} component for a ${interface_.industry} ${interface_.category} app`,
        output,
        metadata: {
          category: interface_.category,
          style: interface_.style,
          industry: interface_.industry,
          tags: [...interface_.tags, component.type],
          complexity: complexity as any,
          interfaceId: interface_.id
        }
      });
    });
  }

  /**
   * Generate layout pattern training examples
   */
  private generateLayoutInstructions(interface_: InterfaceData, complexity: string) {
    const layouts = this.identifyLayoutPatterns(interface_);
    
    layouts.forEach(layout => {
      const instruction = `Create a ${layout.pattern} layout for a ${interface_.category} application`;
      const output = this.generateLayoutCode(layout, interface_);
      
      this.addDatasetEntry({
        instruction,
        input: `Design a ${layout.pattern} layout with ${interface_.style} styling`,
        output,
        metadata: {
          category: interface_.category,
          style: interface_.style,
          industry: interface_.industry,
          tags: [...interface_.tags, layout.pattern, 'layout'],
          complexity: complexity as any,
          interfaceId: interface_.id
        }
      });
    });
  }

  /**
   * Generate style and theme training examples
   */
  private generateStyleInstructions(interface_: InterfaceData, complexity: string) {
    const styleVariations = this.generateStyleVariations(interface_);
    
    styleVariations.forEach(variation => {
      const instruction = `Apply ${variation.name} styling to a ${interface_.category} interface`;
      const output = this.generateStyledComponent(variation, interface_);
      
      this.addDatasetEntry({
        instruction,
        input: `Style this component with ${variation.description}`,
        output,
        metadata: {
          category: interface_.category,
          style: variation.name,
          industry: interface_.industry,
          tags: [...interface_.tags, variation.name, 'styling'],
          complexity: complexity as any,
          interfaceId: interface_.id
        }
      });
    });
  }

  /**
   * Generate industry-specific training examples
   */
  private generateIndustryInstructions(interface_: InterfaceData, complexity: string) {
    const industryPatterns = this.getIndustryPatterns(interface_.industry);
    
    industryPatterns.forEach(pattern => {
      const instruction = `Create a ${pattern.component} specifically for ${interface_.industry} industry`;
      const output = this.generateIndustrySpecificCode(pattern, interface_);
      
      this.addDatasetEntry({
        instruction,
        input: `Build a ${pattern.component} that follows ${interface_.industry} industry standards`,
        output,
        metadata: {
          category: interface_.category,
          style: interface_.style,
          industry: interface_.industry,
          tags: [...interface_.tags, interface_.industry, pattern.component],
          complexity: complexity as any,
          interfaceId: interface_.id
        }
      });
    });
  }

  /**
   * Generate full application training examples
   */
  private generateFullAppInstructions(interface_: InterfaceData, complexity: string) {
    const appTemplate = this.createAppTemplate(interface_);
    
    const instruction = `Build a complete ${interface_.category} application for ${interface_.industry} industry`;
    const output = this.generateFullAppCode(appTemplate, interface_);
    
    this.addDatasetEntry({
      instruction,
      input: `Create a full-stack ${interface_.category} app with ${interface_.style} design for ${interface_.industry}`,
      output,
      metadata: {
        category: interface_.category,
        style: interface_.style,
        industry: interface_.industry,
        tags: [...interface_.tags, 'full-app', 'complete'],
        complexity: complexity as any,
        interfaceId: interface_.id
      }
    });
  }

  /**
   * Determine interface complexity based on features and structure
   */
  private determineComplexity(interface_: InterfaceData): string {
    const tagCount = interface_.tags.length;
    const hasAdvancedFeatures = interface_.tags.some(tag => 
      ['animation', 'interactive', 'dashboard', 'analytics', 'charts'].includes(tag)
    );
    
    if (tagCount > 8 || hasAdvancedFeatures) return 'complex';
    if (tagCount > 4) return 'medium';
    return 'simple';
  }

  /**
   * Extract components from interface metadata
   */
  private extractComponents(interface_: InterfaceData) {
    const baseComponents = [
      { type: 'header', priority: 'high' },
      { type: 'navigation', priority: 'high' },
      { type: 'content', priority: 'high' },
      { type: 'sidebar', priority: 'medium' },
      { type: 'footer', priority: 'medium' },
      { type: 'button', priority: 'high' },
      { type: 'form', priority: 'high' },
      { type: 'card', priority: 'high' }
    ];

    // Add category-specific components
    if (interface_.category === 'dashboard') {
      baseComponents.push(
        { type: 'chart', priority: 'high' },
        { type: 'metric-card', priority: 'high' },
        { type: 'data-table', priority: 'medium' }
      );
    }

    if (interface_.category === 'e-commerce') {
      baseComponents.push(
        { type: 'product-card', priority: 'high' },
        { type: 'shopping-cart', priority: 'high' },
        { type: 'checkout-form', priority: 'high' }
      );
    }

    return baseComponents;
  }

  /**
   * Identify layout patterns from interface
   */
  private identifyLayoutPatterns(interface_: InterfaceData) {
    const patterns = [
      { pattern: 'grid', description: 'Responsive grid layout' },
      { pattern: 'flexbox', description: 'Flexible box layout' },
      { pattern: 'sidebar', description: 'Sidebar navigation layout' },
      { pattern: 'hero', description: 'Hero section layout' },
      { pattern: 'card-grid', description: 'Card-based grid layout' }
    ];

    // Filter patterns based on category
    if (interface_.category === 'dashboard') {
      patterns.push({ pattern: 'dashboard', description: 'Dashboard layout with widgets' });
    }

    if (interface_.category === 'landing-page') {
      patterns.push({ pattern: 'landing', description: 'Landing page sections layout' });
    }

    return patterns;
  }

  /**
   * Generate style variations based on interface style
   */
  private generateStyleVariations(interface_: InterfaceData) {
    const baseStyle = interface_.style;
    const variations = [
      {
        name: baseStyle,
        description: `${baseStyle} styling with modern aesthetics`
      },
      {
        name: `${baseStyle}-dark`,
        description: `Dark mode version of ${baseStyle} styling`
      },
      {
        name: `${baseStyle}-mobile`,
        description: `Mobile-optimized ${baseStyle} styling`
      }
    ];

    return variations;
  }

  /**
   * Get industry-specific patterns
   */
  private getIndustryPatterns(industry: string) {
    const patterns: Record<string, any[]> = {
      'fintech': [
        { component: 'transaction-table', features: ['sorting', 'filtering', 'pagination'] },
        { component: 'balance-card', features: ['real-time-updates', 'animations'] },
        { component: 'security-badge', features: ['trust-indicators', 'ssl-indicators'] }
      ],
      'saas': [
        { component: 'pricing-table', features: ['comparison', 'highlighting', 'cta-buttons'] },
        { component: 'feature-list', features: ['checkmarks', 'tooltips', 'expandable'] },
        { component: 'onboarding-flow', features: ['progress-bar', 'step-navigation'] }
      ],
      'e-commerce': [
        { component: 'product-gallery', features: ['zoom', 'thumbnails', 'carousel'] },
        { component: 'review-system', features: ['ratings', 'comments', 'sorting'] },
        { component: 'wishlist-button', features: ['heart-animation', 'state-management'] }
      ]
    };

    return patterns[industry] || [
      { component: 'generic-card', features: ['responsive', 'hover-effects'] },
      { component: 'button-group', features: ['states', 'variants'] }
    ];
  }

  /**
   * Create component instruction text
   */
  private createComponentInstruction(component: any, interface_: InterfaceData): string {
    return `Create a ${component.type} component for a ${interface_.industry} ${interface_.category} application. The component should follow ${interface_.style} design principles and include ${component.priority} priority features. Make it responsive and accessible.`;
  }

  /**
   * Generate component code based on interface
   */
  private createComponentCode(component: any, interface_: InterfaceData): string {
    const styleClasses = this.getStyleClasses(interface_.style);
    const componentName = this.toPascalCase(component.type);
    
    return `import React from 'react';

interface ${componentName}Props {
  className?: string;
  // Add specific props based on component type
}

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  className = '',
  ...props 
}) => {
  return (
    <div className={\`${styleClasses.base} \${className}\`}>
      {/* ${componentName} implementation */}
      <div className="${styleClasses.content}">
        {/* Component content here */}
      </div>
    </div>
  );
};

export default ${componentName};`;
  }

  /**
   * Generate layout code
   */
  private generateLayoutCode(layout: any, interface_: InterfaceData): string {
    const styleClasses = this.getStyleClasses(interface_.style);
    
    return `import React from 'react';

export const ${this.toPascalCase(layout.pattern)}Layout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <div className="${styleClasses.layout}">
      {children}
    </div>
  );
};`;
  }

  /**
   * Generate styled component
   */
  private generateStyledComponent(variation: any, interface_: InterfaceData): string {
    const styleClasses = this.getStyleClasses(variation.name);
    
    return `// ${variation.description}
const ${this.toCamelCase(variation.name)}Styles = {
  container: '${styleClasses.base}',
  content: '${styleClasses.content}',
  accent: '${styleClasses.accent}'
};`;
  }

  /**
   * Generate industry-specific code
   */
  private generateIndustrySpecificCode(pattern: any, interface_: InterfaceData): string {
    const componentName = this.toPascalCase(pattern.component);
    const features = pattern.features.join(', ');
    
    return `// ${interface_.industry} industry-specific ${pattern.component}
import React from 'react';

interface ${componentName}Props {
  // Props for ${features}
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  // Implementation with ${features}
  return (
    <div className="industry-${interface_.industry}">
      {/* ${pattern.component} with ${features} */}
    </div>
  );
};`;
  }

  /**
   * Create app template
   */
  private createAppTemplate(interface_: InterfaceData) {
    return {
      name: `${interface_.company}App`,
      category: interface_.category,
      style: interface_.style,
      industry: interface_.industry,
      features: interface_.tags
    };
  }

  /**
   * Generate full app code
   */
  private generateFullAppCode(template: any, interface_: InterfaceData): string {
    return `// Complete ${template.category} application for ${template.industry}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ${template.name}: React.FC = () => {
  return (
    <Router>
      <div className="app-container ${template.style}">
        <Routes>
          {/* App routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default ${template.name};`;
  }

  /**
   * Get style classes based on style name
   */
  private getStyleClasses(style: string) {
    const styleMap: Record<string, any> = {
      'modern': {
        base: 'bg-white rounded-lg shadow-sm border border-gray-200',
        content: 'p-6',
        layout: 'min-h-screen bg-gray-50',
        accent: 'text-blue-600'
      },
      'glassmorphism': {
        base: 'bg-white/10 backdrop-blur-md rounded-xl border border-white/20',
        content: 'p-6',
        layout: 'min-h-screen bg-gradient-to-br from-purple-900 to-blue-900',
        accent: 'text-white'
      },
      'minimal': {
        base: 'bg-white border-b border-gray-100',
        content: 'p-4',
        layout: 'min-h-screen bg-white',
        accent: 'text-gray-900'
      }
    };

    return styleMap[style] || styleMap['modern'];
  }

  /**
   * Convert string to PascalCase
   */
  private toPascalCase(str: string): string {
    return str.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  }

  /**
   * Convert string to camelCase
   */
  private toCamelCase(str: string): string {
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
  }

  /**
   * Add entry to dataset
   */
  private addDatasetEntry(entry: DatasetEntry) {
    this.dataset.entries.push(entry);
  }

  /**
   * Calculate dataset summary statistics
   */
  private calculateSummary() {
    this.dataset.summary.totalEntries = this.dataset.entries.length;
    
    // Count categories, styles, industries, complexity
    this.dataset.entries.forEach(entry => {
      const { category, style, industry, complexity } = entry.metadata;
      
      this.dataset.summary.categoriesCount[category] = (this.dataset.summary.categoriesCount[category] || 0) + 1;
      this.dataset.summary.stylesCount[style] = (this.dataset.summary.stylesCount[style] || 0) + 1;
      this.dataset.summary.industriesCount[industry] = (this.dataset.summary.industriesCount[industry] || 0) + 1;
      this.dataset.summary.complexityDistribution[complexity] = (this.dataset.summary.complexityDistribution[complexity] || 0) + 1;
    });
  }

  /**
   * Export dataset to JSON files
   */
  async exportDataset(outputDir: string = './datasets') {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Export full dataset
    const datasetPath = path.join(outputDir, 'claude-to-cash-dataset.json');
    fs.writeFileSync(datasetPath, JSON.stringify(this.dataset, null, 2));

    // Export training format for fine-tuning
    const trainingData = this.dataset.entries.map(entry => ({
      messages: [
        {
          role: "system",
          content: "You are an expert full-stack developer who creates beautiful, functional applications from natural language descriptions."
        },
        {
          role: "user", 
          content: entry.instruction + "\n\nInput: " + entry.input
        },
        {
          role: "assistant",
          content: entry.output
        }
      ]
    }));

    const trainingPath = path.join(outputDir, 'claude-to-cash-training.jsonl');
    const trainingLines = trainingData.map(item => JSON.stringify(item)).join('\n');
    fs.writeFileSync(trainingPath, trainingLines);

    // Export summary
    const summaryPath = path.join(outputDir, 'dataset-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(this.dataset.summary, null, 2));

    console.log(`📊 DATASET EXPORTED:`);
    console.log(`   Full Dataset: ${datasetPath}`);
    console.log(`   Training Data: ${trainingPath}`);
    console.log(`   Summary: ${summaryPath}`);
    console.log(`   Total Examples: ${this.dataset.entries.length}`);
  }
}

export default DatasetGenerator;
