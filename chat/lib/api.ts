// Function to fetch data from the Instagram Graph API
export async function fetchInstagramData(endpoint: string, params: Record<string, string> = {}) {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        throw new Error("Access token is not defined. Make sure to set NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN in your .env.local file.");
    }

    const url = new URL(`https://graph.facebook.com/v24.0${endpoint}`);
    url.search = new URLSearchParams({ ...params, access_token: accessToken }).toString();

    const response = await fetch(url.toString(), {
        method: 'GET',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Instagram API error: ${error.error.message}`);
    }

    return response.json();
}