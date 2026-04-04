import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KanyaGuide - Smart Tourism for Kanyakumari',
    short_name: 'KanyaGuide',
    description: 'Your ultimate guide to exploring the beauty and culture of Kanyakumari.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EAF6F9',
    theme_color: '#22A3C2',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
