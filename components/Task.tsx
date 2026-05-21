import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import TaskDialogue from '@/components/TaskDialogue';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { ITask } from '@/app';

interface TaskProps {
  task: ITask;
  onUpdate?: (task: ITask) => void;
}

export default function Task({ task: initialTask, onUpdate }: TaskProps) {
  const [task, setTask] = React.useState(initialTask);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleSetChecked = () => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);

    if (onUpdate) {
      onUpdate(updatedTask);
      setShowDialog(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <TouchableOpacity
          className="flex w-full flex-row"
          delayLongPress={500}
          onPress={() => setShowDialog(true)}>
          <View className="flex h-full w-24 px-8 py-5">
            <Checkbox
              testID="checkbox"
              className="border-foreground checked:bg-foreground"
              checked={task.isChecked}
              onCheckedChange={handleSetChecked}
            />
          </View>

          <View className="border-foreground-transparent flex h-full flex-1 gap-1 border-b py-4">
            <Text className="text-foreground text-xl">{task.title}</Text>
            <Text className="text-foreground-transparent text-xl">{task.category}</Text>
            <Text className="text-foreground-transparent text-xl">{task.date}</Text>
          </View>
        </TouchableOpacity>
      </DialogTrigger>

      <TaskDialogue
        task={task}
        setTask={setTask}
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        onUpdate={onUpdate}
      />
    </Dialog>
  );
}

export { Task };
