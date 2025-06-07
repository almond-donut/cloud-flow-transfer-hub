
import { ConnectedPlatform, StorageProvider, TransferJob, SubscriptionPlan, User } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  subscription: 'pro',
  createdAt: new Date('2024-01-15')
};

export const mockPlatforms: ConnectedPlatform[] = [
  {
    id: '1',
    platform: 'telegram',
    accountName: '@john_doe',
    isConnected: true,
    lastSync: new Date('2024-06-07T10:30:00'),
    files: 1247
  },
  {
    id: '2',
    platform: 'discord',
    accountName: 'john_doe#1234',
    isConnected: true,
    lastSync: new Date('2024-06-06T15:45:00'),
    files: 856
  },
  {
    id: '3',
    platform: 'whatsapp',
    accountName: '+1 234 567 8900',
    isConnected: false,
    lastSync: new Date('2024-01-01'),
    files: 0
  },
  {
    id: '4',
    platform: 'reddit',
    accountName: 'u/johndoe123',
    isConnected: false,
    lastSync: new Date('2024-01-01'),
    files: 0
  }
];

export const mockStorageProviders: StorageProvider[] = [
  {
    id: '1',
    provider: 'gdrive',
    accountEmail: 'john.doe@gmail.com',
    isConnected: true,
    storageUsed: 45.2,
    storageLimit: 100
  },
  {
    id: '2',
    provider: 'dropbox',
    accountEmail: 'john.doe@example.com',
    isConnected: true,
    storageUsed: 12.8,
    storageLimit: 16
  },
  {
    id: '3',
    provider: 'onedrive',
    accountEmail: 'john.doe@outlook.com',
    isConnected: false,
    storageUsed: 0,
    storageLimit: 5
  }
];

export const mockTransfers: TransferJob[] = [
  {
    id: '1',
    userId: '1',
    sourcePlatform: 'telegram',
    destinationStorage: 'gdrive',
    files: [],
    status: 'completed',
    progress: 100,
    createdAt: new Date('2024-06-07T09:00:00'),
    completedAt: new Date('2024-06-07T09:15:00')
  },
  {
    id: '2',
    userId: '1',
    sourcePlatform: 'discord',
    destinationStorage: 'dropbox',
    files: [],
    status: 'processing',
    progress: 67,
    createdAt: new Date('2024-06-07T10:30:00')
  },
  {
    id: '3',
    userId: '1',
    sourcePlatform: 'telegram',
    destinationStorage: 'gdrive',
    files: [],
    status: 'failed',
    progress: 25,
    createdAt: new Date('2024-06-06T14:20:00')
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: {
      maxFilesPerMonth: 50,
      maxFileSize: 10,
      sourcePlatforms: 2,
      destinationStorages: 1,
      aiOrganization: false,
      prioritySupport: false,
      apiAccess: false
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    features: {
      maxFilesPerMonth: -1, // unlimited
      maxFileSize: 100,
      sourcePlatforms: -1, // unlimited
      destinationStorages: 5,
      aiOrganization: true,
      prioritySupport: true,
      apiAccess: false
    }
  },
  {
    id: 'business',
    name: 'Business',
    price: 49,
    features: {
      maxFilesPerMonth: -1,
      maxFileSize: 500,
      sourcePlatforms: -1,
      destinationStorages: -1,
      aiOrganization: true,
      prioritySupport: true,
      apiAccess: true
    }
  }
];

export const mockStats = {
  filesTransferred: 12847,
  storageSpaceSaved: 245.7,
  activeIntegrations: 4,
  timeSaved: 156,
  successRate: 98.5,
  monthlyUsage: [
    { month: 'Jan', files: 450 },
    { month: 'Feb', files: 680 },
    { month: 'Mar', files: 920 },
    { month: 'Apr', files: 1240 },
    { month: 'May', files: 1680 },
    { month: 'Jun', files: 2100 }
  ],
  fileTypes: [
    { type: 'Images', count: 5200, percentage: 40 },
    { type: 'Videos', count: 3900, percentage: 30 },
    { type: 'Documents', count: 2600, percentage: 20 },
    { type: 'Audio', count: 1300, percentage: 10 }
  ]
};
