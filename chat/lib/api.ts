// Function to fetch data from the Instagram Graph API

export async function fetchInstagramData(
  endpoint: string,
  params: Record<string, string> = {},
  access_token: string,
) {
  const url = new URL(`https://graph.facebook.com/v24.0${endpoint}`);
  url.search = new URLSearchParams({
    ...params,
    access_token,
  }).toString();

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Instagram API error: ${error.error.message}`);
  }

  return response.json();
}
