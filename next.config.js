/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["rickandmortyapi.com"]
    },
    experimental: {
        esmExternals: "loose"
    }
}

module.exports = nextConfig
