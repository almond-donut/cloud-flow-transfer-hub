
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Link as LinkIcon,
  Trash2,
  MessageCircle,
  Users,
  Globe,
  HardDrive,
  Cloud,
  CloudSnow,
  Plus,
  Settings as SettingsIcon,
  Download,
  Upload
} from "lucide-react";
import { mockUser, mockPlatforms, mockStorageProviders } from "../data/mockData";

export default function Settings() {
  const { toast } = useToast();
  const [user, setUser] = useState(mockUser);
  const [platforms] = useState(mockPlatforms);
  const [storageProviders] = useState(mockStorageProviders);
  
  const [notifications, setNotifications] = useState({
    transferComplete: true,
    transferFailed: true,
    weeklyReport: true,
    productUpdates: false,
    securityAlerts: true
  });

  const [preferences, setPreferences] = useState({
    defaultOrganization: 'auto',
    autoDeleteAfterTransfer: false,
    transferQuality: 'original',
    timeZone: 'UTC-8'
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram': return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'discord': return <Users className="h-5 w-5 text-indigo-500" />;
      case 'whatsapp': return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'reddit': return <Globe className="h-5 w-5 text-orange-500" />;
      default: return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStorageIcon = (provider: string) => {
    switch (provider) {
      case 'gdrive': return <HardDrive className="h-5 w-5 text-blue-600" />;
      case 'dropbox': return <Cloud className="h-5 w-5 text-blue-500" />;
      case 'onedrive': return <CloudSnow className="h-5 w-5 text-blue-700" />;
      default: return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleConnectPlatform = (platformId: string) => {
    toast({
      title: "Platform connection",
      description: `Connecting to ${platformId}... (This would trigger OAuth flow in a real app)`
    });
  };

  const handleDisconnectPlatform = (platformId: string) => {
    toast({
      title: "Platform disconnected",
      description: `Successfully disconnected from ${platformId}.`,
      variant: "destructive"
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export will be ready for download in a few minutes."
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "This would trigger an account deletion confirmation flow.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account, integrations, and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={user.name}
                          onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-primary to-purple-500">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Plan</p>
                          <p className="text-sm text-muted-foreground">Pro Plan</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Next billing date</p>
                        <p className="font-medium">July 7, 2024</p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Manage Subscription
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Usage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Connected Platforms */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    Social Platforms
                  </CardTitle>
                  <CardDescription>
                    Connect your social media platforms to transfer files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getPlatformIcon(platform.platform)}
                          <div>
                            <p className="font-medium capitalize">{platform.platform}</p>
                            <p className="text-sm text-muted-foreground">
                              {platform.isConnected ? platform.accountName : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={platform.isConnected ? "default" : "secondary"}>
                            {platform.isConnected ? "Connected" : "Disconnected"}
                          </Badge>
                          {platform.isConnected ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDisconnectPlatform(platform.platform)}
                            >
                              Disconnect
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleConnectPlatform(platform.platform)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Storage Providers */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cloud className="h-5 w-5 mr-2" />
                    Cloud Storage
                  </CardTitle>
                  <CardDescription>
                    Connect your cloud storage providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {storageProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStorageIcon(provider.provider)}
                          <div>
                            <p className="font-medium">
                              {provider.provider === 'gdrive' ? 'Google Drive' : 
                               provider.provider === 'dropbox' ? 'Dropbox' : 'OneDrive'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {provider.isConnected ? provider.accountEmail : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={provider.isConnected ? "default" : "secondary"}>
                            {provider.isConnected ? "Connected" : "Disconnected"}
                          </Badge>
                          {provider.isConnected ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDisconnectPlatform(provider.provider)}
                            >
                              Disconnect
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleConnectPlatform(provider.provider)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Storage Provider
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transfer Complete</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your file transfers are completed
                      </p>
                    </div>
                    <Switch
                      checked={notifications.transferComplete}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, transferComplete: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transfer Failed</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when transfers fail or encounter errors
                      </p>
                    </div>
                    <Switch
                      checked={notifications.transferFailed}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, transferFailed: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summaries of your transfer activity
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new features and improvements
                      </p>
                    </div>
                    <Switch
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, productUpdates: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Important security notifications and alerts
                      </p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, securityAlerts: checked }))
                      }
                    />
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-primary to-purple-500">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Transfer Preferences</CardTitle>
                <CardDescription>
                  Configure default settings for your file transfers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Default Organization</Label>
                    <Select
                      value={preferences.defaultOrganization}
                      onValueChange={(value) => 
                        setPreferences(prev => ({ ...prev, defaultOrganization: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">AI Auto-Organization</SelectItem>
                        <SelectItem value="date">Organize by Date</SelectItem>
                        <SelectItem value="type">Organize by File Type</SelectItem>
                        <SelectItem value="none">No Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Transfer Quality</Label>
                    <Select
                      value={preferences.transferQuality}
                      onValueChange={(value) => 
                        setPreferences(prev => ({ ...prev, transferQuality: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original Quality</SelectItem>
                        <SelectItem value="high">High Quality</SelectItem>
                        <SelectItem value="medium">Medium Quality</SelectItem>
                        <SelectItem value="low">Low Quality (Faster)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select
                      value={preferences.timeZone}
                      onValueChange={(value) => 
                        setPreferences(prev => ({ ...prev, timeZone: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-delete After Transfer</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically delete files from source after successful transfer
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoDeleteAfterTransfer}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, autoDeleteAfterTransfer: checked }))
                    }
                  />
                </div>

                <Button className="bg-gradient-to-r from-primary to-purple-500">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Data Export
                  </CardTitle>
                  <CardDescription>
                    Download your account data and transfer history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can export all your account data, including transfer history, 
                    settings, and connected accounts. The export will be available as a ZIP file.
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <Shield className="h-5 w-5 mr-2" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="font-medium text-red-600 mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data. 
                      This action cannot be undone.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
