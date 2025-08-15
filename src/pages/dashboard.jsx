import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Link2, 
  BarChart3, 
  Copy, 
  ExternalLink, 
  Trash2,
  Calendar,
  MousePointer
} from "lucide-react";

const Dashboard = () => {
  const [newUrl, setNewUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [links, setLinks] = useState([
    {
      id: 1,
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortUrl: "linkshort.app/abc123",
      clicks: 142,
      createdAt: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      originalUrl: "https://github.com/user/repository",
      shortUrl: "linkshort.app/gh-repo",
      clicks: 89,
      createdAt: "2024-01-14",
      status: "active"
    },
    {
      id: 3,
      originalUrl: "https://docs.example.com/documentation",
      shortUrl: "linkshort.app/docs",
      clicks: 256,
      createdAt: "2024-01-13",
      status: "active"
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
      status: "active"
    };
    
    setLinks([newLink, ...links]);
    setNewUrl("");
    setCustomAlias("");
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(`https://${url}`);
  };

  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your shortened links and track their performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{links.length}</div>
            <p className="text-xs text-muted-foreground">Active shortened links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">Across all links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground">Per link</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Link */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Short Link
          </CardTitle>
          <CardDescription>
            Enter a long URL to create a new shortened link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="url"
                  placeholder="https://example.com/long-url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Custom alias (optional)"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Create Short Link
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>
            Manage and track your shortened links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {link.shortUrl}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {link.clicks} clicks
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {link.originalUrl}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {link.createdAt}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(link.shortUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://${link.shortUrl}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteLink(link.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {links.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No links created yet</p>
                <p className="text-sm">Create your first shortened link above</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;