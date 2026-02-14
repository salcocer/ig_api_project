// Functions to fetch data from the Instagram Graph API

export async function fetchShortLivedToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string
) {
    const url = 'https://api.instagram.com/oauth/access_token';

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

    if (!response.ok) {
        throw new Error(`Instagram Auth error: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchLongLivedToken(client_secret: string, short_lived_token: string) {
    const url = new URL('https://graph.instagram.com/access_token');
    url.search = new URLSearchParams({
        grant_type: 'ig_exchange_token',
        client_secret,
        access_token: short_lived_token,
    }).toString();

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Long-lived token exchange failed: ${err}`);
    }

    return response.json();
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

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Instagram API error: ${error.error.message}`);
    }

    return response.json();
}
