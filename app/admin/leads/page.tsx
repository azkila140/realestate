'use client';

import { useState } from 'react';
import { fakeData } from '@/lib/fake-data';
import { motion } from 'framer-motion';
import { Search, Filter, Download, MoreHorizontal, Phone, Mail, MessageSquare } from 'lucide-react';

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const leads = fakeData.leads;

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Leads Pipeline</h1>
                    <p className="text-slate-400">Manage and track your high-value opportunities.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search leads by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> More Filters
                    </button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Lead Details</th>
                            <th className="px-6 py-4">Property Interest</th>
                            <th className="px-6 py-4">Budget</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Assigned Agent</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredLeads.map((lead) => (
                            <motion.tr
                                key={lead.leadId}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-slate-800/50 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{lead.name}</div>
                                            <div className="text-xs text-slate-500">{lead.email}</div>
                                            <div className="text-xs text-slate-500">{lead.phone}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-300 font-medium">{lead.propertyInterest}</div>
                                    <div className="text-xs text-slate-500">{lead.propertyType} • {lead.source}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-amber-400 font-mono font-medium">
                                        {(lead.budget / 1000000).toFixed(2)}M AED
                                    </div>
                                    <div className="text-xs text-slate-500">{lead.budgetRange}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold
                                ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            lead.status === 'Qualified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                'bg-slate-700 text-slate-300 border border-slate-600'}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                                            {lead.assignedAgent.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-slate-300 text-sm">{lead.assignedAgent}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-green-400" title="Call">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-400" title="Email">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-green-500" title="WhatsApp">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400" title="More">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {filteredLeads.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No leads found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
