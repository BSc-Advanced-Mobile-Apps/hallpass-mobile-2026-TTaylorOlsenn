import { ITask } from '@/app/index';
import { View } from 'react-native';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import * as React from 'react';

interface TaskProps {
  task: ITask;
  title: string;
  category: string;
  isChecked: boolean;
}

export default function Task({ task }: TaskProps) {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className="flex w-full flex-row">
      <View className="flex h-full w-24 px-8 py-5">
        <Checkbox
          className="border-foreground checked:bg-foreground"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </View>
      <View className="border-foreground-transparent flex h-full flex-1 gap-1 border-b py-4">
        <Text className="text-foreground text-xl">My test item</Text>
        <Text className="text-foreground-transparent text-xl">Test category</Text>
      </View>
    </View>
  );
}
