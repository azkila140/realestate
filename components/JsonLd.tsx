export function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Dubai Prime Estates",
        "image": "https://images.unsplash.com/photo-1512453979798-5ea904ac6605",
        "description": "Leading luxury real estate agency in Dubai specializing in penthouses, villas, and off-plan investments.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Downtown Dubai",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "postalCode": "00000",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "25.1972",
            "longitude": "55.2744"
        },
        "url": "https://luxury-real-estate-demo.vercel.app",
        "telephone": "+971500000000",
        "priceRange": "$$$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/dubai_prime_estates",
            "https://www.linkedin.com/company/dubai-prime-estates"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
