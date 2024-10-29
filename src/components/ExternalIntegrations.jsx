import { useState } from 'react';
import { 
  CalendarPlus, 
  FileText, 
  BookOpen, 
  Upload, 
  Database, 
  Grid,
  X,
  ChevronRight,
  Link,
  MessageSquare,
  BookOpenCheck,
  Box,
  Server,
  MessageCircle,
  HardDrive,
  Table2,
  MessagesSquare,
  Boxes,
  CloudCog
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const ExternalIntegrations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const integrations = [
    {
      id: 1, 
      name: 'QuickBooks',
      description: 'Connect your QuickBooks account to automate financial workflows',
      category: 'accounting',
      icon: <BookOpenCheck size={24} className="text-blue-600" />,
      formFields: [
        { name: 'apiKey', label: 'API Key', type: 'text' },
        { name: 'companyId', label: 'Company ID', type: 'text' }
      ]
    },
    {
      id: 2,
      name: 'Dropbox',
      description: 'Seamlessly transfer files to and from your Dropbox account',
      category: 'file-transfer',
      icon: <Box size={24} className="text-blue-500" />,
      formFields: [
        { name: 'accessToken', label: 'Access Token', type: 'text' },
        { name: 'folder', label: 'Default Folder', type: 'text' }
      ]
    },
    {
      id: 3,
      name: 'MongoDB',
      description: 'Connect to your MongoDB database for data storage and retrieval',
      category: 'database',
      icon: <Server size={24} className="text-green-600" />,
      formFields: [
        { name: 'connectionString', label: 'Connection String', type: 'text' },
        { name: 'database', label: 'Database Name', type: 'text' }
      ]
    },
    {
      id: 4,
      name: 'Slack',
      description: 'Send automated notifications and updates to your Slack channels',
      category: 'communication',
      icon: <MessageCircle size={24} className="text-purple-500" />,
      formFields: [
        { name: 'webhookUrl', label: 'Webhook URL', type: 'text' },
        { name: 'channel', label: 'Default Channel', type: 'text' }
      ]
    },
    {
      id: 5,
      name: 'Google Drive',
      description: 'Integrate with Google Drive for document storage and sharing',
      category: 'file-transfer',
      icon: <HardDrive size={24} className="text-yellow-500" />,
      formFields: [
        { name: 'clientId', label: 'Client ID', type: 'text' },
        { name: 'clientSecret', label: 'Client Secret', type: 'password' }
      ]
    },
    {
      id: 6,
      name: 'PostgreSQL',
      description: 'Connect to your PostgreSQL database for relational data storage',
      category: 'database',
      icon: <Table2 size={24} className="text-blue-700" />,
      formFields: [
        { name: 'host', label: 'Host', type: 'text' },
        { name: 'port', label: 'Port', type: 'text' },
        { name: 'database', label: 'Database Name', type: 'text' }
      ]
    },
    {
      id: 7,
      name: 'Microsoft Teams',
      description: 'Send messages and notifications to Microsoft Teams channels',
      category: 'communication',
      icon: <MessagesSquare size={24} className="text-blue-500" />,
      formFields: [
        { name: 'webhookUrl', label: 'Webhook URL', type: 'text' },
        { name: 'teamId', label: 'Team ID', type: 'text' }
      ]
    },
    {
      id: 8,
      name: 'Redis',
      description: 'Use Redis for high-performance caching and data storage',
      category: 'database',
      icon: <Database size={24} className="text-red-500" />,
      formFields: [
        { name: 'host', label: 'Host', type: 'text' },
        { name: 'port', label: 'Port', type: 'text' },
        { name: 'password', label: 'Password', type: 'password' }
      ]
    },
    {
      id: 9,
      name: 'AWS S3',
      description: 'Store and retrieve files using Amazon S3 cloud storage',
      category: 'file-transfer',
      icon: <CloudCog size={24} className="text-orange-500" />,
      formFields: [
        { name: 'accessKey', label: 'Access Key', type: 'text' },
        { name: 'secretKey', label: 'Secret Key', type: 'password' },
        { name: 'bucket', label: 'Bucket Name', type: 'text' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Integrations', icon: <Grid size={18} /> },
    { id: 'accounting', label: 'Accounting', icon: <BookOpen size={18} /> },
    { id: 'file-transfer', label: 'File Transfer', icon: <Upload size={18} /> },
    { id: 'database', label: 'Database', icon: <Database size={18} /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare size={18} /> },
    { id: 'others', label: 'Others', icon: <FileText size={18} /> }
  ].map(category => ({
    ...category,
    count: category.id === 'all' 
      ? integrations.length 
      : integrations.filter(item => item.category === category.id).length
  }));

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations
    : integrations.filter(item => item.category === activeCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">External Integrations</h1>
        <Button className="flex items-center gap-2">
          <CalendarPlus size={18} />
          Schedule a Demo
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="flex items-center gap-2 group relative"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            <span>{category.label}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full 
              ${activeCategory === category.id 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }`}
            >
              {category.count}
            </span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => (
          <Card
            key={integration.id}
            className="p-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                {integration.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{integration.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-end pt-3 border-t">
              <Button 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setSelectedIntegration(integration)}
              >
                <Link size={14} />
                Connect
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={selectedIntegration !== null} onOpenChange={() => setSelectedIntegration(null)}>
        <SheetContent className="sm:max-w-[440px]">
          {selectedIntegration && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    {selectedIntegration.icon}
                  </div>
                  {selectedIntegration.name} Integration
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {selectedIntegration.formFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                <Button className="w-full">
                  Connect Integration
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ExternalIntegrations;