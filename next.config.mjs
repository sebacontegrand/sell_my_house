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
            protocol: 'http',
            hostname: 'http2.mlstatic.com'

        }]
    }

};
module.exports = {
    env: {
        POSTGRES_URL: process.env.POSTGRES_URL,
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET
    }
}

export default nextConfig;
