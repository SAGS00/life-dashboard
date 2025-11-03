import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { DashboardSettings } from '../types';
import { Download, Upload, Trash2 } from 'lucide-react';

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: DashboardSettings;
  onUpdateSettings: (settings: DashboardSettings) => void;
  onExportData: () => void;
  onImportData: (data: string) => void;
  onClearAllData: () => void;
};

const modules = [
  { id: 'habits', label: 'Habit Tracker' },
  { id: 'journal', label: 'Journal' },
  { id: 'finance', label: 'Finance Tracker' },
  { id: 'health', label: 'Health & Fitness' },
  { id: 'goals', label: 'Goals' },
  { id: 'tasks', label: 'Task Board' },
  { id: 'pomodoro', label: 'Pomodoro Timer' },
];

export function SettingsDialog({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onExportData,
  onImportData,
  onClearAllData,
}: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
    onClose();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        onImportData(data);
      };
      reader.readAsText(file);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newModules = localSettings.enabledModules.includes(moduleId)
      ? localSettings.enabledModules.filter(m => m !== moduleId)
      : [...localSettings.enabledModules, moduleId];
    
    setLocalSettings({ ...localSettings, enabledModules: newModules });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-3">Personal Information</h3>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={localSettings.firstName}
                onChange={(e) => setLocalSettings({ ...localSettings, firstName: e.target.value })}
                placeholder="Your name"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg mb-3">Enabled Modules</h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Label htmlFor={module.id}>{module.label}</Label>
                  <Switch
                    id={module.id}
                    checked={localSettings.enabledModules.includes(module.id)}
                    onCheckedChange={() => toggleModule(module.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg mb-3">Preferences</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <Label htmlFor="reminders">Daily Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified to update your dashboard</p>
              </div>
              <Switch
                id="reminders"
                checked={localSettings.dailyReminders}
                onCheckedChange={(checked) => setLocalSettings({ ...localSettings, dailyReminders: checked })}
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg mb-3">Data Management</h3>
            <div className="space-y-2">
              <Button onClick={onExportData} variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Data (JSON)
              </Button>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  id="import-file"
                />
                <Button
                  onClick={() => document.getElementById('import-file')?.click()}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (window.confirm('Are you sure? This will delete all your data and cannot be undone.')) {
                    onClearAllData();
                    onClose();
                  }
                }}
                variant="destructive"
                className="w-full justify-start"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
