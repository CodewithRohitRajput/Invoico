'use client'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`http://localhost:5000/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setEmail('')
                setPassword('')
                // Redirect to profile page after successful login
                router.push('/profile')
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed')
            }
        }
        catch (err) {
            setError("Internal server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                        <span className="text-2xl text-white">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-purple-200">Sign in to your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-purple-200 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-purple-400">📧</span>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-purple-200 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-purple-400">🔒</span>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a 
                            href="/forgot-password" 
                            className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-white/20"></div>
                    <span className="px-3 text-purple-300 text-sm">or</span>
                    <div className="flex-1 border-t border-white/20"></div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <p className="text-purple-300">
                        Don't have an account?{' '}
                        <a 
                            href="/register" 
                            className="text-white hover:text-purple-200 font-semibold transition-colors duration-300"
                        >
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-purple-400 text-xs">
                        Secure login with encrypted credentials
                    </p>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>
        </div>
    )
}