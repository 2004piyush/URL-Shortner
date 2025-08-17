import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import QRCodeGenerator from "@/components/qr-code-generator";
import AnalyticsChart from "@/components/analytics-chart";
import { 
  ArrowLeft, 
  Copy, 
  ExternalLink, 
  Edit3, 
  Save, 
  X,
  Globe,
  MousePointer,
  Calendar,
  Shield,
  Clock,
  Tag,
  Trash2
} from "lucide-react";

const LinkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Mock data - in real app, fetch based on ID
  const [linkData, setLinkData] = useState({
    id: 1,
    originalUrl: "https://example.com/very-long-url-that-needs-shortening",
    shortUrl: "linkshort.app/abc123",
    clicks: 142,
    createdAt: "2024-01-15",
    status: "active",
    tags: ["marketing", "campaign"],
    hasPassword: false,
    expiresAt: null,
    description: "Marketing campaign landing page for Q1 2024"
  });

  const [editForm, setEditForm] = useState({
    originalUrl: linkData.originalUrl,
    description: linkData.description,
    tags: linkData.tags.join(", ")
  });

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setLinkData({
      ...linkData,
      originalUrl: editForm.originalUrl,
      description: editForm.description,
      tags: editForm.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      originalUrl: linkData.originalUrl,
      description: linkData.description,
      tags: linkData.tags.join(", ")
    });
    setIsEditing(false);
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Link Details
          </h1>
          <p className="text-gray-600">Manage and analyze your shortened link</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Link Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Link Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Short URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Short URL</label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-sm px-3 py-2 flex-1">
                    {linkData.shortUrl}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`https://${linkData.shortUrl}`)}
                  >
                    {copied ? <span className="text-green-600">Copied!</span> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Original URL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Original URL</label>
                {isEditing ? (
                  <Input
                    value={editForm.originalUrl}
                    onChange={(e) => setEditForm({...editForm, originalUrl: e.target.value})}
                    className="w-full"
                  />
                ) : (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg break-all">
                    {linkData.originalUrl}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                {isEditing ? (
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Add a description..."
                    className="w-full"
                  />
                ) : (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {linkData.description || "No description"}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
                {isEditing ? (
                  <Input
                    value={editForm.tags}
                    onChange={(e) => setEditForm({...editForm, tags: e.target.value})}
                    placeholder="marketing, campaign, social"
                    className="w-full"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {linkData.tags.length > 0 ? (
                      linkData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No tags</p>
                    )}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-green-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Clicks</span>
                <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                  {linkData.clicks.toLocaleString()}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="text-sm font-medium">{linkData.createdAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                  {linkData.status}
                </Badge>
              </div>

              {linkData.hasPassword && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Protection</span>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-50">
                    <Shield className="h-3 w-3 mr-1" />
                    Password Protected
                  </Badge>
                </div>
              )}

              {linkData.expiresAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Expires</span>
                  <Badge variant="outline" className="text-orange-700 border-orange-300 bg-orange-50">
                    <Clock className="h-3 w-3 mr-1" />
                    {linkData.expiresAt}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`https://${linkData.shortUrl}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Link
              </Button>
              
              <div className="w-full">
                <QRCodeGenerator 
                  url={`https://${linkData.shortUrl}`} 
                  title={`QR Code for ${linkData.shortUrl}`}
                />
              </div>
              
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Link
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-purple-600" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart linkId={linkData.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;