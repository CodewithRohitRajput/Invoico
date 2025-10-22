'use client'

import { useEffect, useState } from "react"

export default function Profile() {
  const [name, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'pro': return 'bg-gradient-to-r from-blue-500 to-teal-400 text-white';
      case 'basic': return 'bg-gradient-to-r from-gray-600 to-gray-400 text-white';
      default: return 'bg-gradient-to-r from-green-500 to-emerald-400 text-white';
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium': return '💎';
      case 'pro': return '⭐';
      case 'basic': return '🔹';
      default: return '👤';
    }
  }

  const forgotPass = async () => {
   const response =   await fetch(`http://localhost:5000/reset/forgotPassword` , {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      credentials : 'include',
      body : JSON.stringify({email})
    })
    if(response.ok){
      window.location.href='/reset-password'
    }

  }

  


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 animate-pulse">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-white/20 rounded w-48 mx-auto"></div>
            <div className="h-4 bg-white/20 rounded w-32 mx-auto"></div>
            <div className="h-8 bg-white/20 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Profile
          </h1>
          <p className="text-purple-200 text-lg">
            Manage your account information and subscription
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 border-4 border-white/20 shadow-2xl">
                <span className="text-4xl text-white font-bold">
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              
              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
                {name || 'User Name'}
              </h2>
              
              {/* Plan Badge */}
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getPlanColor(plan)} font-semibold text-sm md:text-base shadow-lg mb-6`}>
                <span className="text-lg">{getPlanIcon(plan)}</span>
                {plan || 'Free'} Plan
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Email Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">📧</span>
                  </div>
                  <h3 className="text-white font-semibold">Email Address</h3>
                </div>
                <p className="text-gray-300 text-lg break-all">{email || 'user@example.com'}</p>
              </div>

              {/* Account Type Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">🔒</span>
                  </div>
                  <h3 className="text-white font-semibold">Account Type</h3>
                </div>
                <p className="text-gray-300 text-lg capitalize">{plan || 'Free'}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Account Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-purple-300 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">5</div>
                  <div className="text-purple-300 text-sm">Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">89%</div>
                  <div className="text-purple-300 text-sm">Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">30d</div>
                  <div className="text-purple-300 text-sm">Active</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button onClick={forgotPass} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300 font-semibold">
                Forgot Password
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg">
                Upgrade Plan
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl border border-white/20 transition-all duration-300 font-semibold">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}