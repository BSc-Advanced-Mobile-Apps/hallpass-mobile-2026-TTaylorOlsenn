import * as React from 'react';
import { View } from 'react-native';
import Task from '@/components/Task';

export interface ITask {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export default function HomeScreen() {
  const initialTasks: ITask[] = [
    {
      id: 1,
      title: 'Task 1',
      category: 'Category 1',
      isChecked: false,
    },
    {
      id: 2,
      title: 'Task 2',
      category: 'Category 2',
      isChecked: true,
    },
    {
      id: 3,
      title: 'Task 3',
      category: 'Category 3',
      isChecked: false,
    },
  ];

  const [checked, setChecked] = React.useState(false);

  return (
    <View className="bg-background flex-1 items-center justify-center gap-5 p-6">
      {initialTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </View>
  );
}
