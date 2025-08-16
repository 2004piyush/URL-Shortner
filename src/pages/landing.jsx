import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, Zap, Shield, BarChart3, Copy, Check, Globe, Users, TrendingUp, Star } from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShortUrl(`https://linkshort.app/${Math.random().toString(36).substr(2, 8)}`);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      {/* Hero Section with Enhanced Design */}
      <div className="text-center mb-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-60 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
            <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <LinkIcon className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Transform Your Links
        </h1>
        <p className="text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
          Create powerful, trackable short links that drive engagement
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Join over 50,000+ users who trust our platform for their link management needs
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2M+</div>
            <div className="text-sm text-gray-500">Links Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">50K+</div>
            <div className="text-sm text-gray-500">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">99.9%</div>
            <div className="text-sm text-gray-500">Uptime</div>
          </div>
        </div>
      </div>

      {/* Enhanced URL Shortener Form */}
      <Card className="max-w-4xl mx-auto mb-20 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shorten Your URL
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Paste your long URL and get a beautiful short link instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleShorten} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="url"
                placeholder="https://example.com/your-very-long-url-here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating your link...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Shorten URL
                </div>
              )}
            </Button>
            
            {shortUrl && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <p className="font-semibold text-green-700">Your shortened URL is ready!</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    value={shortUrl} 
                    readOnly 
                    className="flex-1 bg-white border-green-300 text-lg font-mono" 
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={copyToClipboard}
                    className="border-green-300 hover:bg-green-50"
                  >
                    {copied ? (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Copied!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Copy className="h-4 w-4" />
                        Copy
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Enhanced Features Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Why Choose LinkShort?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you manage and track your links effectively
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-800">Lightning Fast</CardTitle>
              <CardDescription className="text-blue-600">
                Generate short links in milliseconds with our optimized infrastructure
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-green-800">Secure & Reliable</CardTitle>
              <CardDescription className="text-green-600">
                Enterprise-grade security with 99.9% uptime guarantee
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-purple-800">Advanced Analytics</CardTitle>
              <CardDescription className="text-purple-600">
                Comprehensive insights with real-time click tracking and geo-analytics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-pink-800">Team Collaboration</CardTitle>
              <CardDescription className="text-pink-600">
                Share and manage links with your team members seamlessly
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">See what our users are saying about LinkShort</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "LinkShort has revolutionized how we manage our marketing campaigns. The analytics are incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Marketing Director</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The best URL shortener I've used. Clean interface, powerful features, and excellent support."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-sm text-gray-500">Product Manager</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "LinkShort's analytics helped us increase our click-through rates by 40%. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div>
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-sm text-gray-500">Growth Hacker</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <CardContent className="text-center py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Links?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of marketers, businesses, and creators who use LinkShort to power their digital presence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/auth")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Start Free Today
                </div>
              </Button>
              <p className="text-blue-100 text-sm">No credit card required • Free forever plan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;