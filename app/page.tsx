import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Mohit Lakhara | Full Stack Developer & UI/UX Engineer',
  description: 'Portfolio of Mohit Lakhara — Full Stack Developer specializing in React, Next.js, Node.js, and React Native. Building production-grade SaaS, mobile apps, and cinematic web experiences.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeClient />;
}
