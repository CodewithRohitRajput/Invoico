'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

interface FormData {
    email: string
    password: string
}

interface Errors {
    [key: string]: string
}

interface Touched {
    [key: string]: boolean
}

const Field = ({ 
    icon: Icon, 
    label, 
    field, 
    type = 'text', 
    value,
    error,
    touched,
    onChange,
    onBlur,
    loading
}: {
    icon: React.ComponentType<any>
    label: string
    field: keyof FormData
    type?: string
    value: string
    error: string
    touched: boolean
    onChange: (field: keyof FormData, value: string) => void
    onBlur: (field: keyof FormData) => void
    loading: boolean
}) => {
    const hasError = touched && error
    
    return (
        <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Icon size={18} strokeWidth={2} />
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(field, e.target.value)}
                    onBlur={() => onBlur(field)}
                    disabled={loading}
                    className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200 ${
                        hasError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                />
                {hasError && (
                    <div className="absolute right-4 top-3.5 text-red-500">
                        <AlertCircle size={18} />
                    </div>
                )}
            </div>
            {hasError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    {error}
                </p>
            )}
        </div>
    )
}

export default function Login() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<Errors>({})
    const [touched, setTouched] = useState<Touched>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    const validate = useCallback((field: keyof FormData, value: string): string => {
        switch(field) {
            case 'email':
                if (!value.trim()) return 'Email is required'
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address'
            case 'password':
                if (!value.trim()) return 'Password is required'
                return value.length >= 6 ? '' : 'Password must be at least 6 characters'
            default:
                return ''
        }
    }, [])

    const handleChange = useCallback((field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (touched[field]) {
            const error = validate(field, value)
            setErrors(prev => ({ ...prev, [field]: error }))
        }
    }, [touched, validate])

    const handleBlur = useCallback((field: keyof FormData) => {
        setTouched(prev => ({ ...prev, [field]: true }))
        const error = validate(field, formData[field])
        setErrors(prev => ({ ...prev, [field]: error }))
    }, [formData, validate])

    const handleSubmit = async () => {
        // Mark all fields as touched
        const allTouched = { email: true, password: true }
        setTouched(allTouched)

        // Validate all fields
        const newErrors: Errors = {}
        Object.keys(formData).forEach(key => {
            const error = validate(key as keyof FormData, formData[key as keyof FormData])
            if (error) newErrors[key] = error
        })

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/profile')
                }, 1500)
            } else {
                const data = await response.json()
                setErrors({ submit: data.message || 'Login failed. Please check your credentials.' })
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please check your connection.' })
        } finally {
            setLoading(false)
        }
    }

    const isValid = Object.values(formData).every(v => v.trim()) && 
                    Object.values(errors).every(e => !e)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                
                {success && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl transform scale-100 animate-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Login Successful!</h3>
                            <p className="text-slate-600">Redirecting to your profile...</p>
                        </div>
                    </div>
                )}

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <LogIn size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-8 space-y-6">
                        <Field 
                            icon={Mail} 
                            label="Email Address" 
                            field="email" 
                            type="email"
                            value={formData.email}
                            error={errors.email || ''}
                            touched={touched.email || false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            loading={loading}
                        />
                        <Field 
                            icon={Lock} 
                            label="Password" 
                            field="password" 
                            type="password"
                            value={formData.password}
                            error={errors.password || ''}
                            touched={touched.password || false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            loading={loading}
                        />

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <a 
                                href="/forgot-password" 
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                Forgot your password?
                            </a>
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-800 flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    {errors.submit}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !isValid}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-slate-200"></div>
                            <span className="px-3 text-slate-500 text-sm">or</span>
                            <div className="flex-1 border-t border-slate-200"></div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-slate-600">
                                Don't have an account?{' '}
                                <a 
                                    href="/signup" 
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                        { label: 'Secure', desc: 'Encrypted login' },
                        { label: 'Fast', desc: 'Quick access' },
                        { label: 'Reliable', desc: '99.9% uptime' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                            <div className="font-semibold text-slate-900 text-sm">{stat.label}</div>
                            <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}