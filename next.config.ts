import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  
  // แนะนำให้ใส่ trailingSlash เวลา export เป็น static html
  trailingSlash: true,

  // ตอน export เป็น static ต้องใช้ unoptimized images เว้นแต่จะใช้ image service แยก
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
