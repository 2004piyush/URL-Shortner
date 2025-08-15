import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, Zap, Shield, BarChart3, Copy, Check } from "lucide-react";

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
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <LinkIcon className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shorten Your Links
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform long, complex URLs into short, shareable links. Track clicks, analyze performance, and manage all your links in one place.
        </p>
      </div>

      {/* URL Shortener Form */}
      <Card className="max-w-2xl mx-auto mb-16 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Create Short Link</CardTitle>
          <CardDescription className="text-center">
            Paste your long URL below to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/very-long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isLoading} className="px-8">
                {isLoading ? "Shortening..." : "Shorten"}
              </Button>
            </div>
            
            {shortUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600 mb-2">Your shortened URL:</p>
                <div className="flex items-center gap-2">
                  <Input value={shortUrl} readOnly className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Lightning Fast</CardTitle>
            <CardDescription>
              Generate short links instantly with our optimized infrastructure
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Secure & Reliable</CardTitle>
            <CardDescription>
              Your links are protected with enterprise-grade security measures
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle>Detailed Analytics</CardTitle>
            <CardDescription>
              Track clicks, locations, and performance with comprehensive analytics
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Join thousands of users who trust LinkShort for their URL shortening needs
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Sign Up Free
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;