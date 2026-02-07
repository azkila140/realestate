'use client';

import { fakeData } from '@/lib/fake-data';
import { motion } from 'framer-motion';
import {
    Users,
    DollarSign,
    TrendingUp,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { SystemLogs } from '@/components/admin/SystemLogs';

export default function AdminDashboardPage() {
    const { leads, performanceMetrics } = fakeData;

    // Calculate some quick stats from fake data
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const potentialValue = leads.reduce((acc, curr) => acc + curr.budget, 0);

    const stats = [
        {
            title: 'Active Leads',
            value: totalLeads.toString(),
            change: '+12% vs last week',
            icon: Users,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10'
        },
        {
            title: 'Pipeline Value',
            value: `${(potentialValue / 1000000).toFixed(1)}M AED`,
            change: '+2.5M vs last month',
            icon: DollarSign,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10'
        },
        {
            title: 'Conversion Rate',
            value: '24%',
            change: '+4% this month',
            icon: TrendingUp,
            color: 'text-green-400',
            bg: 'bg-green-400/10'
        },
        {
            title: 'Avg Response Time',
            value: '< 5 min',
            change: 'Top 1% in market',
            icon: Clock,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
                    <p className="text-slate-400">Welcome back, Mohamad. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors text-sm">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors text-sm">
                        + New Lead
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-400">{stat.title}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads Table */}
                <div className="lg:col-span-2 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="font-bold text-lg text-white">Recent Leads</h2>
                        <a href="/admin/leads" className="text-sm text-amber-400 hover:text-amber-300">View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-950/50 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Property Interest</th>
                                    <th className="px-6 py-4">Budget</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {leads.slice(0, 5).map((lead, i) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">
                                            <div>{lead.name}</div>
                                            <div className="text-xs text-slate-500">{lead.source}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {lead.propertyType === 'Villa' ? '🏡' : lead.propertyType === 'Penthouse' ? '🏢' : '🏠'}
                                                {lead.propertyType}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-amber-400">
                                            {(lead.budget / 1000000).toFixed(1)}M AED
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${lead.status === 'New' ? 'bg-blue-400/10 text-blue-400' :
                                                    lead.status === 'Qualified' ? 'bg-green-400/10 text-green-400' :
                                                        'bg-slate-700 text-slate-300'}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                                                    {lead.assignedAgent.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                {lead.assignedAgent}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Health / Logs */}
                <div className="h-full">
                    <SystemLogs />
                </div>
            </div>
        </div>
    );
}
