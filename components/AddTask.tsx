import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Plus } from '@/lib/icons/Plus';
import TaskDialogue from './TaskDialogue';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ITask } from '@/app';

interface AddTaskProps {
  onAdd: (title: string, category: string) => void;
}

function AddTask({ onAdd }: AddTaskProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [dialogKey, setDialogKey] = React.useState(0);
  const [task, setTask] = React.useState<{ title: string; category: string }>({
    title: '',
    category: '',
  });

  const handleSave = (updatedTask: ITask) => {
    if (updatedTask.title.trim()) {
      onAdd(updatedTask.title, updatedTask.category);
      setTask({ title: '', category: '' });
      setShowDialog(false);
    }
  };

  // Reset dialog by changing key when it closes
  React.useEffect(() => {
    if (!showDialog) {
      setDialogKey((prev) => prev + 1);
    }
  }, [showDialog]);

  return (
    <View className="absolute bottom-0 z-10">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <TouchableOpacity className="bg-brand-primary flex h-24 w-24 items-center justify-center rounded-full p-1">
            <View className="bg-brand-primary border-background flex h-20 w-20 items-center justify-center rounded-full border-4 p-3">
              <Plus size={48} color="white" />
            </View>
          </TouchableOpacity>
        </DialogTrigger>

        <TaskDialogue
          task={{ id: 0, title: task.title, category: task.category, isChecked: false }}
          setTask={(newTask) => {
            setTask({ title: newTask.title, category: newTask.category });
          }}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          onSave={handleSave}
        />
      </Dialog>
    </View>
  );
}

export { AddTask };
