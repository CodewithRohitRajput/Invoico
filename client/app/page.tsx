export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🚀 Trusted by 10,000+ businesses
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 max-w-4xl leading-tight">
              Smart Invoicing Made{' '}
              <span className="text-blue-600">Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Create, send, and track professional invoices in minutes. 
              Get paid faster with Invoico's intuitive invoicing platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                Start Free Trial 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Powerful features to streamline your invoicing process
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold">{feature.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Choose the plan that works best for your business
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-4xl">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`bg-white p-8 rounded-2xl border-2 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 shadow-sm'
                } hover:shadow-xl transition-all duration-300`}>
                  <div className="flex flex-col gap-6">
                    {plan.popular && (
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium w-fit">
                        Most Popular
                      </div>
                    )}
                    
                    <h3 className="text-3xl font-bold text-gray-900">{plan.name}</h3>
                    
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-xl text-gray-600 mb-1">/month</span>
                    </div>

                    <p className="text-gray-600 text-lg">
                      {plan.description}
                    </p>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="flex flex-col gap-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                        : 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                    }`}>
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Loved by Businesses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-900">
                        {testimonial.name}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Invoicing?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl">
                Join thousands of businesses using Invoico today
              </p>
              <button className="bg-white text-blue-600 hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mt-6">
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "⚡",
    title: "Instant Invoicing",
    description: "Create professional invoices in seconds with our easy-to-use templates."
  },
  {
    icon: "💰",
    title: "Fast Payments",
    description: "Get paid faster with integrated payment processing and automated reminders."
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    description: "Track your revenue, monitor overdue payments, and gain business insights."
  },
  {
    icon: "🔒",
    title: "Secure & Compliant",
    description: "Bank-level security and tax compliance built into every invoice."
  },
  {
    icon: "🌍",
    title: "Global Support",
    description: "Multi-currency support and international payment methods included."
  },
  {
    icon: "🔄",
    title: "Automated Workflows",
    description: "Set up recurring invoices and automate your billing cycle completely."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for freelancers and small businesses",
    features: [
      "Up to 50 invoices/month",
      "Basic templates",
      "Payment tracking",
      "Email support",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "59",
    description: "Ideal for growing businesses and teams",
    features: [
      "Unlimited invoices",
      "Advanced templates",
      "Recurring invoices",
      "Priority support",
      "Team collaboration",
      "Custom branding",
      "Analytics dashboard"
    ],
    popular: true
  }
];

const testimonials = [
  {
    quote: "Invoico cut our invoice processing time by 80%. Our clients love the professional look!",
    name: "Sarah Chen",
    company: "Creative Studio"
  },
  {
    quote: "The automated reminders have significantly reduced our overdue payments. Game changer!",
    name: "Mike Rodriguez",
    company: "Consulting Firm"
  },
  {
    quote: "Switching to Invoico was the best business decision we made this year. So intuitive!",
    name: "Emily Watson",
    company: "Digital Agency"
  }
];