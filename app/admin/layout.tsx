import { Inter } from 'next/font/google';
import '../globals.css';
import { Metadata } from 'next';
import { AdminGuard } from '@/components/admin/AdminGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Admin Dashboard | Dubai Prime Estates',
    description: 'CRM & Analytics Dashboard for Real Estate Professionals',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-slate-950 text-slate-100 ${inter.className}`}>
            <AdminGuard>
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar (Simple for now) */}
                    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                        <div className="p-6 border-b border-slate-800">
                            <h1 className="text-xl font-bold font-playfair text-amber-400">
                                Dubai Prime
                                <span className="block text-xs text-slate-500 font-sans">Estates CRM</span>
                            </h1>
                        </div>

                        <nav className="flex-1 p-4 space-y-2">
                            <a href="/admin" className="block px-4 py-2 rounded-lg bg-slate-800 text-white font-medium">
                                Dashboard
                            </a>
                            <a href="/admin/leads" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                Leads Pipeline
                            </a>
                            <a href="/admin/agents" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                Agents
                            </a>
                            <a href="/admin/settings" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                Settings
                            </a>
                        </nav>

                        <div className="p-4 border-t border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                                    MK
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Mohamad Kodmani</p>
                                    <p className="text-xs text-slate-500">Super Admin</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
                        {children}
                    </main>
                </div>
            </AdminGuard>
        </div>
    );
}
