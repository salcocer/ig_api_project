// Functions to fetch data from the Instagram Graph API

export async function fetchShortLivedToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string
) {
    // if (typeof window !== 'undefined') {
    //     throw new Error(
    //         'fetchShortLivedToken must be called from the server (no CORS / secret in browser)'
    //     );
    // }

    const url = 'https://api.instagram.com/oauth/access_token';

    // Do NOT double-encode `redirect_uri` — URLSearchParams will handle form encoding.
    const body = new URLSearchParams({
        client_id,
        client_secret,
        grant_type: 'authorization_code',
        redirect_uri,
        code,
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });
    console.log({ response });
    let data: any;
    try {
        data = await response.json();
    } catch (e) {
        const text = await response.text();
        throw new Error(`Instagram Auth: invalid JSON response: ${text}`);
    }

    if (!response.ok) {
        const message = data?.error_message || data?.error?.message || JSON.stringify(data);
        throw new Error(`Instagram Auth error: ${message}`);
    }

    console.log('fetchShortLivedToken response:', data);
    return data;
}

export async function fetchInstagramData(
    endpoint: string,
    params: Record<string, string> = {},
    access_token: string
) {
    const url = new URL(`https://graph.facebook.com/v24.0${endpoint}`);
    url.search = new URLSearchParams({
        ...params,
        access_token,
    }).toString();

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Instagram API error: ${error.error.message}`);
    }

    return response.json();
}
