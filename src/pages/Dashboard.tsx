
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Cloud,
  ArrowRightLeft,
  TrendingUp,
  Users,
  HardDrive,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Globe,
  CloudSnow,
  Plus,
  Activity
} from "lucide-react";
import { mockUser, mockPlatforms, mockStorageProviders, mockTransfers, mockStats } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const [activeTransfers] = useState(mockTransfers.filter(t => t.status === 'processing'));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'discord':
        return <Users className="h-5 w-5 text-indigo-500" />;
      case 'whatsapp':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'reddit':
        return <Globe className="h-5 w-5 text-orange-500" />;
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStorageIcon = (provider: string) => {
    switch (provider) {
      case 'gdrive':
        return <HardDrive className="h-5 w-5 text-blue-600" />;
      case 'dropbox':
        return <Cloud className="h-5 w-5 text-blue-500" />;
      case 'onedrive':
        return <CloudSnow className="h-5 w-5 text-blue-700" />;
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {mockUser.name}!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your transfers today.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-purple-500" asChild>
              <Link to="/transfer">
                <Plus className="h-4 w-4 mr-2" />
                New Transfer
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Files Transferred</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.filesTransferred.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Saved</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.storageSpaceSaved} GB</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeIntegrations}</div>
              <p className="text-xs text-muted-foreground">
                2 platforms, 2 storage providers
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 inline mr-1" />
                Excellent performance
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transfer Volume Chart */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Transfer Volume</CardTitle>
                <CardDescription>Files transferred over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockStats.monthlyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="files" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* File Types Distribution */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>File Types Distribution</CardTitle>
                <CardDescription>Breakdown of transferred file types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockStats.fileTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) => `${type} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {mockStats.fileTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Transfers */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Active Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTransfers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No active transfers
                  </p>
                ) : (
                  <div className="space-y-4">
                    {activeTransfers.map((transfer) => (
                      <div key={transfer.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getPlatformIcon(transfer.sourcePlatform)}
                            <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
                            {getStorageIcon(transfer.destinationStorage)}
                          </div>
                          <Badge variant="secondary">
                            {transfer.progress}%
                          </Badge>
                        </div>
                        <Progress value={transfer.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connected Platforms */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Connected Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPlatforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getPlatformIcon(platform.platform)}
                        <div>
                          <div className="font-medium capitalize">{platform.platform}</div>
                          <div className="text-sm text-muted-foreground">
                            {platform.files} files
                          </div>
                        </div>
                      </div>
                      <Badge variant={platform.isConnected ? "default" : "secondary"}>
                        {platform.isConnected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Storage Providers */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Storage Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStorageProviders.map((provider) => (
                    <div key={provider.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStorageIcon(provider.provider)}
                          <div>
                            <div className="font-medium capitalize">
                              {provider.provider === 'gdrive' ? 'Google Drive' : 
                               provider.provider === 'dropbox' ? 'Dropbox' : 'OneDrive'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {provider.storageUsed} GB of {provider.storageLimit} GB
                            </div>
                          </div>
                        </div>
                        <Badge variant={provider.isConnected ? "default" : "secondary"}>
                          {provider.isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                      </div>
                      {provider.isConnected && (
                        <Progress 
                          value={(provider.storageUsed / provider.storageLimit) * 100} 
                          className="h-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/transfer">
                    <Plus className="h-4 w-4 mr-2" />
                    New Transfer
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/settings">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Connect Platform
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/history">
                    <Clock className="h-4 w-4 mr-2" />
                    View History
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
