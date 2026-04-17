import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase'; // ✅ 연동된 DB 클라이언트 사용

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://simri.lat';

  // 1. DB에서 테스트 데이터 가져오기 (SEO를 위해 ID 목록 확보)
  const { data: tests } = await supabase
    .from('tests')
    .select('id');

  // 2. DB 기반 동적 URL 생성
  const testUrls = tests?.map((test) => ({
    url: `${baseUrl}/test/${test.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  // 3. 기본 페이지들과 합체
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...testUrls,
  ];
}