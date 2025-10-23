'use client'
import { useEffect, useState } from "react";
import { Users, Mail, Phone, MapPin, Search, Plus, Edit, Trash2, User } from 'lucide-react';

type Client = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    address: string
}

export default function AllClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getClients = async () => {
            try {
                const res = await fetch(`http://localhost:5000/client/get`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                setClients(Array.isArray(data.clients) ? data.clients : []);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        }
        getClients();
    }, []);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 animate-pulse">
                        <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4"></div>
                        <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-slate-200 rounded"></div>
                                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <Users size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        All Clients
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Manage your client relationships in one place
                    </p>
                </div>

                {/* Stats and Actions */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-900">{clients.length}</div>
                                <div className="text-sm text-slate-600">Total Clients</div>
                            </div>
                            <div className="h-12 w-px bg-slate-200"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">
                                    {clients.filter(c => c.email).length}
                                </div>
                                <div className="text-sm text-slate-600">With Email</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                />
                            </div>

                            {/* Add Client Button */}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-600/30">
                                <Plus size={20} />
                                Add Client
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clients Grid */}
                {filteredClients.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                        <Users size={64} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {searchTerm ? 'No clients found' : 'No clients yet'}
                        </h3>
                        <p className="text-slate-600 mb-6">
                            {searchTerm 
                                ? 'Try adjusting your search terms' 
                                : 'Get started by adding your first client'
                            }
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 mx-auto">
                            <Plus size={20} />
                            Add First Client
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map((client) => (
                            <div key={client._id} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300">
                                {/* Client Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                                            {client.name}
                                        </h3>
                                        <p className="text-slate-600 text-sm truncate">
                                            {client.email || 'No email provided'}
                                        </p>
                                    </div>
                                </div>

                                {/* Client Details */}
                                <div className="space-y-3 mb-6">
                                    {client.phone && (
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Phone size={16} className="text-slate-400 flex-shrink-0" />
                                            <span className="text-sm truncate">{client.phone}</span>
                                        </div>
                                    )}
                                    {client.address && (
                                        <div className="flex items-start gap-3 text-slate-700">
                                            <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm line-clamp-2">{client.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4 border-t border-slate-200">
                                    <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Stats */}
                {filteredClients.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-slate-600 text-sm">
                            Showing {filteredClients.length} of {clients.length} clients
                            {searchTerm && ` for "${searchTerm}"`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}