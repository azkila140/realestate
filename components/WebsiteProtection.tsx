'use client';

import { useEffect } from 'react';

export function WebsiteProtection() {
    useEffect(() => {
        // 1. Prevent Right Click (Basic Content Protection)
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // 2. Domain Lock (Anti-HTTrack / Local File Execution)
        // If the site is running as "file://" or on a different domain than localhost/vercel
        // This makes downloaded HTML files useless.
        const checkDomain = () => {
            const hostname = window.location.hostname;
            const protocol = window.location.protocol;

            // Allow localhost for development
            if (hostname === 'localhost' || hostname === '127.0.0.1') return;

            // Block file protocol (Typical HTTrack result)
            if (protocol === 'file:') {
                document.body.innerHTML = `
                    <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:white;font-family:sans-serif;text-align:center;">
                        <div>
                            <h1>⚠️ Unauthorized Copy Detected</h1>
                            <p>This demo is protected and can only be viewed live.</p>
                            <a href="https://luxury-real-estate-demo.vercel.app" style="color:#fbbf24;text-decoration:none;border:1px solid #fbbf24;padding:10px 20px;border-radius:5px;display:inline-block;margin-top:20px;">
                                Visit Official Site
                            </a>
                        </div>
                    </div>
                `;
            }
        };

        // Activate protections
        document.addEventListener('contextmenu', handleContextMenu);
        checkDomain();

        // Optional: Disable typical keyboard shortcuts for inspection (F12, Ctrl+U)
        // Note: Sophisticated users can bypass this, but it stops basic extractors.
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null; // This component renders nothing invisible
}
