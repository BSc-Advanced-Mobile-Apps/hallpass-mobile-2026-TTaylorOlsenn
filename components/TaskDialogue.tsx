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
  task: ITask;
  setTask: (task: ITask) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
}
export default function TaskDialogue({
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
    setShowDialog(false);
  };

  return (
    <DialogContent className="max-w-5/6">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>Make changes to your task details here.</DialogDescription>
      </DialogHeader>

      <View className="gap-4">
        <Input
          defaultValue={task.title}
          placeholder="Task title"
          onChangeText={handleUpdateTitle}
        />
        <Input
          defaultValue={task.category}
          placeholder="Category"
          onChangeText={handleUpdateCategory}
        />
      </View>

      <DialogFooter className="mt-4 flex flex-row gap-2">
        <DialogClose className="border-brand-primary w-1/2 border" asChild>
          <Button variant="outline" className="border-brand-primary rounded-3xl border">
            <Text className="text-brand-primary">Cancel</Text>
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="bg-brand-primary w-1/2 rounded-3xl" onPress={handleSave}>
            <Text className="text-background">Save changes</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
