import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Mohit Lakhara | 🚀 MERN Developer & UI/UX Engineer',
  description: 'v4 Cosmic Cyber Portfolio of Mohit Lakhara. Exploring high-end React, Node.js, and MongoDB architectures through cinematic web experiences.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeClient />;
}
