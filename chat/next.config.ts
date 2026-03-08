import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'scontent-nrt6-1.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent-lax3-1.cdninstagram.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent-*.cdninstagram.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
