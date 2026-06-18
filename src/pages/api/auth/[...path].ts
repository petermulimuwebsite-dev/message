export const prerender = false;

import type { APIRoute } from 'astro';

const CLIENT_ID = import.meta.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.OAUTH_CLIENT_SECRET;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const path = params.path;

  if (path === 'callback') {
    const code = url.searchParams.get('code');
    
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json() as { access_token?: string; error?: string };

    if (data.access_token) {
      const script = `
        <script>
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
            '*'
          );
          window.close();
        </script>
      `;
      return new Response(script, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return new Response('OAuth error', { status: 400 });
  }

  // Initial auth redirect
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
  return Response.redirect(githubUrl, 302);
};