import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import { ITask } from '@/app';

interface TaskDialogProps {
  onSave?: (task: ITask) => void;
  task: ITask;
  setTask: (task: ITask) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
}
export default function TaskDialogue({
  onSave,
  task,
  setTask,
  setShowDialog,
  showDialog,
}: TaskDialogProps) {
  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };
  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleSave = () => {
    const nextTask = {
      ...task,
      title: editedTitle,
      category: editedCategory,
    };

    setTask(nextTask);
    // If onSave is defined, call it and return early
    if (onSave) {
      onSave(nextTask);
      return;
    }
    setEditedTitle('');
    setEditedCategory('');
    setShowDialog(false);
  };

  return (
    <DialogContent className="max-w-5/6">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>Make changes to your task details here.</DialogDescription>
      </DialogHeader>

      <View className="gap-4">
        <Input value={editedTitle} placeholder="Task title" onChangeText={handleUpdateTitle} />
        <Input value={editedCategory} placeholder="Category" onChangeText={handleUpdateCategory} />
      </View>

      <DialogFooter className="mt-4 flex flex-row gap-2">
        <Button
          className="border-brand-primary flex-1 rounded-3xl border bg-transparent"
          onPress={() => setShowDialog(false)}>
          <Text className="text-brand-primary">Cancel</Text>
        </Button>
        <Button className="bg-brand-primary flex-1w-1/2 rounded-3xl" onPress={handleSave}>
          <Text>Save changes</Text>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
