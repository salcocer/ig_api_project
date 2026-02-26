import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                // hostname: 'scontent.cdninstagram.com',
                hostname: 'scontent-nrt6-1.cdninstagram.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
