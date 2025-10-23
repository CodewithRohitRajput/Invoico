'use client'
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, Shield } from 'lucide-react';

interface FormData {
    name: string
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

export default function Signup() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
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
            case 'name':
                if (!value.trim()) return 'Full name is required'
                return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters'
            case 'email':
                if (!value.trim()) return 'Email is required'
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address'
            case 'password':
                if (!value.trim()) return 'Password is required'
                if (value.length < 6) return 'Password must be at least 6 characters'
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return 'Must include uppercase, lowercase, and numbers'
                }
                return ''
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
        const allTouched = { name: true, email: true, password: true }
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
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            } else {
                const data = await response.json()
                setErrors({ submit: data.message || 'Registration failed. Please try again.' })
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please check your connection.' })
        } finally {
            setLoading(false)
        }
    }

    const isValid = Object.values(formData).every(v => v.trim()) && 
                    Object.values(errors).every(e => !e)

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
                        <p className="text-slate-600 mb-6">Your account has been created successfully.</p>
                        <button 
                            onClick={() => router.push('/login')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ArrowRight size={20} />
                            Continue to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <User size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Join Invoico
                    </h1>
                    <p className="text-slate-600">
                        Create your account and start invoicing
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-8 space-y-6">
                        <Field 
                            icon={User} 
                            label="Full Name" 
                            field="name" 
                            value={formData.name}
                            error={errors.name || ''}
                            touched={touched.name || false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            loading={loading}
                        />
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

                        {/* Password Requirements */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="text-sm font-semibold text-blue-900 mb-2">
                                Password Requirements:
                            </h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        formData.password.length >= 6 ? 'bg-green-500' : 'bg-blue-500'
                                    }`}></div>
                                    At least 6 characters
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        /[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-blue-500'
                                    }`}></div>
                                    One lowercase letter
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-blue-500'
                                    }`}></div>
                                    One uppercase letter
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        /\d/.test(formData.password) ? 'bg-green-500' : 'bg-blue-500'
                                    }`}></div>
                                    One number
                                </li>
                            </ul>
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
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={20} />
                                    Create Account
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-slate-200"></div>
                            <span className="px-3 text-slate-500 text-sm">or</span>
                            <div className="flex-1 border-t border-slate-200"></div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-slate-600">
                                Already have an account?{' '}
                                <a 
                                    href="/login" 
                                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Features */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Shield size={16} className="text-blue-600" />
                        </div>
                        <div className="font-semibold text-slate-900 text-sm">Secure</div>
                        <div className="text-xs text-slate-500 mt-1">Encrypted data</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div className="font-semibold text-slate-900 text-sm">Instant</div>
                        <div className="text-xs text-slate-500 mt-1">Quick setup</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-100 text-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <User size={16} className="text-purple-600" />
                        </div>
                        <div className="font-semibold text-slate-900 text-sm">Free</div>
                        <div className="text-xs text-slate-500 mt-1">No credit card</div>
                    </div>
                </div>

                {/* Privacy Note */}
                <div className="mt-6 bg-white rounded-xl p-4 border border-slate-100">
                    <div className="text-center">
                        <p className="text-slate-600 text-sm">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}