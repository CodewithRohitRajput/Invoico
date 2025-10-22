import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Section,
  Separator,
  Badge,
  Link,
} from '@radix-ui/themes';
import { ArrowRightIcon, CheckIcon, StarIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <Box>
      {/* Navigation */}
      <Section size="1">
        <Container size="3">
          <Flex justify="between" align="center" py="4">
            <Flex align="center" gap="3">
              <Box
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--accent-9)',
                  borderRadius: 'var(--radius-2)',
                }}
              />
              <Heading size="5" weight="bold">
                Invoico
              </Heading>
            </Flex>
            
            <Flex gap="5" align="center">
              <Link href="#features" size="3" weight="medium">Features</Link>
              <Link href="#pricing" size="3" weight="medium">Pricing</Link>
              <Link href="#testimonials" size="3" weight="medium">Testimonials</Link>
            </Flex>
            
            <Flex gap="3">
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section size="3">
        <Container size="3">
          <Flex direction="column" align="center" gap="6" py="9">
            <Badge variant="soft" size="2">
              🚀 Trusted by 10,000+ businesses
            </Badge>
            
            <Heading 
              size="9" 
              align="center" 
              style={{ maxWidth: 800, lineHeight: 1.2 }}
            >
              Smart Invoicing Made{' '}
              <Text color="blue" style={{ display: 'inline' }}>
                Simple
              </Text>
            </Heading>
            
            <Text 
              size="5" 
              align="center" 
              color="gray" 
              style={{ maxWidth: 600, lineHeight: 1.6 }}
            >
              Create, send, and track professional invoices in minutes. 
              Get paid faster with Invoico's intuitive invoicing platform.
            </Text>
            
            <Flex gap="4" mt="4">
              <Button size="4">
                Start Free Trial <ArrowRightIcon />
              </Button>
              <Button variant="outline" size="4">
                View Demo
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {/* Features Section */}
      <Section id="features" size="3" style={{ background: 'var(--gray-1)' }}>
        <Container size="3">
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="8" align="center">
              Everything You Need
            </Heading>
            <Text size="5" align="center" color="gray" style={{ maxWidth: 600 }}>
              Powerful features to streamline your invoicing process
            </Text>

            <Grid columns="3" gap="5" width="auto" mt="6">
              {features.map((feature, index) => (
                <Card key={index} size="3">
                  <Flex direction="column" gap="3">
                    <Box
                      style={{
                        width: 48,
                        height: 48,
                        background: 'var(--blue-3)',
                        borderRadius: 'var(--radius-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text size="5" weight="bold" color="blue">
                        {feature.icon}
                      </Text>
                    </Box>
                    <Heading size="5">{feature.title}</Heading>
                    <Text size="3" color="gray">
                      {feature.description}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" size="3">
        <Container size="3">
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="8" align="center">
              Simple, Transparent Pricing
            </Heading>
            <Text size="5" align="center" color="gray" style={{ maxWidth: 600 }}>
              Choose the plan that works best for your business
            </Text>

            <Grid columns="2" gap="6" width="auto" mt="6" style={{ maxWidth: 800 }}>
              {pricingPlans.map((plan, index) => (
                <Card key={index} size="3" variant={plan.popular ? "surface" : "ghost"}>
                  <Flex direction="column" gap="4">
                    {plan.popular && (
                      <Badge color="blue" variant="solid" style={{ width: 'fit-content' }}>
                        Most Popular
                      </Badge>
                    )}
                    
                    <Heading size="6">{plan.name}</Heading>
                    
                    <Flex align="end" gap="2">
                      <Heading size="8">${plan.price}</Heading>
                      <Text size="4" color="gray">
                        /month
                      </Text>
                    </Flex>

                    <Text size="3" color="gray">
                      {plan.description}
                    </Text>

                    <Separator size="4" />

                    <Flex direction="column" gap="3">
                      {plan.features.map((feature, featureIndex) => (
                        <Flex key={featureIndex} gap="2" align="center">
                          <CheckIcon color="var(--grass-9)" />
                          <Text size="3">{feature}</Text>
                        </Flex>
                      ))}
                    </Flex>

                    <Button size="3" variant={plan.popular ? "solid" : "outline"} mt="4">
                      Get Started
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" size="3" style={{ background: 'var(--gray-1)' }}>
        <Container size="3">
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="8" align="center">
              Loved by Businesses
            </Heading>

            <Grid columns="3" gap="5" width="auto" mt="6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} size="2">
                  <Flex direction="column" gap="3">
                    <Flex gap="1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} color="var(--amber-9)" fill="var(--amber-9)" />
                      ))}
                    </Flex>
                    <Text size="3" style={{ lineHeight: 1.6 }}>
                      "{testimonial.quote}"
                    </Text>
                    <Flex direction="column" gap="1">
                      <Text size="3" weight="bold">
                        {testimonial.name}
                      </Text>
                      <Text size="2" color="gray">
                        {testimonial.company}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section size="3">
        <Container size="2">
          <Card size="4" style={{ background: 'var(--blue-9)' }}>
            <Flex direction="column" align="center" gap="4" py="6">
              <Heading size="7" align="center" style={{ color: 'white' }}>
                Ready to Transform Your Invoicing?
              </Heading>
              <Text size="4" align="center" style={{ color: 'var(--blue-3)' }}>
                Join thousands of businesses using Invoico today
              </Text>
              <Button size="4" variant="solid" style={{ background: 'white', color: 'var(--blue-9)' }} mt="4">
                Start Free Trial <ArrowRightIcon />
              </Button>
            </Flex>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <Section size="2" style={{ background: 'var(--gray-2)' }}>
        <Container size="3">
          <Flex justify="between" align="center" py="4">
            <Flex align="center" gap="3">
              <Box
                style={{
                  width: 24,
                  height: 24,
                  background: 'var(--accent-9)',
                  borderRadius: 'var(--radius-2)',
                }}
              />
              <Text size="3" weight="medium">
                Invoico
              </Text>
            </Flex>
            <Text size="2" color="gray">
              © 2024 Invoico. All rights reserved.
            </Text>
          </Flex>
        </Container>
      </Section>
    </Box>
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