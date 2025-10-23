'use client'

import { useEffect, useState } from "react"
import { User, Mail, Crown, Shield, Calendar, Database, Users, Activity, LogOut, Settings, Key } from 'lucide-react'

export default function Profile() {
  const [name, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [resetLoading, setResetLoading] = useState<boolean>(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/auth/profile`, { credentials: 'include' })
        const data = await res.json();
        setUsername(data.name)
        setEmail(data.email)
        setPlan(data.plan)
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    getInfo();
  }, [])

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium': return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      case 'pro': return 'bg-gradient-to-r from-blue-600 to-teal-500 text-white';
      case 'basic': return 'bg-gradient-to-r from-slate-600 to-slate-400 text-white';
      default: return 'bg-gradient-to-r from-green-600 to-emerald-500 text-white';
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium': return <Crown size={16} />;
      case 'pro': return <Shield size={16} />;
      case 'basic': return <User size={16} />;
      default: return <User size={16} />;
    }
  }

  const forgotPass = async () => {
    setResetLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/reset/forgotPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      })
      if (response.ok) {
        window.location.href = '/reset-password'
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
    } finally {
      setResetLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-pulse">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-32 mx-auto"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <User size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Your Profile
          </h1>
          <p className="text-slate-600">
            Manage your account information and subscription
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-6">
          <div className="p-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                <span className="text-2xl text-white font-bold">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {name || 'User Name'}
              </h2>
              
              {/* Plan Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getPlanColor(plan)} font-semibold text-sm shadow-lg`}>
                {getPlanIcon(plan)}
                {plan || 'Free'} Plan
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Email Card */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-slate-900 font-semibold">Email Address</h3>
                </div>
                <p className="text-slate-600 text-lg break-all">{email || 'user@example.com'}</p>
              </div>

              {/* Account Type Card */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-slate-900 font-semibold">Account Type</h3>
                </div>
                <p className="text-slate-600 text-lg capitalize">{plan || 'Free'}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-slate-900 font-semibold text-lg mb-4 flex items-center gap-2">
                <Activity size={20} />
                Account Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900 mb-1">12</div>
                  <div className="text-slate-500 text-sm flex items-center justify-center gap-1">
                    <Database size={14} />
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900 mb-1">5</div>
                  <div className="text-slate-500 text-sm flex items-center justify-center gap-1">
                    <Users size={14} />
                    Teams
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900 mb-1">89%</div>
                  <div className="text-slate-500 text-sm flex items-center justify-center gap-1">
                    <Database size={14} />
                    Storage
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900 mb-1">30d</div>
                  <div className="text-slate-500 text-sm flex items-center justify-center gap-1">
                    <Calendar size={14} />
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button 
                onClick={forgotPass}
                disabled={resetLoading}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                <Key size={18} />
                {resetLoading ? 'Processing...' : 'Reset Password'}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-blue-600/30">
                <Crown size={18} />
                Upgrade Plan
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl border border-slate-200 transition-all duration-300 font-semibold">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Settings size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Account Settings</h3>
            <p className="text-slate-600 text-sm">Manage your preferences and privacy settings</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Security</h3>
            <p className="text-slate-600 text-sm">Two-factor authentication and security logs</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-100 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Activity</h3>
            <p className="text-slate-600 text-sm">View your recent activity and sessions</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Calendar size={14} />
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}