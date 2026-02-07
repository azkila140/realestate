# Infrastructure & Deployment Strategy

## 🏗️ Architecture Overview

This project is architected as a **High-Performance Sales Machine**, leveraging Server-Side Rendering (SSR) for SEO and Edge Functions for low-latency lead processing.

### Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Next.js Server Actions, Supabase (PostgreSQL + RLS)
- **Infrastructure**: Vercel Edge Network
- **Monitoring**: Vercel Analytics, Custom Logging (Supabase)

---

## 🔐 Environment Variables (`.env.local`)

Strict management of secrets is enforced. No sensitive keys are committed to the repository.

| Variable | Description | Security Level |
|----------|-------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | API Endpoint for Database | Public (Safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side API Key | Public (RLS Protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin API Key (Server Actions only) | **Critical Secret** |
| `WHATSAPP_API_TOKEN` | Meta Graph API Token | **Critical Secret** |
| `CRM_WEBHOOK_SECRET` | Signature verification for Webhooks | **Critical Secret** |

---

## 🚀 Deployment Pipeline (CI/CD)

We utilize **Vercel Git Integration** for automated deployments.

1.  **Develop**: Feature branches (e.g., `feature/crm-integration`)
2.  **Preview**: Pull Request triggers a **Preview Deployment**.
    *   *Automated Checks*: Linting, Type Safety, Build Verification.
    *   *Manual QA*: Share preview URL with stakeholders.
3.  **Production**: Merge to `main` triggers **Production Deployment**.
    *   *Cache Invalidation*: Instant cache purge on edge network.
    *   *Database Migrations*: Applied via Supabase CLI (GitHub Actions).

### 🛡️ Rollback Strategy
In case of a critical failure:
1.  Go to Vercel Dashboard -> Deployments.
2.  Click the "..." on the previous stable deployment.
3.  Select **"Instant Rollback"**.
4.  *Time to Recovery (RTO)*: < 30 seconds.

---

## 📊 Monitoring & Observability

### 1. Business Logic Logs (`system_logs`)
We maintain a custom logging table in Supabase to track business-critical events that Vercel logs might miss.
*   **Table**: `system_logs`
*   **Events Tracked**: `LEAD_CAPTURE`, `WHATSAPP_OUTBOUND`, `CRM_SYNC_FAIL`.
*   **Retention**: 90 Days.

### 2. Error Tracking
*   **Server-Side**: Captured in `actions/capture-lead.ts` and logged to `system_logs` with stack trace details.
*   **Client-Side**: Global Error Boundary `app/error.tsx` catches React hydration errors.

---

## 🌍 SEO Strategy Implementations

1.  **Sitemap & Robots**: Dynamically generated at `/sitemap.xml` and `/robots.txt`.
2.  **JSON-LD Schema**:
    *   `Organization` schema on Homepage.
    *   `RealEstateListing` schema on Property pages.
3.  **Core Web Vitals**:
    *   LCP Optimized via `next/image` priority loading.
    *   CLS minimized by reserving layout space for dynamic elements.

---

*This document serves as the operational manual for the Luxury Real Estate Sales Machine.*
