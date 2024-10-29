import { useState } from 'react';
import { 
  Menu,
  ChevronRight,
  User,
  FileText,
  PlusCircle,
  Link,
  Copy,
  Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const WorkflowDashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeRoute, setActiveRoute] = useState('my-workflow');
  const [editingDescription, setEditingDescription] = useState(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const sidebarItems = [
    { id: 'my-workflow', icon: <FileText size={20} />, label: 'My Workflow' },
    { id: 'new-workflow', icon: <PlusCircle size={20} />, label: 'New Workflow' },
    { id: 'integrations', icon: <Link size={20} />, label: 'External Integrations' }
  ];

  const progressPoints = [
    { id: 'created', label: 'Model Created', color: 'bg-white border-2' },
    { id: 'uploaded', label: 'Data Uploaded', color: 'bg-gray-300' },
    { id: 'marked', label: 'Label Marked', color: 'bg-yellow-400' },
    { id: 'ready', label: 'Model Ready', color: 'bg-green-500' }
  ];

  const workflowData = [
    {
      id: 1,
      type: 'ocr',
      description: 'Invoice Model',
      modelId: 'MOD-2024-001',
      dateCreated: '2024-03-15',
      plan: 'Enterprise'
    },
    {
      id: 2,
      type: 'ocr',
      description: 'Receipt Scanner',
      modelId: 'MOD-2024-002',
      dateCreated: '2024-03-16',
      plan: 'Professional'
    }
  ];

  const handleCopyModelId = (modelId) => {
    navigator.clipboard.writeText(modelId);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const handleEditDescription = (id, newDescription) => {
    console.log('Updating description:', id, newDescription);
    setEditingDescription(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Notification */}
      {showCopyNotification && (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg px-4 py-2 z-50 animate-fade-in">
          Model ID copied to clipboard
        </div>
      )}

      {/* Sidebar */}
      <div className={`bg-white h-full shadow-lg transition-all duration-300 flex flex-col ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {isSidebarExpanded && <h2 className="text-xl font-bold">Workflow</h2>}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            {isSidebarExpanded ? <ChevronRight /> : <Menu />}
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 p-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start mb-2 ${
                isSidebarExpanded ? 'px-4' : 'px-2'
              } ${activeRoute === item.id ? 'bg-gray-100' : ''}`}
              onClick={() => setActiveRoute(item.id)}
            >
              {item.icon}
              {isSidebarExpanded && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* User Button */}
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            className={`w-full justify-start ${isSidebarExpanded ? 'px-4' : 'px-2'}`}
          >
            <User size={20} />
            {isSidebarExpanded && <span className="ml-3">User Profile</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {activeRoute === 'my-workflow' && (
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">My Workflow</h1>

          {/* Progress Points */}
          <div className="flex justify-between items-center mb-8 bg-white rounded-lg p-6 shadow-sm">
            {progressPoints.map((point, index) => (
              <div key={point.id} className="flex flex-col items-center gap-2 relative">
                <div className={`w-4 h-4 rounded-full ${point.color}`} />
                <span className="text-sm text-gray-600 whitespace-nowrap">{point.label}</span>
                {index < progressPoints.length - 1 && (
                  <div className="absolute h-[2px] bg-gray-300 w-[calc(100%-2rem)] left-8 top-2" />
                )}
              </div>
            ))}
          </div>

          {/* Workflow Table */}
          <Card className="w-full">
            <div className="p-4">
              <div className="grid grid-cols-5 gap-4 mb-4 font-semibold text-gray-700 px-4 py-2 bg-gray-50 rounded-lg">
                <div>Type</div>
                <div>Description</div>
                <div>Model ID</div>
                <div>Date Created</div>
                <div>Plan</div>
              </div>
              {workflowData.map((item) => (
                <div key={item.id} className="grid grid-cols-5 gap-4 px-4 py-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    {item.type}
                  </div>
                  <div>
                    {editingDescription === item.id ? (
                      <Input
                        defaultValue={item.description}
                        onBlur={(e) => handleEditDescription(item.id, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.description}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingDescription(item.id)}
                        >
                          <Edit2 size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.modelId}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyModelId(item.modelId)}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <div>{item.dateCreated}</div>
                  <div>{item.plan}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkflowDashboard;