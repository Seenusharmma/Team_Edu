import { Text, View } from 'react-native';

import { features } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

export function FeaturesSection() {
  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="Features"
        title="Supercharge Your Learning"
        description="Experience the future of education with our AI-powered features designed to help you succeed."
      />

      <View className="mt-8 gap-4">
        {features.map((feature) => (
          <View
            key={feature.title}
            className="rounded-[24px] p-5"
            style={{
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.whiteBorder,
              borderWidth: 1,
              ...theme.shadows.card,
            }}
          >
            <View
              className="h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Text className="text-sm font-bold text-white">{feature.icon}</Text>
            </View>

            <Text
              className="mt-4 text-xl font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              {feature.title}
            </Text>

            <Text
              className="mt-2 text-sm leading-6"
              style={{ color: theme.colors.textSecondary }}
            >
              {feature.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
