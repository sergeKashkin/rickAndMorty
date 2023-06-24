
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["rickandmortyapi.com"]
    },
    experimental: {
        esmExternals: "loose"
    },
    future: {
        webpack5: true
    }
}

module.exports = nextConfig
