import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/lib/theme';

export default function ProgressScreen() {
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: theme.colors.pageBackground }}
    >
      <View className="items-center">
        <Text
          className="text-3xl font-bold"
          style={{ color: theme.colors.textPrimary }}
        >
          Progress
        </Text>
        <Text
          className="mt-3 text-center text-base leading-7"
          style={{ color: theme.colors.textSecondary }}
        >
          Analytics, milestones, and performance summaries can go here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
