
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  MessageCircle,
  Users,
  Globe,
  HardDrive,
  Cloud,
  CloudSnow,
  ArrowRight,
  Upload,
  FileImage,
  FileVideo,
  FileText,
  Music,
  CheckCircle,
  Brain,
  FolderPlus
} from "lucide-react";

type Step = 'platform' | 'files' | 'destination' | 'organize' | 'review' | 'transfer';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video' | 'document' | 'audio';
  selected: boolean;
}

export default function Transfer() {
  const [currentStep, setCurrentStep] = useState<Step>('platform');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [transferProgress, setTransferProgress] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const { toast } = useToast();

  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'vacation-photos-2024.zip', size: '245 MB', type: 'image', selected: false },
    { id: '2', name: 'meeting-recording.mp4', size: '1.2 GB', type: 'video', selected: false },
    { id: '3', name: 'project-documents.pdf', size: '45 MB', type: 'document', selected: false },
    { id: '4', name: 'podcast-episode.mp3', size: '89 MB', type: 'audio', selected: false },
    { id: '5', name: 'presentation-slides.pptx', size: '12 MB', type: 'document', selected: false },
    { id: '6', name: 'family-video.mov', size: '2.1 GB', type: 'video', selected: false },
  ]);

  const [organizationSettings, setOrganizationSettings] = useState({
    autoTag: true,
    createFolders: true,
    removeOriginal: false
  });

  const platforms = [
    { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'text-blue-500', connected: true },
    { id: 'discord', name: 'Discord', icon: Users, color: 'text-indigo-500', connected: true },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', connected: false },
    { id: 'reddit', name: 'Reddit', icon: Globe, color: 'text-orange-500', connected: false },
  ];

  const destinations = [
    { id: 'gdrive', name: 'Google Drive', icon: HardDrive, color: 'text-blue-600', connected: true, storage: '45 GB / 100 GB' },
    { id: 'dropbox', name: 'Dropbox', icon: Cloud, color: 'text-blue-500', connected: true, storage: '12 GB / 16 GB' },
    { id: 'onedrive', name: 'OneDrive', icon: CloudSnow, color: 'text-blue-700', connected: false, storage: '0 GB / 5 GB' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage className="h-5 w-5 text-green-500" />;
      case 'video': return <FileVideo className="h-5 w-5 text-red-500" />;
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'audio': return <Music className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleFileToggle = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, selected: !file.selected } : file
    ));
  };

  const selectAllFiles = () => {
    setFiles(prev => prev.map(file => ({ ...file, selected: true })));
  };

  const deselectAllFiles = () => {
    setFiles(prev => prev.map(file => ({ ...file, selected: false })));
  };

  const startTransfer = async () => {
    const selectedFiles = files.filter(f => f.selected);
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to transfer.",
        variant: "destructive"
      });
      return;
    }

    setIsTransferring(true);
    setCurrentStep('transfer');

    // Simulate transfer progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTransferProgress(i);
    }

    toast({
      title: "Transfer completed!",
      description: `Successfully transferred ${selectedFiles.length} files to ${destinations.find(d => d.id === selectedDestination)?.name}.`
    });

    setIsTransferring(false);
  };

  const steps = [
    { id: 'platform', title: 'Select Source', description: 'Choose platform' },
    { id: 'files', title: 'Select Files', description: 'Choose files to transfer' },
    { id: 'destination', title: 'Select Destination', description: 'Choose storage provider' },
    { id: 'organize', title: 'AI Organization', description: 'Configure auto-organization' },
    { id: 'review', title: 'Review & Transfer', description: 'Confirm and start transfer' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Create New Transfer</h1>
            <p className="text-muted-foreground">
              Transfer your files in just a few simple steps
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        {currentStep !== 'transfer' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index <= currentStepIndex 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {index < currentStepIndex ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{steps[currentStepIndex]?.title}</h2>
              <p className="text-muted-foreground">{steps[currentStepIndex]?.description}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 'platform' && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Select Source Platform</CardTitle>
              <CardDescription>Choose the platform you want to transfer files from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                      selectedPlatform === platform.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${!platform.connected ? 'opacity-50' : ''}`}
                    onClick={() => platform.connected && setSelectedPlatform(platform.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <platform.icon className={`h-8 w-8 ${platform.color}`} />
                      <div>
                        <h3 className="font-semibold">{platform.name}</h3>
                        <Badge variant={platform.connected ? "default" : "secondary"} className="mt-1">
                          {platform.connected ? "Connected" : "Not Connected"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={() => setCurrentStep('files')}
                  disabled={!selectedPlatform}
                  className="bg-gradient-to-r from-primary to-purple-500"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'files' && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Select Files to Transfer</CardTitle>
              <CardDescription>Choose which files you want to transfer from {platforms.find(p => p.id === selectedPlatform)?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={selectAllFiles}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAllFiles}>
                    Deselect All
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {files.filter(f => f.selected).length} of {files.length} files selected
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      file.selected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleFileToggle(file.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={file.selected}
                        onChange={() => handleFileToggle(file.id)}
                        className="rounded border-border"
                      />
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-muted-foreground">{file.size}</div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {file.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep('platform')}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('destination')}
                  disabled={files.filter(f => f.selected).length === 0}
                  className="bg-gradient-to-r from-primary to-purple-500"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'destination' && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Select Destination</CardTitle>
              <CardDescription>Choose where you want to store your files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                      selectedDestination === destination.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${!destination.connected ? 'opacity-50' : ''}`}
                    onClick={() => destination.connected && setSelectedDestination(destination.id)}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-3">
                        <destination.icon className={`h-8 w-8 ${destination.color}`} />
                        <div>
                          <h3 className="font-semibold">{destination.name}</h3>
                          <Badge variant={destination.connected ? "default" : "secondary"}>
                            {destination.connected ? "Connected" : "Not Connected"}
                          </Badge>
                        </div>
                      </div>
                      {destination.connected && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Storage: {destination.storage}
                          </div>
                          <Progress 
                            value={destination.id === 'gdrive' ? 45 : destination.id === 'dropbox' ? 80 : 0} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep('files')}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('organize')}
                  disabled={!selectedDestination}
                  className="bg-gradient-to-r from-primary to-purple-500"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'organize' && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-500" />
                AI-Powered Organization
              </CardTitle>
              <CardDescription>Configure how you want your files to be organized automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-tag">Auto-Tag Files</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically add tags based on file content and metadata
                    </p>
                  </div>
                  <Switch
                    id="auto-tag"
                    checked={organizationSettings.autoTag}
                    onCheckedChange={(checked) => 
                      setOrganizationSettings(prev => ({ ...prev, autoTag: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="create-folders">Create Organized Folders</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create folders based on file types and dates
                    </p>
                  </div>
                  <Switch
                    id="create-folders"
                    checked={organizationSettings.createFolders}
                    onCheckedChange={(checked) => 
                      setOrganizationSettings(prev => ({ ...prev, createFolders: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="remove-original">Remove Original Files</Label>
                    <p className="text-sm text-muted-foreground">
                      Delete files from the source platform after successful transfer
                    </p>
                  </div>
                  <Switch
                    id="remove-original"
                    checked={organizationSettings.removeOriginal}
                    onCheckedChange={(checked) => 
                      setOrganizationSettings(prev => ({ ...prev, removeOriginal: checked }))
                    }
                  />
                </div>
              </div>

              {organizationSettings.createFolders && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FolderPlus className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Folder Structure Preview</h4>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>📁 2024/</div>
                    <div className="ml-4">📁 June/</div>
                    <div className="ml-8">📁 Images/</div>
                    <div className="ml-8">📁 Videos/</div>
                    <div className="ml-8">📁 Documents/</div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('destination')}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('review')}
                  className="bg-gradient-to-r from-primary to-purple-500"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'review' && (
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Review & Confirm Transfer</CardTitle>
              <CardDescription>Review your transfer settings before starting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Source Platform</h4>
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const platform = platforms.find(p => p.id === selectedPlatform);
                      return platform ? (
                        <>
                          <platform.icon className={`h-5 w-5 ${platform.color}`} />
                          <span>{platform.name}</span>
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Destination</h4>
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const destination = destinations.find(d => d.id === selectedDestination);
                      return destination ? (
                        <>
                          <destination.icon className={`h-5 w-5 ${destination.color}`} />
                          <span>{destination.name}</span>
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Files Selected</h4>
                  <p>{files.filter(f => f.selected).length} files</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Organization Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${organizationSettings.autoTag ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <span className={organizationSettings.autoTag ? '' : 'text-muted-foreground'}>
                      Auto-tag files with AI
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${organizationSettings.createFolders ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <span className={organizationSettings.createFolders ? '' : 'text-muted-foreground'}>
                      Create organized folders
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${organizationSettings.removeOriginal ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <span className={organizationSettings.removeOriginal ? '' : 'text-muted-foreground'}>
                      Remove original files after transfer
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('organize')}>
                  Back
                </Button>
                <Button 
                  onClick={startTransfer}
                  className="bg-gradient-to-r from-primary to-purple-500"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Start Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'transfer' && (
          <Card className="glass border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Upload className="h-6 w-6 mr-2 text-primary" />
                Transfer in Progress
              </CardTitle>
              <CardDescription>
                Transferring {files.filter(f => f.selected).length} files from {platforms.find(p => p.id === selectedPlatform)?.name} to {destinations.find(d => d.id === selectedDestination)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{transferProgress}%</div>
                <Progress value={transferProgress} className="h-4 mb-4" />
                <p className="text-muted-foreground">
                  {transferProgress < 100 ? 'Processing files...' : 'Transfer completed successfully!'}
                </p>
              </div>

              {transferProgress === 100 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Transfer Completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      All files have been successfully transferred and organized.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" onClick={() => setCurrentStep('platform')}>
                        Start New Transfer
                      </Button>
                      <Button asChild>
                        <a href="/dashboard">View Dashboard</a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
