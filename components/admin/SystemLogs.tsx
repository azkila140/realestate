'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2, Activity, Server, MessageCircle, AlertCircle, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Initialize Supabase Client (Client-Side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface SystemLog {
    id: string;
    created_at: string;
    event_type: string;
    status: 'SUCCESS' | 'FAILED' | 'QUEUED' | 'PENDING';
    details: any;
}

export function SystemLogs() {
    const [logs, setLogs] = useState<SystemLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const { data, error } = await supabase
                .from('system_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            if (data) setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        // Poll every 5 seconds for "Real-Time" feel without websockets complexity
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (type: string) => {
        if (type.includes('WHATSAPP')) return <MessageCircle className="w-4 h-4 text-green-400" />;
        if (type.includes('CRM')) return <Database className="w-4 h-4 text-blue-400" />;
        if (type.includes('ERROR')) return <AlertCircle className="w-4 h-4 text-red-400" />;
        return <Activity className="w-4 h-4 text-slate-400" />;
    };

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white">Live System Activity</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 font-mono">ONLINE</span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center flex-1">
                    <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                </div>
            ) : (
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[400px]">
                    <AnimatePresence initial={false}>
                        {logs.length === 0 ? (
                            <div className="text-center text-slate-500 py-8 text-sm">
                                No activity recorded yet.<br />
                                <span className="text-xs">Submit a lead to see logs here.</span>
                            </div>
                        ) : (
                            logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 flex items-start gap-3 hover:border-amber-500/20 transition-colors"
                                >
                                    <div className="mt-0.5">{getIcon(log.event_type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-slate-300 font-mono">
                                                {log.event_type}
                                            </span>
                                            <span className="text-[10px] text-slate-600 font-mono">
                                                {formatTime(log.created_at)}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 truncate">
                                            {JSON.stringify(log.details)}
                                        </div>
                                    </div>
                                    <div className={`text-[10px] px-1.5 py-0.5 rounded font-bold
                                        ${log.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' :
                                            log.status === 'FAILED' ? 'bg-red-500/10 text-red-500' :
                                                'bg-blue-500/10 text-blue-500'}`}>
                                        {log.status}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
