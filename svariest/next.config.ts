import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  // 1. ถ้า URL คือ https://<username>.github.io/<repository-name>/ 
  // ต้องใส่ชื่อ repo ใน basePath ด้วย (เช่น '/my-nextjs-site')
  basePath: '/inkmax-project', 

  // 2. แนะนำให้ใส่ trailingSlash เพื่อป้องกันปัญหา 404 เมื่อกด Refresh หน้าอื่นที่ไม่ใช่หน้าแรก
  trailingSlash: true,

  // 3. GitHub Pages ไม่มี Server สำหรับจัดการรูปภาพ
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

export default nextConfig;
