import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SecondaryMarketGrid } from '@/components/SecondaryMarketGrid';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Secondary Market Properties | Ready to Move',
    description: 'Verified resale luxury properties in Dubai. Palm Jumeirah, Downtown, and Marina apartments available for immediate transfer.',
};

export default function SecondaryPage() {
    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />
            <SecondaryMarketGrid />
            <Footer />
        </main>
    );
}
