
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  History as HistoryIcon,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Calendar as CalendarIcon,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Users,
  Globe,
  HardDrive,
  Cloud,
  CloudSnow,
  RefreshCw,
  Trash2
} from "lucide-react";
import { format } from "date-fns";

interface Transfer {
  id: string;
  sourcePlatform: string;
  destinationStorage: string;
  filesCount: number;
  totalSize: string;
  status: 'completed' | 'processing' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  duration?: string;
}

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  const mockTransfers: Transfer[] = [
    {
      id: "1",
      sourcePlatform: "telegram",
      destinationStorage: "gdrive",
      filesCount: 24,
      totalSize: "2.4 GB",
      status: "completed",
      createdAt: new Date("2024-06-07T09:00:00"),
      completedAt: new Date("2024-06-07T09:15:00"),
      duration: "15m 23s"
    },
    {
      id: "2",
      sourcePlatform: "discord",
      destinationStorage: "dropbox",
      filesCount: 156,
      totalSize: "8.7 GB",
      status: "processing",
      createdAt: new Date("2024-06-07T10:30:00"),
      duration: "45m 12s"
    },
    {
      id: "3",
      sourcePlatform: "telegram",
      destinationStorage: "gdrive",
      filesCount: 8,
      totalSize: "450 MB",
      status: "failed",
      createdAt: new Date("2024-06-06T14:20:00"),
      completedAt: new Date("2024-06-06T14:25:00"),
      duration: "5m 10s"
    },
    {
      id: "4",
      sourcePlatform: "whatsapp",
      destinationStorage: "onedrive",
      filesCount: 67,
      totalSize: "1.8 GB",
      status: "completed",
      createdAt: new Date("2024-06-05T16:45:00"),
      completedAt: new Date("2024-06-05T17:02:00"),
      duration: "17m 34s"
    },
    {
      id: "5",
      sourcePlatform: "reddit",
      destinationStorage: "gdrive",
      filesCount: 234,
      totalSize: "5.2 GB",
      status: "completed",
      createdAt: new Date("2024-06-04T11:15:00"),
      completedAt: new Date("2024-06-04T11:48:00"),
      duration: "33m 12s"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'telegram': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'discord': return <Users className="h-4 w-4 text-indigo-500" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'reddit': return <Globe className="h-4 w-4 text-orange-500" />;
      default: return <Cloud className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStorageIcon = (provider: string) => {
    switch (provider) {
      case 'gdrive': return <HardDrive className="h-4 w-4 text-blue-600" />;
      case 'dropbox': return <Cloud className="h-4 w-4 text-blue-500" />;
      case 'onedrive': return <CloudSnow className="h-4 w-4 text-blue-700" />;
      default: return <Cloud className="h-4 w-4 text-gray-500" />;
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'telegram': return 'Telegram';
      case 'discord': return 'Discord';
      case 'whatsapp': return 'WhatsApp';
      case 'reddit': return 'Reddit';
      default: return platform;
    }
  };

  const getStorageName = (provider: string) => {
    switch (provider) {
      case 'gdrive': return 'Google Drive';
      case 'dropbox': return 'Dropbox';
      case 'onedrive': return 'OneDrive';
      default: return provider;
    }
  };

  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = searchQuery === "" || 
      getPlatformName(transfer.sourcePlatform).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getStorageName(transfer.destinationStorage).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter;
    
    const matchesDate = !dateFilter || 
      format(transfer.createdAt, 'yyyy-MM-dd') === format(dateFilter, 'yyyy-MM-dd');

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: mockTransfers.length,
    completed: mockTransfers.filter(t => t.status === 'completed').length,
    processing: mockTransfers.filter(t => t.status === 'processing').length,
    failed: mockTransfers.filter(t => t.status === 'failed').length,
    totalSize: mockTransfers.reduce((acc, t) => {
      const size = parseFloat(t.totalSize.replace(/[^\d.]/g, ''));
      const unit = t.totalSize.includes('GB') ? 1024 : 1;
      return acc + (size * unit);
    }, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HistoryIcon className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Transfer History</h1>
                <p className="text-muted-foreground">
                  View and manage all your file transfers
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transfers</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <ArrowRightLeft className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Data</p>
                  <p className="text-2xl font-bold">{(stats.totalSize / 1024).toFixed(1)} GB</p>
                </div>
                <HardDrive className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transfers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-48 justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {(searchQuery || statusFilter !== "all" || dateFilter) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setDateFilter(undefined);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transfers Table */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>
              {filteredTransfers.length} of {mockTransfers.length} transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTransfers.length === 0 ? (
              <div className="text-center py-12">
                <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transfers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" || dateFilter 
                    ? "Try adjusting your filters" 
                    : "You haven't made any transfers yet"
                  }
                </p>
                <Button>Start Your First Transfer</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer</TableHead>
                      <TableHead>Files</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {getPlatformIcon(transfer.sourcePlatform)}
                              <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
                              {getStorageIcon(transfer.destinationStorage)}
                            </div>
                            <div>
                              <p className="font-medium">
                                {getPlatformName(transfer.sourcePlatform)} → {getStorageName(transfer.destinationStorage)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ID: {transfer.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transfer.filesCount}</div>
                          <div className="text-sm text-muted-foreground">files</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transfer.totalSize}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transfer.status)}
                            {getStatusBadge(transfer.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transfer.duration || "—"}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {format(transfer.createdAt, "MMM dd, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(transfer.createdAt, "HH:mm")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Report
                              </DropdownMenuItem>
                              {transfer.status === 'failed' && (
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Retry Transfer
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
