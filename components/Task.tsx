import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import TaskDialogue from '@/components/TaskDialogue';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { ITask } from '@/app';

interface TaskProps {
  task: ITask;
}

export default function Task({ task: initialTask }: TaskProps) {
  const [task, setTask] = React.useState(initialTask);
  const [showDialog, setShowDialog] = React.useState(false);

  const handleSetChecked = () => {
    const nextChecked = !task.isChecked;
    setTask({ ...task, isChecked: nextChecked });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity className="flex w-full flex-row" delayLongPress={500}>
          <View className="flex h-full w-24 px-8 py-5">
            <Checkbox
              className="border-foreground checked:bg-foreground"
              checked={task.isChecked}
              onCheckedChange={handleSetChecked}
            />
          </View>
          <View className="border-foreground-transparent flex h-full flex-1 gap-1 border-b py-4">
            <Text className="text-foreground text-xl">{task.title}</Text>
            <Text className="text-foreground-transparent text-xl">{task.category}</Text>
          </View>
        </TouchableOpacity>
      </DialogTrigger>

      <TaskDialogue
        task={task}
        setTask={setTask}
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      />
    </Dialog>
  );
}

export { Task };
