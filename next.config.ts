import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/:lang(ka|en|ru|ja|tr|ar)/articles/binis-shefaseba-batumshi",
      destination: "/:lang/articles/binis-shefaseba",
      permanent: true,
    }];
  },
};

export default nextConfig;
