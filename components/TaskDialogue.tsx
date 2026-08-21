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
  onUpdate?: (task: ITask) => void;
  onDelete?: (id: number) => void;
  task: ITask;
  setTask: (task: ITask) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
}
export default function TaskDialogue({
  onSave,
  onUpdate,
  onDelete,
  task,
  setTask,
  setShowDialog,
  showDialog,
}: TaskDialogProps) {
  const [confirming, setConfirming] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);
  const [editedDate, setEditedDate] = React.useState(task.date ?? '');
  const [dateError, setDateError] = React.useState('');

  React.useEffect(() => {
    setEditedTitle(task.title);
    setEditedCategory(task.category);
    setEditedDate(task.date);
    setDateError('');
  }, [task]);

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };
  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };
  const handleUpdateDate = (date: string) => {
    setEditedDate(date);
    setDateError('');
  };

  const isValidDateString = (dateString: string) => {
    const trimmed = dateString.trim();
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(trimmed)) {
      return false;
    }
    const [day, month, year] = trimmed.split('-').map(Number);
    const parsed = new Date(
      `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    );
    return (
      !Number.isNaN(parsed.getTime()) &&
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() + 1 === month &&
      parsed.getUTCDate() === day
    );
  };

  const handleSave = () => {
    if (!editedDate?.trim()) {
      setDateError('Please enter a date in DD-MM-YYYY format.');
      return;
    }

    if (!isValidDateString(editedDate)) {
      setDateError('Date must be in DD-MM-YYYY format and a valid calendar date.');
      return;
    }

    const nextTask = {
      ...task,
      title: editedTitle,
      category: editedCategory,
      date: editedDate.trim(),
    };

    setTask(nextTask);
    // If onSave is defined, call it and return early
    if (onSave) {
      onSave(nextTask);

      return;
    }

    if (onUpdate) {
      onUpdate(nextTask);
      setShowDialog(false);

      return;
    }

    setEditedTitle('');
    setEditedCategory('');
    setEditedDate('');
    setShowDialog(false);
  };

  const handleDelete = () => {
    setConfirming(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
    setConfirming(false);
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
        <Input
          value={editedDate}
          placeholder="DD-MM-YYYY"
          onChangeText={handleUpdateDate}
          keyboardType="numbers-and-punctuation"
        />
        <View className="min-h-6">
          {dateError ? <Text className="text-destructive">{dateError}</Text> : null}
        </View>
      </View>

      <DialogFooter className="mt-4 flex flex-row gap-2">
        {confirming ? (
          <>
            <Button
              className="border-destructive flex-1 rounded-3xl border bg-transparent"
              onPress={confirmDelete}>
              <Text className="text-destructive">Confirm Delete</Text>
            </Button>
            <Button
              className="border-brand-primary flex-1 rounded-3xl border bg-transparent"
              onPress={() => setConfirming(false)}>
              <Text className="text-brand-primary">Cancel</Text>
            </Button>
            <Button
              className="opacity-0 flex-1 rounded-3xl border bg-transparent"
              disabled>
              <Text />
            </Button>
          </>
        ) : (
          <>
            <Button
              className="border-destructive flex-1 rounded-3xl border bg-transparent"
              onPress={handleDelete}>
              <Text className="text-destructive">Delete</Text>
            </Button>
            <Button
              className="border-brand-primary flex-1 rounded-3xl border bg-transparent"
              onPress={() => setShowDialog(false)}>
              <Text className="text-brand-primary">Cancel</Text>
            </Button>
            <Button className="bg-brand-primary flex-1 justify-center rounded-3xl" onPress={handleSave}>
              <Text className="text-center">Save changes</Text>
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
