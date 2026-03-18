/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'tailus.io'
        },
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',

        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com'

        },
        {
            protocol: 'https',
            hostname: '**.public.blob.vercel-storage.com'
        },
        {
            protocol: 'https',
            hostname: 'imgar.zonapropcdn.com'
        },
        {
            protocol: 'https',
            hostname: 'www.argenprop.com'
        },
        {
            protocol: 'https',
            hostname: 'argenprop.com'
        }]
    }
};

export default nextConfig;
