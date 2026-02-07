import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SecondaryMarketGrid } from '@/components/SecondaryMarketGrid';
import { DemoDisclaimer } from '@/components/DemoDisclaimer';

export default function SecondaryPage() {
    return (
        <main className="bg-slate-950 min-h-screen">
            <DemoDisclaimer />
            <Navigation />
            <SecondaryMarketGrid />
            <Footer />
        </main>
    );
}
