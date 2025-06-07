
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Cloud, ArrowRightLeft } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Cloud className="h-8 w-8 text-primary" />
                <ArrowRightLeft className="h-4 w-4 text-purple-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-bold gradient-text">TransferHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isHomePage ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="h-9 w-9 rounded-full"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass border-t border-border/40">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isHomePage ? (
                <>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-500" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </>
              ) : (
                <Button className="w-full" asChild>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
