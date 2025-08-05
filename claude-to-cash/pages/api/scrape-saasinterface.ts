// API Route to scrape app.saasinterface.com/pages/
// This will be the bridge to your 1791+ interface collection

import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, style, limit = 10 } = req.body;

  try {
    const interfaces = await scrapeSaasInterfaces({ category, style, limit });
    
    res.status(200).json({
      success: true,
      count: interfaces.length,
      interfaces: interfaces
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to scrape interfaces',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function scrapeSaasInterfaces(params: {
  category?: string;
  style?: string;
  limit: number;
}) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the actual SaaS interface collection
    console.log('Navigating to app.saasinterface.com/pages/');
    await page.goto('https://app.saasinterface.com/pages/', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Apply filters if provided
    if (params.category) {
      await applyFilter(page, 'category', params.category);
    }

    if (params.style) {
      await applyFilter(page, 'style', params.style);
    }

    // Scroll to load more interfaces (handle lazy loading)
    const interfaces = await scrollAndCollectInterfaces(page, params.limit);

    return interfaces;

  } finally {
    await browser.close();
  }
}

async function applyFilter(page: any, filterType: string, value: string) {
  try {
    // Look for filter buttons or dropdowns
    const filterSelectors = [
      `[data-filter="${filterType}"]`,
      `[data-category="${value}"]`,
      `button:contains("${value}")`,
      `a:contains("${value}")`,
      `.filter-${filterType}`,
      `.${filterType}-filter`
    ];

    for (const selector of filterSelectors) {
      try {
        await page.click(selector);
        await page.waitForTimeout(2000);
        console.log(`Applied filter: ${filterType} = ${value}`);
        return;
      } catch (e) {
        // Try next selector
        continue;
      }
    }

    // If no filter buttons found, try search
    const searchSelector = 'input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]';
    const searchInput = await page.$(searchSelector);
    
    if (searchInput) {
      await searchInput.type(value);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000);
      console.log(`Used search for: ${value}`);
    }

  } catch (error) {
    console.log(`Could not apply filter ${filterType}:${value}`, error);
  }
}

async function scrollAndCollectInterfaces(page: any, limit: number) {
  const interfaces: any[] = [];
  let previousCount = 0;
  let scrollAttempts = 0;
  const maxScrollAttempts = 10;

  while (interfaces.length < limit && scrollAttempts < maxScrollAttempts) {
    // Extract interfaces from current view
    const currentInterfaces = await extractInterfacesFromPage(page);
    
    // Add new unique interfaces
    for (const iface of currentInterfaces) {
      if (!interfaces.find(existing => existing.id === iface.id || existing.name === iface.name)) {
        interfaces.push(iface);
      }
    }

    console.log(`Found ${interfaces.length} interfaces so far...`);

    // If we have enough, stop
    if (interfaces.length >= limit) {
      break;
    }

    // If no new interfaces found, try scrolling
    if (interfaces.length === previousCount) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await page.waitForTimeout(3000);
      scrollAttempts++;
    } else {
      scrollAttempts = 0; // Reset if we found new content
    }

    previousCount = interfaces.length;
  }

  return interfaces.slice(0, limit);
}

async function extractInterfacesFromPage(page: any) {
  return await page.evaluate(() => {
    const interfaces: any[] = [];

    // 🔥 PRECISION EXTRACTION: Based on the EXACT HTML structure you provided!
    console.log('🚀 Using PRECISION extraction for app.saasinterface.com');

    // The EXACT selector from your HTML source
    const cards = document.querySelectorAll('.post[data-id][data-img]');
    console.log(`Found ${cards.length} interface cards using precision selector`);

    if (cards.length > 0) {
      cards.forEach((card: Element, index: number) => {
        try {
          const cardEl = card as HTMLElement;
          
          // Extract data attributes - THE GOLDMINE! 🏆
          const dataId = cardEl.getAttribute('data-id');
          const dataImg = cardEl.getAttribute('data-img');
          
          // Extract company name from data-title span
          const titleSpan = cardEl.querySelector('span[data-title]');
          const company = titleSpan ? titleSpan.textContent?.trim() : '';
          
          // Extract category from the category link
          const categoryLink = cardEl.querySelector('.post-cats a');
          const category = categoryLink ? categoryLink.textContent?.trim() : '';
          const categoryHref = categoryLink ? categoryLink.getAttribute('href') : '';
          
          // Extract company link
          const companyLink = cardEl.querySelector('a[data-company]');
          const companyHref = companyLink ? companyLink.getAttribute('href') : '';
          
          // Extract preview link
          const previewLink = cardEl.querySelector('a[data-preview-button]');
          const previewHref = previewLink ? previewLink.getAttribute('href') : '';
          
          // Extract main image
          const img = cardEl.querySelector('img');
          const imageUrl = img ? img.getAttribute('src') : dataImg;
          const imageSrcset = img ? img.getAttribute('srcset') : '';
          
          // Get high-res image from srcset if available
          const highResImage = extractHighResFromSrcset(imageSrcset) || imageUrl;
          
          // Map category to app type
          const appType = mapCategoryToAppType(categoryHref);
          
          // Infer style from company
          const style = inferStyleFromCompany(company || '');
          
          // Infer industry
          const industry = inferIndustryFromCategory(category || '');
          
          // Generate tags
          const tags = generateTagsFromCategory(category || '', company || '');

          if (dataId && (company || category)) {
            interfaces.push({
              id: `saas-interface-${dataId}`,
              name: `${company} - ${category}`,
              company: company || 'Unknown',
              category: appType,
              style: style,
              industry: industry,
              previewUrl: previewHref ? `https://app.saasinterface.com${previewHref}` : '',
              thumbnailUrl: highResImage || '',
              lowResUrl: imageUrl || '',
              tags: tags,
              rawCategory: category || '',
              categorySlug: extractCategorySlug(categoryHref || ''),
              companySlug: extractCompanySlug(companyHref || ''),
              dataId: dataId,
              htmlSource: null, // Will be fetched separately if needed
              
              // Additional metadata
              metadata: {
                originalImageSrc: imageUrl,
                imageSrcset: imageSrcset,
                categoryHref: categoryHref,
                companyHref: companyHref,
                previewHref: previewHref,
                extractedAt: new Date().toISOString()
              }
            });
          }
        } catch (error) {
          console.log(`Error processing interface card ${index}:`, error);
        }
      });
    } else {
      // Fallback to original method if precision extraction fails
      console.log('🔄 Falling back to general extraction method');
      
      const possibleSelectors = [
        'div[class*="post"]',
        '.grid > div',
        '[data-id]',
        'article',
        '.card'
      ];

      let fallbackCards: NodeListOf<Element> | null = null;

      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          fallbackCards = elements;
          console.log(`Using fallback selector: ${selector}, found ${elements.length} cards`);
          break;
        }
      }

      if (fallbackCards) {
        fallbackCards.forEach((card: Element, index: number) => {
          try {
            const img = card.querySelector('img');
            const link = card.querySelector('a');
            const text = card.textContent || '';
            
            if (img && text.length > 10) {
              const company = extractCompanyFromText(text);
              const category = inferCategoryFromContent(text);
              
              interfaces.push({
                id: `fallback-${index}-${Date.now()}`,
                name: `${company} - ${category}`,
                company: company,
                category: mapCategoryToAppType(category),
                style: 'modern',
                industry: 'general',
                previewUrl: link?.getAttribute('href') || '',
                thumbnailUrl: img.getAttribute('src') || '',
                tags: extractTagsFromContent(text),
                rawCategory: category,
                htmlSource: null
              });
            }
          } catch (error) {
            console.log(`Error in fallback processing ${index}:`, error);
          }
        });
      }
    }

    // Helper functions for PRECISION extraction
    function extractHighResFromSrcset(srcset: string | null): string | null {
      if (!srcset) return null;
      
      // Extract the 2x image from srcset like "image-800x500.png 2x"
      const match = srcset.match(/([^\s]+)\s+2x/);
      return match ? match[1] : null;
    }

    function mapCategoryToAppType(categoryHref: string): string {
      const categoryMap: { [key: string]: string } = {
        'dashboard': 'saas',
        'billing-plan': 'saas',
        'pricing': 'saas',
        'checkout': 'ecommerce',
        'maps': 'content',
        'onboarding': 'saas',
        'lists-tables': 'saas',
        'directory': 'content',
        'messaging-chat': 'saas',
        'builder-editor': 'saas',
        'calendar': 'saas',
        'sign-up': 'saas',
        'sign-in': 'saas',
        'item-details': 'ecommerce',
        'profile-user': 'saas',
        'settings': 'saas',
        'forms': 'saas'
      };
      
      const slug = extractCategorySlug(categoryHref);
      return categoryMap[slug] || 'saas';
    }

    function inferStyleFromCompany(company: string): string {
      const lowerCompany = company.toLowerCase();
      
      if (lowerCompany.includes('perplexity')) return 'minimal';
      if (lowerCompany.includes('kinhive')) return 'corporate';
      if (lowerCompany.includes('assembly')) return 'professional';
      if (lowerCompany.includes('fiko')) return 'creative';
      if (lowerCompany.includes('postman')) return 'corporate';
      if (lowerCompany.includes('shortcut')) return 'minimal';
      if (lowerCompany.includes('pampam')) return 'modern';
      
      return 'modern';
    }

    function inferIndustryFromCategory(category: string): string {
      const lowerCategory = category.toLowerCase();
      
      if (lowerCategory.includes('billing') || lowerCategory.includes('pricing') || lowerCategory.includes('checkout')) return 'finance';
      if (lowerCategory.includes('maps')) return 'transportation';
      if (lowerCategory.includes('messaging') || lowerCategory.includes('chat')) return 'communication';
      if (lowerCategory.includes('calendar')) return 'productivity';
      if (lowerCategory.includes('builder') || lowerCategory.includes('editor')) return 'development';
      if (lowerCategory.includes('dashboard')) return 'analytics';
      
      return 'general';
    }

    function generateTagsFromCategory(category: string, company: string): string[] {
      const tags: string[] = [];
      const lowerCategory = category.toLowerCase();
      const lowerCompany = company.toLowerCase();
      
      // Category-based tags
      if (lowerCategory.includes('dashboard')) tags.push('analytics', 'metrics', 'charts');
      if (lowerCategory.includes('billing')) tags.push('subscription', 'payment', 'plans');
      if (lowerCategory.includes('checkout')) tags.push('ecommerce', 'payment', 'cart');
      if (lowerCategory.includes('onboarding')) tags.push('tutorial', 'getting-started', 'setup');
      if (lowerCategory.includes('pricing')) tags.push('plans', 'subscription', 'billing');
      if (lowerCategory.includes('calendar')) tags.push('scheduling', 'events', 'appointments');
      if (lowerCategory.includes('messaging')) tags.push('chat', 'communication', 'messages');
      
      // Company-based tags
      if (lowerCompany.includes('perplexity')) tags.push('ai', 'search', 'minimal');
      if (lowerCompany.includes('postman')) tags.push('api', 'developer-tools', 'corporate');
      if (lowerCompany.includes('assembly')) tags.push('productivity', 'collaboration', 'professional');
      
      // Default tags
      tags.push('modern', 'responsive', 'ui');
      
      return [...new Set(tags)]; // Remove duplicates
    }

    function extractCategorySlug(categoryHref: string): string {
      const match = categoryHref.match(/\/pages\/([^\/]+)\//);
      return match ? match[1] : '';
    }

    function extractCompanySlug(companyHref: string): string {
      const match = companyHref.match(/\/company\/([^\/]+)\//);
      return match ? match[1] : '';
    }

    function extractCompanyFromText(text: string): string {
      const lines = text.split('\n').filter(line => line.trim());
      return lines[0]?.trim() || 'Unknown';
    }

    function inferCategoryFromContent(text: string): string {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('dashboard')) return 'dashboard';
      if (lowerText.includes('pricing')) return 'pricing';
      if (lowerText.includes('checkout')) return 'checkout';
      if (lowerText.includes('calendar')) return 'calendar';
      if (lowerText.includes('maps')) return 'maps';
      if (lowerText.includes('messaging')) return 'messaging-chat';
      
      return 'general';
    }

    function extractTagsFromContent(text: string): string[] {
      const tags: string[] = [];
      const lowerText = text.toLowerCase();
      
      const patterns = ['dashboard', 'pricing', 'checkout', 'calendar', 'maps', 'modern', 'ui'];
      patterns.forEach(pattern => {
        if (lowerText.includes(pattern)) tags.push(pattern);
      });
      
      return tags;
    }

    // Helper functions
    function extractCompanyFromTitle(title: string): string {
      if (!title) return 'Unknown';
      
      // Common patterns: "CompanyName - Description" or "CompanyName Dashboard"
      const parts = title.split(/[-–|]/);
      if (parts.length > 1) {
        return parts[0].trim();
      }
      
      const words = title.split(' ');
      return words[0] || 'Unknown';
    }

    function inferCategoryFromContent(text: string): string {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('dashboard') || lowerText.includes('analytics')) return 'dashboard';
      if (lowerText.includes('landing') || lowerText.includes('home')) return 'landing';
      if (lowerText.includes('pricing') || lowerText.includes('plan')) return 'pricing';
      if (lowerText.includes('checkout') || lowerText.includes('payment')) return 'checkout';
      if (lowerText.includes('login') || lowerText.includes('signup') || lowerText.includes('auth')) return 'auth';
      if (lowerText.includes('profile') || lowerText.includes('account')) return 'profile';
      if (lowerText.includes('settings') || lowerText.includes('config')) return 'settings';
      if (lowerText.includes('table') || lowerText.includes('list')) return 'data';
      if (lowerText.includes('form') || lowerText.includes('contact')) return 'form';
      if (lowerText.includes('calendar')) return 'calendar';
      
      return 'general';
    }

    function extractTagsFromContent(text: string): string[] {
      const tags: string[] = [];
      const lowerText = text.toLowerCase();
      
      const tagPatterns = [
        'react', 'vue', 'angular', 'svelte',
        'tailwind', 'bootstrap', 'css',
        'dark', 'light', 'modern', 'minimal',
        'mobile', 'responsive', 'desktop'
      ];
      
      tagPatterns.forEach(pattern => {
        if (lowerText.includes(pattern)) {
          tags.push(pattern);
        }
      });
      
      return tags;
    }

    return interfaces;
  });
}
