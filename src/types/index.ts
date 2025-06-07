
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  subscription: 'free' | 'pro' | 'business';
  createdAt: Date;
}

export interface ConnectedPlatform {
  id: string;
  platform: 'telegram' | 'whatsapp' | 'discord' | 'reddit';
  accountName: string;
  isConnected: boolean;
  lastSync: Date;
  files: number;
}

export interface StorageProvider {
  id: string;
  provider: 'gdrive' | 'dropbox' | 'onedrive';
  accountEmail: string;
  isConnected: boolean;
  storageUsed: number;
  storageLimit: number;
}

export interface TransferJob {
  id: string;
  userId: string;
  sourcePlatform: string;
  destinationStorage: string;
  files: FileItem[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnail?: string;
  aiTags?: string[];
  category?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: 'Free' | 'Pro' | 'Business';
  price: number;
  features: {
    maxFilesPerMonth: number;
    maxFileSize: number;
    sourcePlatforms: number;
    destinationStorages: number;
    aiOrganization: boolean;
    prioritySupport: boolean;
    apiAccess: boolean;
  };
}
