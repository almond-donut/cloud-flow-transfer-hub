
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Zap, Crown, Users } from "lucide-react";
import { subscriptionPlans } from "../data/mockData";

export default function Pricing() {
  const features = {
    free: [
      "50 files per month",
      "Up to 10MB per file",
      "2 source platforms",
      "1 cloud storage",
      "Basic organization",
      "Email support"
    ],
    pro: [
      "Unlimited files",
      "Up to 100MB per file",
      "All source platforms",
      "5 cloud storages",
      "AI-powered organization",
      "Priority support",
      "Advanced filtering",
      "Transfer scheduling"
    ],
    business: [
      "Unlimited files",
      "Up to 500MB per file",
      "All source platforms",
      "Unlimited cloud storages",
      "AI-powered organization",
      "24/7 priority support",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Advanced analytics"
    ]
  };

  const planIcons = {
    Free: Star,
    Pro: Zap,
    Business: Crown
  };

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your billing period."
    },
    {
      question: "What happens to my data if I downgrade?",
      answer: "Your data remains safe. You'll just have access to fewer features and lower limits based on your new plan."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Changes take effect immediately, and billing is prorated."
    },
    {
      question: "Is there a team discount available?",
      answer: "Yes, we offer custom pricing for teams of 10 or more users. Contact our sales team for a quote."
    },
    {
      question: "How secure is my data during transfers?",
      answer: "All transfers are encrypted end-to-end. We never store your files on our servers - they go directly from source to destination."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-1" />
            14-day free trial on all plans
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your file transfer needs. All plans include our core features with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => {
              const Icon = planIcons[plan.name];
              const isPopular = plan.name === 'Pro';
              
              return (
                <Card key={plan.id} className={`glass border-border/50 relative ${isPopular ? 'ring-2 ring-primary' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-purple-500">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {plan.name === 'Free' && 'Perfect for trying out TransferHub'}
                      {plan.name === 'Pro' && 'Ideal for individuals and small teams'}
                      {plan.name === 'Business' && 'Advanced features for growing businesses'}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                    </div>
                    {plan.price > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed annually (${Math.round(plan.price * 0.8)}/month)
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {features[plan.id as keyof typeof features].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${isPopular ? 'bg-gradient-to-r from-primary to-purple-500' : ''}`}
                      variant={isPopular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link to={plan.name === 'Free' ? '/signup' : '/signup'}>
                        {plan.name === 'Free' ? 'Get Started Free' : `Start ${plan.name} Trial`}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need something more?</h2>
            <p className="text-xl text-muted-foreground">
              Enterprise solutions with custom features and dedicated support
            </p>
          </div>
          
          <Card className="glass border-border/50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Custom solutions for large organizations with specific requirements, 
                    including on-premise deployments, custom integrations, and dedicated support.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {[
                      "Unlimited everything",
                      "Custom file size limits",
                      "On-premise deployment",
                      "Custom integrations",
                      "Dedicated account manager",
                      "SLA guarantees",
                      "Advanced security features",
                      "Training and onboarding"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">Custom</span>
                    <p className="text-muted-foreground mt-2">Pricing based on your needs</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-500">
                      Contact Sales
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      Schedule Demo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your file transfers?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
