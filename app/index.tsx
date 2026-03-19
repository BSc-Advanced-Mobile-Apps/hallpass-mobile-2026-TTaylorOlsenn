import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';

export default function HomeScreen() {
  return (
    <View className="bg-background flex flex-1 py-32">
      <View className="flex flex-row border-2 border-white">
        <View className="flex w-16 items-center justify-center">
          <Checkbox className="border-2" />
        </View>
        <View className="flex flex-col">
          <Text className="">Submit Assignment</Text>
          <Text className="">Due: Oct 20</Text>
        </View>
      </View>
    </View>
  );
}
