import { DemoShowcase } from '@/components/DemoShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Luxury Properties Showcase | Dubai Prime Estates",
    description: "Experience an exclusive visual tour of Dubai's finest real estate. From Palm Jumeirah Villas to Downtown Penthouses.",
    openGraph: {
        title: "Dubai Prime Estates - Digital Experience",
        description: "Interactive 3D-style tour of luxury properties in Dubai.",
        images: ["https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1200"],
    }
};

export default function ShowcasePage() {
    return <DemoShowcase />;
}
