// ============================================================================
// FAKE DATA ECOSYSTEM - Dubai Prime Estates
// ============================================================================
// Purpose: Realistic fake data to demonstrate full real estate pipeline
// Context: Simulated integrations for demo purposes
// ============================================================================

// 1️⃣ FAKE USERS (Website Visitors / Potential Clients)
export const fakeUsers = [
    {
        id: 'user-001',
        name: 'Ahmed Al Mansouri',
        nameAr: 'أحمد المنصوري',
        phone: '+971501234567',
        email: 'ahmed.mansouri@example.ae',
        budget: 1800000,
        budgetRange: '1M-2M',
        interest: 'Villa',
        contactPreference: 'whatsapp',
        nationality: 'UAE',
        status: 'High Priority'
    },
    {
        id: 'user-002',
        name: 'Sarah Williams',
        nameAr: 'سارة ويليامز',
        phone: '+971558765432',
        email: 'sarah.williams@example.com',
        budget: 850000,
        budgetRange: '500K-1M',
        interest: 'Apartment',
        contactPreference: 'call',
        nationality: 'UK',
        status: 'Medium Priority'
    },
    {
        id: 'user-003',
        name: 'Mohammed Al Falasi',
        nameAr: 'محمد الفلاسي',
        phone: '+971509876543',
        email: 'mohammed.falasi@example.ae',
        budget: 4200000,
        budgetRange: '2M-5M',
        interest: 'Penthouse',
        contactPreference: 'whatsapp',
        nationality: 'UAE',
        status: 'VIP'
    },
    {
        id: 'user-004',
        name: 'Fatima Hassan',
        nameAr: 'فاطمة حسن',
        phone: '+971551122334',
        email: 'fatima.hassan@example.ae',
        budget: 650000,
        budgetRange: '500K-1M',
        interest: 'Apartment',
        contactPreference: 'email',
        nationality: 'UAE',
        status: 'Medium Priority'
    },
    {
        id: 'user-005',
        name: 'James Miller',
        nameAr: 'جيمس ميلر',
        phone: '+971567788990',
        email: 'james.miller@example.com',
        budget: 2400000,
        budgetRange: '2M-5M',
        interest: 'Villa',
        contactPreference: 'whatsapp',
        nationality: 'USA',
        status: 'High Priority'
    }
];

// 2️⃣ FAKE PROPERTIES (For Sale)
export const fakeProperties = [
    {
        id: 'villa-001',
        ref: 'VILLA-PJ-001',
        title: 'Luxury 4BR Villa – Palm Jumeirah',
        titleAr: 'فيلا فاخرة 4 غرف نوم - نخلة جميرا',
        price: 3500000,
        type: 'Villa',
        bedrooms: 4,
        bathrooms: 5,
        area: 4500,
        location: 'Palm Jumeirah',
        locationAr: 'نخلة جميرا',
        status: 'For Sale',
        assignedAgent: 'Omar Hassan',
        features: ['Private Beach', 'Pool', 'Maid Room', 'Garden'],
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        description: 'Stunning beachfront villa with panoramic sea views'
    },
    {
        id: 'apt-014',
        ref: 'APT-DM-014',
        title: '2BR Apartment – Dubai Marina',
        titleAr: 'شقة غرفتين نوم - دبي مارينا',
        price: 950000,
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        location: 'Dubai Marina',
        locationAr: 'دبي مارينا',
        status: 'For Sale',
        assignedAgent: 'Lina Farouk',
        features: ['Marina View', 'Balcony', 'Gym', 'Pool'],
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
        description: 'Modern apartment with stunning marina views'
    },
    {
        id: 'pent-003',
        ref: 'PENT-DT-003',
        title: '5BR Penthouse – Downtown Dubai',
        titleAr: 'بنتهاوس 5 غرف نوم - وسط مدينة دبي',
        price: 7200000,
        type: 'Penthouse',
        bedrooms: 5,
        bathrooms: 6,
        area: 6000,
        location: 'Downtown Dubai',
        locationAr: 'وسط مدينة دبي',
        status: 'For Sale',
        assignedAgent: 'Omar Hassan',
        features: ['Burj Khalifa View', 'Private Terrace', 'Jacuzzi', 'Smart Home'],
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
        description: 'Ultra-luxury penthouse with iconic Burj Khalifa views'
    },
    {
        id: 'town-007',
        ref: 'TOWN-AR-007',
        title: '3BR Townhouse – Arabian Ranches',
        titleAr: 'تاون هاوس 3 غرف نوم - المرابع العربية',
        price: 1650000,
        type: 'Townhouse',
        bedrooms: 3,
        bathrooms: 4,
        area: 2200,
        location: 'Arabian Ranches',
        locationAr: 'المرابع العربية',
        status: 'For Sale',
        assignedAgent: 'Lina Farouk',
        features: ['Garden', 'Community Pool', 'Park View', 'Pet Friendly'],
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
        description: 'Family-friendly townhouse in gated community'
    },
    {
        id: 'comm-012',
        ref: 'COMM-DIFC-012',
        title: 'Premium Office Space – DIFC',
        titleAr: 'مساحة مكتبية فاخرة - مركز دبي المالي العالمي',
        price: 2800000,
        type: 'Commercial',
        area: 1800,
        location: 'DIFC',
        locationAr: 'مركز دبي المالي العالمي',
        status: 'For Sale',
        assignedAgent: 'Omar Hassan',
        features: ['Grade A Building', 'Fitted', 'Parking', '24/7 Security'],
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c'],
        description: 'Prime office space in Dubai\'s financial hub'
    }
];

// 3️⃣ FAKE RENTALS
export const fakeRentals = [
    {
        id: 'rent-001',
        ref: 'RENT-DT-001',
        title: '1BR Furnished Apartment – Downtown',
        titleAr: 'شقة مفروشة غرفة نوم واحدة - وسط المدينة',
        rent: 85000,
        period: 'Yearly',
        type: 'Apartment',
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        location: 'Downtown Dubai',
        locationAr: 'وسط مدينة دبي',
        availability: 'Available',
        assignedAgent: 'Lina Farouk',
        features: ['Fully Furnished', 'Bills Included', 'Gym', 'Pool'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267']
    },
    {
        id: 'rent-002',
        ref: 'RENT-JBR-002',
        title: '2BR Beachfront Apartment – JBR',
        titleAr: 'شقة على الشاطئ غرفتين نوم - جي بي آر',
        rent: 120000,
        period: 'Yearly',
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        location: 'Jumeirah Beach Residence',
        locationAr: 'جميرا بيتش ريزيدنس',
        availability: 'Available',
        assignedAgent: 'Omar Hassan',
        features: ['Beach Access', 'Furnished', 'Balcony', 'Parking'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688']
    }
];

// 4️⃣ FAKE AGENTS / ADMINS
export const fakeAgents = [
    {
        id: 'agent-001',
        name: 'Omar Hassan',
        nameAr: 'عمر حسن',
        role: 'Senior Agent',
        roleAr: 'وكيل أول',
        whatsapp: '+971566665560',
        email: 'omar.hassan@dubaiprimeestates.ae',
        phone: '+971566665560',
        specialization: ['Luxury Villas', 'Penthouses', 'Commercial'],
        languages: ['Arabic', 'English'],
        experience: '15 years',
        totalSales: 250,
        activeLeads: 12,
        avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
        id: 'agent-002',
        name: 'Lina Farouk',
        nameAr: 'لينا فاروق',
        role: 'Junior Agent',
        roleAr: 'وكيل مبتدئ',
        whatsapp: '+971501234568',
        email: 'lina.farouk@dubaiprimeestates.ae',
        phone: '+971501234568',
        specialization: ['Apartments', 'Townhouses', 'Rentals'],
        languages: ['Arabic', 'English', 'French'],
        experience: '3 years',
        totalSales: 45,
        activeLeads: 8,
        avatar: 'https://i.pravatar.cc/150?img=45'
    },
    {
        id: 'agent-003',
        name: 'Mohamad Kodmani',
        nameAr: 'محمد قدماني',
        role: 'CEO & Founder',
        roleAr: 'الرئيس التنفيذي والمؤسس',
        whatsapp: '+971566665560',
        email: 'mohamad@dubaiprimeestates.ae',
        phone: '+971566665560',
        specialization: ['Ultra-Luxury', 'Investment', 'VIP Clients'],
        languages: ['Arabic', 'English'],
        experience: '20 years',
        totalSales: 500,
        activeLeads: 5,
        avatar: '/mohamad-hero.png'
    }
];

// 5️⃣ FAKE LEADS (CRM Pipeline)
export const fakeLeads = [
    {
        leadId: 'lead-1001',
        name: 'Ahmed Al Mansouri',
        nameAr: 'أحمد المنصوري',
        phone: '+971501234567',
        email: 'ahmed.mansouri@example.ae',
        budget: 1800000,
        budgetRange: '1M-2M',
        propertyType: 'Villa',
        propertyInterest: 'Palm Jumeirah Villa',
        source: 'Website',
        assignedAgent: 'Omar Hassan',
        status: 'New',
        priority: 'High',
        contactPreference: 'whatsapp',
        createdAt: '2026-02-07T10:15:00Z',
        lastContactedAt: null,
        notes: 'Looking for beachfront property, cash buyer'
    },
    {
        leadId: 'lead-1002',
        name: 'Sarah Williams',
        phone: '+971558765432',
        email: 'sarah.williams@example.com',
        budget: 850000,
        budgetRange: '500K-1M',
        propertyType: 'Apartment',
        propertyInterest: 'Dubai Marina Apartment',
        source: 'Website',
        assignedAgent: 'Lina Farouk',
        status: 'Contacted',
        priority: 'Medium',
        contactPreference: 'call',
        createdAt: '2026-02-06T14:30:00Z',
        lastContactedAt: '2026-02-06T15:00:00Z',
        notes: 'Interested in 2BR, viewing scheduled for tomorrow'
    },
    {
        leadId: 'lead-1003',
        name: 'James Miller',
        phone: '+971567788990',
        email: 'james.miller@example.com',
        budget: 2400000,
        budgetRange: '2M-5M',
        propertyType: 'Villa',
        propertyInterest: 'Palm Villas',
        source: 'Meta Ads',
        campaign: 'Palm Villas 2026',
        assignedAgent: 'Omar Hassan',
        status: 'Qualified',
        priority: 'High',
        contactPreference: 'whatsapp',
        createdAt: '2026-02-05T09:20:00Z',
        lastContactedAt: '2026-02-05T10:00:00Z',
        notes: 'From Meta campaign, very interested, pre-approved mortgage'
    },
    {
        leadId: 'lead-1004',
        name: 'Fatima Hassan',
        nameAr: 'فاطمة حسن',
        phone: '+971551122334',
        email: 'fatima.hassan@example.ae',
        budget: 650000,
        budgetRange: '500K-1M',
        propertyType: 'Apartment',
        propertyInterest: 'Dubai Marina',
        source: 'Website',
        assignedAgent: 'Lina Farouk',
        status: 'New',
        priority: 'Medium',
        contactPreference: 'email',
        createdAt: '2026-02-07T11:45:00Z',
        lastContactedAt: null,
        notes: 'First-time buyer, needs financing advice'
    }
];

// 6️⃣ FAKE WHATSAPP MESSAGES
export const generateWhatsAppMessage = (lead: typeof fakeLeads[0]) => {
    return {
        to: lead.assignedAgent === 'Omar Hassan' ? '+971566665560' : '+971501234568',
        message: `🏢 *New Website Lead*

👤 *Client*: ${lead.name}
💰 *Budget*: ${lead.budget.toLocaleString()} AED
🏠 *Property Type*: ${lead.propertyType}
📍 *Interest*: ${lead.propertyInterest}
📱 *Contact*: ${lead.contactPreference}

🎯 *Assigned Agent*: ${lead.assignedAgent}
⚡ *Priority*: ${lead.priority}
📊 *Source*: ${lead.source}

---
*Lead ID*: ${lead.leadId}
*Created*: ${new Date(lead.createdAt).toLocaleString()}`,
        delivery: 'success',
        channel: 'whatsapp',
        messageId: `wa-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
    };
};

// 7️⃣ FAKE META LEADS
export const fakeMetaLeads = [
    {
        source: 'Meta Ads',
        platform: 'Facebook',
        campaign: 'Palm Villas 2026',
        adId: '120208234567890',
        formId: '987654321',
        name: 'James Miller',
        phone: '+971567788990',
        email: 'james.miller@example.com',
        budget: 2400000,
        budgetRange: '2M-5M',
        propertyType: 'Villa',
        contactPreference: 'whatsapp',
        submittedAt: '2026-02-05T09:20:00Z'
    },
    {
        source: 'Meta Ads',
        platform: 'Instagram',
        campaign: 'Marina Apartments Q1',
        adId: '120208234567891',
        formId: '987654322',
        name: 'Elena Rodriguez',
        phone: '+971523456789',
        email: 'elena.rodriguez@example.com',
        budget: 900000,
        budgetRange: '500K-1M',
        propertyType: 'Apartment',
        contactPreference: 'call',
        submittedAt: '2026-02-06T16:30:00Z'
    }
];

// 8️⃣ FAKE SYSTEM LOGS
export const generateSystemLogs = (leadId: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    return [
        `[${timestamp}] Lead received (Website) - ID: ${leadId}`,
        `[${timestamp}] Lead validated - Phone: +971XXXXXXXXX`,
        `[${timestamp}] Lead routed to Senior Agent - Budget: High`,
        `[${timestamp}] WhatsApp message sent - Status: Success`,
        `[${timestamp}] Lead saved in CRM - Status: New`,
        `[${timestamp}] Agent notification sent - Channel: WhatsApp`,
        `[${timestamp}] Lead processing complete - Duration: 450ms`
    ];
};

// 9️⃣ FAKE PERFORMANCE METRICS
export const fakePerformanceMetrics = {
    ttfb: '180ms',
    fcp: '0.8s',
    lcp: '1.2s',
    cls: '0.01',
    tbt: '50ms',
    tti: '1.5s',
    lighthouseScore: 98,
    deployment: 'Vercel Edge',
    region: 'Dubai (Middle East)',
    uptime: '99.99%',
    avgResponseTime: '120ms'
};

// 🔟 LEAD ROUTING LOGIC (Simulated)
export const routeLead = (budget: number, propertyType: string) => {
    // High-value leads (2M+) → Senior Agent
    if (budget >= 2000000) {
        return {
            agent: 'Omar Hassan',
            priority: 'High',
            reason: 'High-value lead (2M+ AED)',
            responseTime: '< 5 minutes'
        };
    }

    // Commercial properties → Senior Agent
    if (propertyType === 'Commercial') {
        return {
            agent: 'Omar Hassan',
            priority: 'High',
            reason: 'Commercial property specialist required',
            responseTime: '< 10 minutes'
        };
    }

    // Standard leads → Junior Agent
    return {
        agent: 'Lina Farouk',
        priority: 'Medium',
        reason: 'Standard lead routing',
        responseTime: '< 15 minutes'
    };
};

// Export all fake data
export const fakeData = {
    users: fakeUsers,
    properties: fakeProperties,
    rentals: fakeRentals,
    agents: fakeAgents,
    leads: fakeLeads,
    metaLeads: fakeMetaLeads,
    performanceMetrics: fakePerformanceMetrics,
    generateWhatsAppMessage,
    generateSystemLogs,
    routeLead
};
