import { useState } from 'react';
import { Copy, Edit2, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const WorkflowStatus = () => {
  const [editingDescription, setEditingDescription] = useState(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 animate-in fade-in slide-in-from-top z-50">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Check size={16} />
            Model ID copied to clipboard
          </div>
        </div>
      )}

      {/* Header */}
      <h1 className="text-2xl font-bold mb-8">My Workflow</h1>

      {/* Progress Points */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center relative">
          {progressPoints.map((point, index) => (
            <div key={point.id} className="flex flex-col items-center gap-2 z-10">
              <div className={`w-4 h-4 rounded-full ${point.color} transition-colors`} />
              <span className="text-sm text-gray-600 whitespace-nowrap">{point.label}</span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-2 left-0 right-0 h-[2px] bg-gray-200" />
        </div>
      </Card>

      {/* Workflow Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b">
              <div className="font-semibold text-gray-700">Type</div>
              <div className="font-semibold text-gray-700">Description</div>
              <div className="font-semibold text-gray-700">Model ID</div>
              <div className="font-semibold text-gray-700">Date Created</div>
              <div className="font-semibold text-gray-700">Plan</div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {workflowData.map((item) => (
                <div key={item.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      {item.type}
                    </div>
                  </div>
                  <div>
                    {editingDescription === item.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          defaultValue={item.description}
                          className="h-8"
                          onBlur={(e) => handleEditDescription(item.id, e.target.value)}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.description}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingDescription(item.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {item.modelId}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopyModelId(item.modelId)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>{item.dateCreated}</div>
                  <div>{item.plan}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowStatus;