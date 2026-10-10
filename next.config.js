/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "1";
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isExport
    ? { output: "export", images: { unoptimized: true }, basePath: process.env.GHPAGES_BASE || "" }
    : {
        async redirects() {
          return [
            { source: "/index.php", destination: "/", permanent: true },
            { source: "/index.php/news", destination: "/news", permanent: true },
            { source: "/index.php/news/:path*", destination: "/news", permanent: true },
            { source: "/index.php/about-us", destination: "/about", permanent: true },
            { source: "/index.php/about-us/:path*", destination: "/about", permanent: true },
            { source: "/index.php/activity", destination: "/activity", permanent: true },
            { source: "/index.php/activity/:path*", destination: "/activity", permanent: true },
            { source: "/index.php/docs", destination: "/docs", permanent: true },
            { source: "/index.php/kniga-pocheta", destination: "/honor", permanent: true },
            { source: "/index.php/kniga-pocheta/:path*", destination: "/honor", permanent: true },
            { source: "/index.php/partners", destination: "/partners", permanent: true },
            { source: "/index.php/kontakty", destination: "/contacts", permanent: true },
          ];
        },
      }),
};
module.exports = nextConfig;
