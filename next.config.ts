import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gama-portal",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/gama-portal",
  },
};

export default nextConfig;
