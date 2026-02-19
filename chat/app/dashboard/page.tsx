export default async function DashboardContent() {
    const me = 'me';
    const conversations = await fetch('/api/instagram/me/conversations?platform=instagram')
        .then(res => res.json())
        .then(data => data?.data || [])
        .catch(error => {
            console.error('Failed to fetch conversations:', error);
            return [];
        });

    console.log('Fetched conversations:', conversations);

    return <div></div>;
}
