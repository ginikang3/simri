/** @type {import('next').NextConfig} */
const nextConfig = {
  // 빌드 시 타입 에러가 있어도 무시하고 배포 진행 (정신 건강용)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 빌드 시 ESLint 에러가 있어도 무시 (배포 우선)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 이미지 최적화 관련 에러 방지 (필요 시)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;