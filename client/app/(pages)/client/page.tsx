'use client'
import { useState, useCallback } from 'react'
import { CheckCircle2, User, Mail, Phone, MapPin, AlertCircle } from 'lucide-react'

interface FormData {
    name: string
    email: string
    phone: string
    address: string
}

interface Errors {
    [key: string]: string
}

interface Touched {
    [key: string]: boolean
}

// Move Field component outside to prevent re-renders
const Field = ({ 
    icon: Icon, 
    label, 
    field, 
    type = 'text', 
    rows, 
    value,
    error,
    touched,
    onChange,
    onBlur 
}: {
    icon: React.ComponentType<any>
    label: string
    field: keyof FormData
    type?: string
    rows?: number
    value: string
    error: string
    touched: boolean
    onChange: (field: keyof FormData, value: string) => void
    onBlur: (field: keyof FormData) => void
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
                {rows ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(field, e.target.value)}
                        onBlur={() => onBlur(field)}
                        rows={rows}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200 resize-none ${
                            hasError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
                        }`}
                        placeholder={`Enter ${label.toLowerCase()}`}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(field, e.target.value)}
                        onBlur={() => onBlur(field)}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200 ${
                            hasError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
                        }`}
                        placeholder={`Enter ${label.toLowerCase()}`}
                    />
                )}
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

export default function Client() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const [errors, setErrors] = useState<Errors>({})
    const [touched, setTouched] = useState<Touched>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const validate = useCallback((field: keyof FormData, value: string): string => {
        switch(field) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address'
            case 'phone':
                return /^[\d\s\-\+\(\)]{10,}$/.test(value) ? '' : 'Invalid phone number'
            case 'name':
                return value.trim().length > 0 ? '' : 'Name is required'
            case 'address':
                return value.trim().length > 0 ? '' : 'Address is required'
            default:
                return ''
        }
    }, [])

    const handleChange = useCallback((field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Only validate if the field has been touched
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
        const allTouched = {
            name: true,
            email: true,
            phone: true,
            address: true
        }
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
            const res = await fetch('http://localhost:5000/client/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            
            if (res.ok) {
                setSuccess(true)
                setTimeout(() => {
                    setFormData({ name: '', email: '', phone: '', address: '' })
                    setTouched({})
                    setErrors({})
                    setSuccess(false)
                }, 2000)
            } else {
                setErrors({ submit: 'Failed to save client. Please try again.' })
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
            <div className="max-w-2xl mx-auto">
                
                {success && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl transform scale-100 animate-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Client Added!</h3>
                            <p className="text-slate-600">Successfully saved to database</p>
                        </div>
                    </div>
                )}

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <User size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Add New Client
                    </h1>
                    <p className="text-slate-600">
                        Fill in the details below to create a new client profile
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
                        />
                        <Field 
                            icon={Phone} 
                            label="Phone Number" 
                            field="phone" 
                            type="tel" 
                            value={formData.phone}
                            error={errors.phone || ''}
                            touched={touched.phone || false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Field 
                            icon={MapPin} 
                            label="Address" 
                            field="address" 
                            rows={3} 
                            value={formData.address}
                            error={errors.address || ''}
                            touched={touched.address || false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.submit && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-800 flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    {errors.submit}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => {
                                    setFormData({ name: '', email: '', phone: '', address: '' })
                                    setTouched({})
                                    setErrors({})
                                }}
                                className="px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all duration-200"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !isValid}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Save Client
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                        { label: 'Instant Save', desc: 'Real-time validation' },
                        { label: 'Secure', desc: 'Encrypted data' },
                        { label: 'Smart Form', desc: 'Auto-complete ready' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
                            <div className="font-semibold text-slate-900 text-sm">{stat.label}</div>
                            <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}