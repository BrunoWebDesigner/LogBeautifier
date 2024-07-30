/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    basePath: isProd ? '/LogBeautifier' : '',
    assetPrefix: isProd ? '/LogBeautifier/' : '',
};

export default nextConfig;
