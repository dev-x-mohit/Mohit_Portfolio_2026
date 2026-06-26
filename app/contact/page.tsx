import type { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
    title: 'Contact Mohit Lakhara | Hire a Full Stack Developer',
    description: 'Get in touch with Mohit Lakhara — a Full Stack Developer available for freelance projects, full-time roles, and collaborations. Let\'s build something great together.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Contact Mohit Lakhara | Hire a Full Stack Developer',
        description: 'Get in touch with Mohit Lakhara for freelance or full-time full-stack web and mobile development work.',
        url: 'https://mohitlakhara.vercel.app/contact',
        siteName: 'Mohit Lakhara Portfolio',
        images: [
            {
                url: 'https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-contact.webp',
                width: 1200,
                height: 630,
                alt: 'Contact Mohit Lakhara — Full Stack Developer',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Mohit Lakhara | Hire a Full Stack Developer',
        description: 'Reach out to Mohit Lakhara for full-stack development projects, collaborations, and opportunities.',
        images: ['https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio/og-contact.webp'],
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
