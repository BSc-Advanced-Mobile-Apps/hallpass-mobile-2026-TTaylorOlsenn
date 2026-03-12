import { View } from "react-native";
import { Text } from '@/components/ui/text';
import { Checkbox } from "@/components/ui/checkbox";

export default function HomeScreen() {
  return (
    <View className="flex flex-1 py-32 bg-background">
      <View className="border-2 border-white flex flex-row">
        <View className="flex items-center justify-center w-16"></View>
          <Checkbox className="border-2"></Checkbox>
        <View className="flex flex-col">
          <Text className="font-bold">Submit Assignment</Text>
          <Text className="font-semibold">Due: Oct 20</Text>
        </View>
</View>
</View>
  );
}