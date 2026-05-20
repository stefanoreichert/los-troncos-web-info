import type { NextConfig } from "next";

function getWordPressImagePattern() {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) return null;

  try {
    const url = new URL(apiUrl);

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const wordpressImagePattern = getWordPressImagePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...(wordpressImagePattern ? [wordpressImagePattern] : []),
    ],
  },
};

export default nextConfig;
