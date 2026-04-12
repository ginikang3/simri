import { MetadataRoute } from 'next';
import { tests } from '@/data/tests';

export default function sitemap(): MetadataRoute.Sitemap {
  const testIds = Object.keys(tests);
  
  const testUrls = testIds.map((id) => ({
    url: `https://yourdomain.com/test/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...testUrls,
  ];
}