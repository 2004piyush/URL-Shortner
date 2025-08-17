import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRCodeGenerator from "@/components/qr-code-generator";
import AnalyticsChart from "@/components/analytics-chart";
import { 
  Plus, 
  Link2, 
  BarChart3, 
  Copy, 
  ExternalLink, 
  Trash2,
  Calendar,
  MousePointer,
  Globe,
  TrendingUp,
  Eye,
  Settings,
  Download,
  Filter,
  Search,
  Tag,
  Clock,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnalytics, setSelectedAnalytics] = useState(null);
  const [links, setLinks] = useState([
    {
      id: 1,
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "linkshort.app/abc123",
      clicks: 142,
      createdAt: "2024-01-15",
      status: "active",
      tags: ["marketing", "campaign"],
      hasPassword: false,
      expiresAt: null
    },
    {
      id: 2,
      originalUrl: "https://github.com/user/repository",
      shortUrl: "linkshort.app/gh-repo",
      clicks: 89,
      createdAt: "2024-01-14",
      status: "active",
      tags: ["development"],
      hasPassword: true,
      expiresAt: "2024-02-15"
    },
    {
      id: 3,
      originalUrl: "https://docs.example.com/documentation",
      shortUrl: "linkshort.app/docs",
      clicks: 256,
      createdAt: "2024-01-13",
      status: "active",
      tags: ["documentation", "help"],
      hasPassword: false,
      expiresAt: null
    }
  ]);

  const handleCreateLink = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    
    const newLink = {
      id: Date.now(),
      originalUrl: newUrl,
      shortUrl: `linkshort.app/${customAlias || Math.random().toString(36).substr(2, 8)}`,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active",
      tags: [],
      hasPassword: !!password,
      expiresAt: expirationDate || null
    };
    
    setLinks([newLink, ...links]);
    setNewUrl("");
    setCustomAlias("");
    setExpirationDate("");
    setPassword("");
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(`https://${url}`);
  };

  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const filteredLinks = links.filter(link =>
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="py-8">
      {/* Enhanced Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600">Manage your shortened links and track their performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Links</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Link2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{links.length}</div>
            <p className="text-xs text-blue-600 mt-1">Active shortened links</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Clicks</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <MousePointer className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">Across all links</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Avg. Clicks</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">
              {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per link</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-700">Top Performer</CardTitle>
            <div className="p-2 bg-pink-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-800">
              {Math.max(...links.map(link => link.clicks), 0)}
            </div>
            <p className="text-xs text-pink-600 mt-1">Best performing link</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Create New Link */}
      <Card className="mb-12 border-0 shadow-xl bg-gradient-to-r from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-white/20 rounded-lg">
              <Plus className="h-6 w-6" />
            </div>
            Create New Short Link
          </CardTitle>
          <CardDescription className="text-blue-100">
            Transform your long URLs into powerful, trackable short links
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleCreateLink} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Long URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Custom Alias (Optional)</label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="my-custom-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password Protection (Optional)</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Set password for link"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-green-500 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Expiration Date (Optional)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Short Link
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Enhanced Links List */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Your Links</CardTitle>
              <CardDescription className="text-gray-600">
                Manage and track your shortened links performance
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {filteredLinks.length} of {links.length} Links
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {filteredLinks.map((link, index) => (
              <div key={link.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                          {link.shortUrl}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-green-300 text-green-700 bg-green-50"
                        >
                          <MousePointer className="h-3 w-3 mr-1" />
                          {link.clicks} clicks
                        </Badge>
                        {link.hasPassword && (
                          <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700 bg-yellow-50">
                            <Shield className="h-3 w-3 mr-1" />
                            Protected
                          </Badge>
                        )}
                        {link.expiresAt && (
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 bg-orange-50">
                            <Clock className="h-3 w-3 mr-1" />
                            Expires {link.expiresAt}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {link.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 truncate mb-3 text-sm">
                      <Globe className="h-4 w-4 inline mr-2" />
                      {link.originalUrl}
                    </p>
                    
                    {link.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="h-3 w-3 text-gray-400" />
                        <div className="flex gap-1">
                          {link.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created {link.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Last clicked today
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <QRCodeGenerator 
                      url={`https://${link.shortUrl}`} 
                      title={`QR Code for ${link.shortUrl}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(link.shortUrl)}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://${link.shortUrl}`, '_blank')}
                      className="hover:bg-green-50 hover:border-green-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                            Analytics for {link.shortUrl}
                          </DialogTitle>
                        </DialogHeader>
                        <AnalyticsChart linkId={link.id} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteLink(link.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLinks.length === 0 && searchTerm && (
              <div className="text-center py-16 text-gray-500">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">No links found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search terms</p>
                <Button 
                  onClick={() => setSearchTerm("")}
                  variant="outline"
                >
                  Clear Search
                </Button>
              </div>
            )}
            
            {links.length === 0 && !searchTerm && (
              <div className="text-center py-16 text-gray-500">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Link2 className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">No links created yet</h3>
                <p className="text-gray-500 mb-6">Create your first shortened link to get started</p>
                <Button 
                  onClick={() => document.querySelector('input[type="url"]').focus()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Link
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;