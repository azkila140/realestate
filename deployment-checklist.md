# 🚀 deployment-checklist.md

Congratulations! You have built a production-ready "Sales Machine" demo.
Follow these final steps to ensure a flawless deployment.

## 1. Supabase Database Setup
Ensure you have run the following SQL scripts in your Supabase SQL Editor:

1.  **`supabase-leads-final.sql`** (Creates the base `leads` table + RLS)
2.  **`supabase-migration-add-columns.sql`** (Adds `budget`, `property_type`, `contact_preference`)
3.  **`supabase-email-subscribers.sql`** (Creates `email_subscribers` table)

## 2. Vercel Environment Variables
Go to your Vercel Project Settings > Environment Variables and ensure these are set:

*   `NEXT_PUBLIC_SUPABASE_URL`: (Your Project URL)
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Anon Key)

## 3. Verify Deployment
Once Vercel finishes building (check your dashboard), visit your live URL.

### ✅ Verification Steps:
1.  **Homepage**: Check if "Lead Flow Diagram" animation plays smoothly.
2.  **Performance Page**: Visit `/performance` and check metrics.
3.  **Admin Login**: Click "Admin" in footer -> Enter `admin123`.
4.  **Admin Dashboard**: Verify charts, recent leads, and logs appear.
5.  **API Check**: Visit `/api/health` -> Should return `{"status": "ok", ...}`.
6.  **Lead Form**: Submit a test lead -> Check if it redirects to WhatsApp correctly.

## 4. Demo Talking Points (Cheat Sheet)

*   **"I built a Sales Machine, not just a website."**
*   **"The API Layer decouples logic from UI, allowing for scale."**
*   **"Smart Routing automatically assigns high-value leads to senior agents."**
*   **"Real-time integration with WhatsApp ensures zero lead leakage."**
*   **"Admin Dashboard gives full visibility into pipeline health."**

Good luck! You're going to crush it. 💎
