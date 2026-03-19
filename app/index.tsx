import * as React from 'react';
import { View } from 'react-native';
import Task from '@/components/Task';

export interface ITask {
  title: string;
  category: string;
  isChecked: boolean;
}

export default function HomeScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className="bg-background flex-1 items-center justify-center gap-5 p-6">
      <Task />
    </View>
  );
}
