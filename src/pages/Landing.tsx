
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Cloud,
  ArrowRightLeft,
  Shield,
  Zap,
  Brain,
  Users,
  CheckCircle,
  Star,
  MessageCircle,
  HardDrive,
  Globe,
  CloudSnow
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: ArrowRightLeft,
      title: "Universal Connectivity",
      description: "Connect any social platform to any cloud storage service with just a few clicks."
    },
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your files for easy discovery and management."
    },
    {
      icon: Zap,
      title: "Batch Processing",
      description: "Transfer thousands of files simultaneously with our advanced batch engine."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your data remains private and secure."
    },
    {
      icon: Cloud,
      title: "No Storage Limits",
      description: "Transfer unlimited files with Pro and Business plans."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share transfers and collaborate with team members seamlessly."
    }
  ];

  const platforms = [
    { name: "Telegram", icon: MessageCircle, color: "text-blue-500" },
    { name: "Discord", icon: Users, color: "text-indigo-500" },
    { name: "WhatsApp", icon: MessageCircle, color: "text-green-500" },
    { name: "Reddit", icon: Globe, color: "text-orange-500" }
  ];

  const storageProviders = [
    { name: "Google Drive", icon: HardDrive, color: "text-blue-600" },
    { name: "Dropbox", icon: Cloud, color: "text-blue-500" },
    { name: "OneDrive", icon: CloudSnow, color: "text-blue-700" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b412?w=40&h=40&fit=crop&crop=face",
      content: "TransferHub saved me hours of manual work. I transferred 500+ files from Telegram to Google Drive in minutes!"
    },
    {
      name: "Michael Chen",
      role: "Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content: "The AI organization feature is incredible. It automatically sorted all my research materials perfectly."
    },
    {
      name: "Emma Davis",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content: "Team collaboration features made it easy to manage our company's file transfers across platforms."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 glass">
              <Star className="h-3 w-3 mr-1" />
              Join 10,000+ users who've transferred 50TB+ of data
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Transfer Files from
              <span className="block gradient-text">Anywhere to Everywhere</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Connect your favorite social platforms to any cloud storage service. 
              Transfer thousands of files with AI-powered organization in just a few clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg px-8 py-3 hover-lift" asChild>
                <Link to="/signup">Start Free Transfer</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" asChild>
                <Link to="#demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Platforms Preview */}
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-6 items-center justify-center max-w-4xl mx-auto">
              {platforms.map((platform, index) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <div className="glass rounded-2xl p-4 mb-2 hover-lift">
                    <platform.icon className={`h-8 w-8 ${platform.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{platform.name}</span>
                </div>
              ))}
              
              <div className="flex items-center justify-center">
                <ArrowRightLeft className="h-8 w-8 text-primary animate-pulse-slow" />
              </div>
              
              {storageProviders.map((provider, index) => (
                <div key={provider.name} className="flex flex-col items-center">
                  <div className="glass rounded-2xl p-4 mb-2 hover-lift">
                    <provider.icon className={`h-8 w-8 ${provider.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{provider.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to transfer files
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make file transfers seamless, secure, and intelligent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-border/50 hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Files Transferred", value: "12M+", icon: Cloud },
              { label: "Active Users", value: "10K+", icon: Users },
              { label: "Storage Providers", value: "15+", icon: HardDrive },
              { label: "Success Rate", value: "99.9%", icon: CheckCircle }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by thousands worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about TransferHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to streamline your file transfers?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already simplified their workflow with TransferHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
