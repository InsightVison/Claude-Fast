// 🕷️ MySaasInterface.com Smart Scraper
// Efficiently handles 1791+ interfaces without breaking the browser

import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export interface InterfaceData {
  id: string;
  name: string;
  company: string;
  category: string;
  style: string;
  industry: string;
  previewUrl: string;
  thumbnailUrl: string;
  tags: string[];
  htmlSource?: string;
  pageSource?: string;
}

export class MySaasInterfaceScraper {
  private baseUrl = 'https://app.saasinterface.com/pages';
  private cache = new Map<string, InterfaceData[]>();
  
  /**
   * 🎯 SMART STRATEGY: Only scrape what we need when we need it
   * Instead of 1791 at once, we fetch targeted results
   */
  async searchInterfaces(filters: {
    category?: string;
    style?: string;
    industry?: string;
    limit?: number;
  }): Promise<InterfaceData[]> {
    const cacheKey = JSON.stringify(filters);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const results = await this.performSearch(filters);
    this.cache.set(cacheKey, results);
    
    return results;
  }

  private async performSearch(filters: any): Promise<InterfaceData[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      // Navigate to the main page
      await page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
      
      // Apply filters if any
      if (filters.category) {
        await this.applyFilter(page, 'category', filters.category);
      }
      
      if (filters.style) {
        await this.applyFilter(page, 'style', filters.style);
      }
      
      // Scroll to load more content (handle lazy loading)
      const interfaces = await this.scrollAndCollect(page, filters.limit || 20);
      
      return interfaces;
      
    } finally {
      await browser.close();
    }
  }

  private async applyFilter(page: any, filterType: string, value: string): Promise<void> {
    // Apply category/style filters on the page
    // This would click on filter buttons or use search
    
    const filterSelector = `[data-filter="${filterType}"][data-value="${value}"]`;
    await page.click(filterSelector).catch(() => {
      // If filter doesn't exist, use search instead
      return this.searchByKeyword(page, value);
    });
    
    await page.waitForTimeout(1000); // Wait for filter to apply
  }

  private async searchByKeyword(page: any, keyword: string): Promise<void> {
    const searchSelector = 'input[type="search"], input[placeholder*="Search"]';
    await page.type(searchSelector, keyword);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  }

  private async scrollAndCollect(page: any, limit: number): Promise<InterfaceData[]> {
    const interfaces: InterfaceData[] = [];
    let previousCount = 0;
    
    while (interfaces.length < limit) {
      // Scroll to load more content
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      // Wait for new content to load
      await page.waitForTimeout(2000);
      
      // Extract interface cards from current page
      const newInterfaces = await this.extractInterfacesFromCurrentPage(page);
      
      // Add new interfaces that we haven't seen before
      for (const iface of newInterfaces) {
        if (!interfaces.find(existing => existing.id === iface.id)) {
          interfaces.push(iface);
        }
      }
      
      // If no new interfaces loaded, we've reached the end
      if (interfaces.length === previousCount) {
        break;
      }
      
      previousCount = interfaces.length;
    }
    
    return interfaces.slice(0, limit);
  }

  private async extractInterfacesFromCurrentPage(page: any): Promise<InterfaceData[]> {
    return await page.evaluate(() => {
      const interfaces: InterfaceData[] = [];
      
      // Look for interface cards - adjust selectors based on actual site structure
      const cards = document.querySelectorAll('.interface-card, .design-card, [data-interface]');
      
      cards.forEach((card: any, index: number) => {
        const titleElement = card.querySelector('h3, h4, .title, [data-title]');
        const imageElement = card.querySelector('img');
        const linkElement = card.querySelector('a') || card;
        
        if (titleElement && imageElement) {
          const title = titleElement.textContent?.trim() || `Interface ${index}`;
          const company = this.extractCompanyName(title);
          
          interfaces.push({
            id: `interface-${index}-${Date.now()}`,
            name: title,
            company: company,
            category: this.inferCategory(title),
            style: this.inferStyle(card),
            industry: this.inferIndustry(title),
            previewUrl: linkElement.href || '',
            thumbnailUrl: imageElement.src || '',
            tags: this.extractTags(card),
            htmlSource: undefined,
            pageSource: undefined
          });
        }
      });
      
      return interfaces;
    });
  }

  /**
   * 🔥 THE MONEY MAKER: Get full page source for a specific interface
   */
  async getInterfacePageSource(interfaceData: InterfaceData): Promise<string> {
    if (interfaceData.pageSource) {
      return interfaceData.pageSource;
    }
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(interfaceData.previewUrl, { waitUntil: 'networkidle2' });
      
      // Get the full HTML source
      const htmlSource = await page.content();
      
      // Cache it for later use
      interfaceData.pageSource = htmlSource;
      
      return htmlSource;
      
    } finally {
      await browser.close();
    }
  }

  /**
   * 🎨 Extract specific components from interface
   */
  async extractComponents(interfaceData: InterfaceData): Promise<{
    header: string;
    sidebar: string;
    mainContent: string;
    footer: string;
    components: any[];
  }> {
    const pageSource = await this.getInterfacePageSource(interfaceData);
    const $ = cheerio.load(pageSource);
    
    return {
      header: this.extractSection($, 'header, .header, [data-section="header"]'),
      sidebar: this.extractSection($, 'aside, .sidebar, [data-section="sidebar"]'),
      mainContent: this.extractSection($, 'main, .main-content, [data-section="main"]'),
      footer: this.extractSection($, 'footer, .footer, [data-section="footer"]'),
      components: this.identifyReusableComponents($)
    };
  }

  private extractSection($: any, selector: string): string {
    const element = $(selector).first();
    return element.length > 0 ? element.html() || '' : '';
  }

  private identifyReusableComponents($: any): any[] {
    const components = [];
    
    // Look for common component patterns
    const patterns = [
      { name: 'Button', selector: 'button, .btn, [role="button"]' },
      { name: 'Card', selector: '.card, .panel, .box' },
      { name: 'Form', selector: 'form' },
      { name: 'Table', selector: 'table, .table' },
      { name: 'Modal', selector: '.modal, .dialog, [role="dialog"]' },
      { name: 'Dropdown', selector: '.dropdown, .select, select' },
      { name: 'Tabs', selector: '.tabs, [role="tablist"]' },
      { name: 'Chart', selector: '.chart, canvas, svg[class*="chart"]' }
    ];
    
    patterns.forEach(pattern => {
      const elements = $(pattern.selector);
      if (elements.length > 0) {
        components.push({
          name: pattern.name,
          count: elements.length,
          examples: elements.slice(0, 3).map((i: number, el: any) => $(el).html()).get()
        });
      }
    });
    
    return components;
  }

  // Helper methods for categorizing interfaces
  private extractCompanyName(title: string): string {
    // Extract company name from title (usually the first word)
    return title.split(' ')[0] || 'Unknown';
  }

  private inferCategory(title: string): string {
    const keywords = title.toLowerCase();
    
    if (keywords.includes('dashboard') || keywords.includes('admin')) return 'dashboard';
    if (keywords.includes('landing') || keywords.includes('home')) return 'landing';
    if (keywords.includes('pricing') || keywords.includes('plan')) return 'pricing';
    if (keywords.includes('checkout') || keywords.includes('payment')) return 'checkout';
    if (keywords.includes('login') || keywords.includes('signup')) return 'auth';
    if (keywords.includes('profile') || keywords.includes('account')) return 'profile';
    if (keywords.includes('settings') || keywords.includes('config')) return 'settings';
    if (keywords.includes('table') || keywords.includes('list')) return 'data';
    if (keywords.includes('form') || keywords.includes('contact')) return 'form';
    if (keywords.includes('calendar') || keywords.includes('schedule')) return 'calendar';
    
    return 'general';
  }

  private inferStyle(card: any): string {
    const classes = card.className || '';
    const text = card.textContent?.toLowerCase() || '';
    
    if (classes.includes('dark') || text.includes('dark')) return 'dark';
    if (classes.includes('minimal') || text.includes('minimal')) return 'minimal';
    if (classes.includes('corporate') || text.includes('corporate')) return 'corporate';
    if (classes.includes('creative') || text.includes('creative')) return 'creative';
    
    return 'modern';
  }

  private inferIndustry(title: string): string {
    const keywords = title.toLowerCase();
    
    if (keywords.includes('health') || keywords.includes('medical') || keywords.includes('doctor')) return 'healthcare';
    if (keywords.includes('finance') || keywords.includes('bank') || keywords.includes('invest')) return 'finance';
    if (keywords.includes('real estate') || keywords.includes('property')) return 'realestate';
    if (keywords.includes('education') || keywords.includes('school') || keywords.includes('learn')) return 'education';
    if (keywords.includes('restaurant') || keywords.includes('food') || keywords.includes('delivery')) return 'food';
    if (keywords.includes('retail') || keywords.includes('shop') || keywords.includes('store')) return 'retail';
    
    return 'general';
  }

  private extractTags(card: any): string[] {
    const tags = [];
    const text = card.textContent?.toLowerCase() || '';
    const classes = card.className || '';
    
    // Extract tags from text and classes
    const tagPatterns = [
      'responsive', 'mobile', 'tablet', 'desktop',
      'react', 'vue', 'angular', 'svelte',
      'tailwind', 'bootstrap', 'css', 'scss',
      'dashboard', 'analytics', 'charts', 'graphs',
      'form', 'table', 'calendar', 'chat',
      'modern', 'minimal', 'dark', 'light'
    ];
    
    tagPatterns.forEach(pattern => {
      if (text.includes(pattern) || classes.includes(pattern)) {
        tags.push(pattern);
      }
    });
    
    return tags;
  }
}

// Usage example for your Zoho demo
export async function demoInterfaceScraping() {
  const scraper = new MySaasInterfaceScraper();
  
  // Search for CRM-style interfaces
  const crmInterfaces = await scraper.searchInterfaces({
    category: 'dashboard',
    industry: 'healthcare',
    limit: 5
  });
  
  console.log(`Found ${crmInterfaces.length} CRM interfaces`);
  
  // Get detailed components from the best match
  if (crmInterfaces.length > 0) {
    const components = await scraper.extractComponents(crmInterfaces[0]);
    console.log('Extracted components:', components);
  }
  
  return crmInterfaces;
}
