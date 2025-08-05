// Zoho OAuth 2.0 with PKCE for enterprise security
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { clientId, clientSecret, redirectUri, code, codeVerifier } = await request.json();
    
    // PKCE OAuth flow
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier
      })
    });
    
    const tokenData = await response.json();
    
    if (tokenData.access_token) {
      return Response.json({
        success: true,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresIn: tokenData.expires_in,
        message: 'Zoho authentication successful'
      });
    } else {
      throw new Error(tokenData.error || 'Authentication failed');
    }
    
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message || 'Zoho authentication failed'
    }, { status: 400 });
  }
}

export async function GET() {
  // Generate OAuth URL with PKCE
  const clientId = process.env.ZOHO_CLIENT_ID;
  const redirectUri = process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/api/zoho/callback';
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `scope=ZohoCRM.modules.ALL,ZohoAnalytics.fullaccess.all&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `access_type=offline&` +
    `state=enterprise_demo&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;
  
  return Response.json({
    authUrl,
    codeVerifier,
    state: 'enterprise_demo'
  });
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
