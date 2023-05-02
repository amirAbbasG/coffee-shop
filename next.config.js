/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  sw: '/service-worker.js',
})

const nextConfig =  withPWA({
  reactStrictMode: true,
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === "production" && {
      exclude: ['error'],
    },
  },
})

module.exports = nextConfig
