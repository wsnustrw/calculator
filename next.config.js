/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the service worker and other PWA files.
  register: true, // Register the service worker.
  skipWaiting: true, // Skip the waiting phase and activate the new service worker immediately.
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode.
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // any other next.js config you might have
};

module.exports = withPWA(nextConfig);
