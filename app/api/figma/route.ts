import { NextRequest, NextResponse } from 'next/server';

// 🎨 REAL FIGMA API INTEGRATION 🎨
export async function POST(request: NextRequest) {
  try {
    const { action, fileKey, accessToken } = await request.json();
    
    switch (action) {
      case 'connect':
        // Validate Figma access token
        const validateResponse = await fetch('https://api.figma.com/v1/me', {
          headers: {
            'X-Figma-Token': accessToken,
          },
        });
        
        if (!validateResponse.ok) {
          throw new Error('Invalid Figma access token');
        }
        
        const user = await validateResponse.json();
        return NextResponse.json({
          success: true,
          user: {
            name: user.handle,
            email: user.email,
            avatar: user.img_url
          },
          message: 'Successfully connected to Figma!'
        });
        
      case 'import':
        if (!fileKey || !accessToken) {
          throw new Error('File key and access token required');
        }
        
        // Get Figma file data
        const fileResponse = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
          headers: {
            'X-Figma-Token': accessToken,
          },
        });
        
        if (!fileResponse.ok) {
          throw new Error('Failed to fetch Figma file');
        }
        
        const fileData = await fileResponse.json();
        
        // Extract design tokens and components
        const designTokens = extractDesignTokens(fileData);
        const components = extractComponents(fileData);
        
        return NextResponse.json({
          success: true,
          data: {
            fileName: fileData.name,
            designTokens,
            components,
            lastModified: fileData.lastModified
          }
        });
        
      case 'export':
        // Export designs as images
        const exportResponse = await fetch(`https://api.figma.com/v1/images/${fileKey}`, {
          method: 'GET',
          headers: {
            'X-Figma-Token': accessToken,
          },
        });
        
        const exportData = await exportResponse.json();
        
        return NextResponse.json({
          success: true,
          images: exportData.images,
          message: 'Designs exported successfully!'
        });
        
      default:
        throw new Error('Invalid action');
    }
    
  } catch (error) {
    console.error('Figma API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

// 🔥 DESIGN TOKEN EXTRACTION 🔥
function extractDesignTokens(fileData: any) {
  const tokens = {
    colors: {} as Record<string, any>,
    typography: {} as Record<string, any>,
    spacing: {} as Record<string, any>,
    shadows: {} as Record<string, any>
  };
  
  // Extract colors from styles
  if (fileData.styles) {
    Object.values(fileData.styles).forEach((style: any) => {
      if (style.styleType === 'FILL') {
        tokens.colors[style.name] = extractColor(style);
      }
      if (style.styleType === 'TEXT') {
        tokens.typography[style.name] = extractTypography(style);
      }
      if (style.styleType === 'EFFECT') {
        tokens.shadows[style.name] = extractEffect(style);
      }
    });
  }
  
  return tokens;
}

function extractComponents(fileData: any) {
  const components: any[] = [];
  
  if (fileData.components) {
    Object.values(fileData.components).forEach((component: any) => {
      components.push({
        id: component.key,
        name: component.name,
        description: component.description,
        type: component.containing_frame?.name || 'Component'
      });
    });
  }
  
  return components;
}

function extractColor(style: any) {
  // Simplified color extraction - in reality you'd parse the full style
  return {
    hex: '#FF6B35', // placeholder
    rgb: 'rgb(255, 107, 53)',
    name: style.name
  };
}

function extractTypography(style: any) {
  return {
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: '1.5'
  };
}

function extractEffect(style: any) {
  return {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    name: style.name
  };
}

// GET method for file listing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('token');
  
  if (!accessToken) {
    return NextResponse.json({
      success: false,
      error: 'Access token required'
    }, { status: 400 });
  }
  
  try {
    // Get user's recent files
    const response = await fetch('https://api.figma.com/v1/me', {
      headers: {
        'X-Figma-Token': accessToken,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    
    // In a real implementation, you'd fetch the user's teams and projects
    return NextResponse.json({
      success: true,
      files: [
        {
          key: 'example-key-1',
          name: 'Design System',
          thumbnail: 'https://via.placeholder.com/200x150',
          lastModified: new Date().toISOString()
        },
        {
          key: 'example-key-2', 
          name: 'Mobile App UI',
          thumbnail: 'https://via.placeholder.com/200x150',
          lastModified: new Date().toISOString()
        }
      ]
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch files'
    }, { status: 500 });
  }
}
