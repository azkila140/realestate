'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for simulated session
        const session = localStorage.getItem('admin_session');
        if (session === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simulated secure password
            localStorage.setItem('admin_session', 'true');
            setIsAuthenticated(true);
        } else {
            setError('Invalid access key');
            setPassword('');
        }
    };

    if (loading) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                            <Lock className="w-8 h-8 text-amber-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-playfair mb-2">Restricted Access</h1>
                        <p className="text-slate-400">Enter your secure access key to view the CRM.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Access Key..."
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all text-center tracking-widest"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-500/20"
                        >
                            Authenticate
                        </button>

                        <p className="text-xs text-slate-600 text-center mt-4">
                            Hint: Use key <span className="font-mono text-amber-500">admin123</span>
                        </p>
                    </form>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}
