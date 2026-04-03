import { Text, View } from 'react-native';

import { steps } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

export function HowItWorksSection() {
  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="How It Works"
        title="Start Learning in 4 Simple Steps"
        description="Get started with Siksha and transform your learning experience today."
      />

      <View className="mt-8 gap-4">
        {steps.map((step) => (
          <View
            key={step.number}
            className="rounded-[24px] p-5"
            style={{
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.whiteBorder,
              borderWidth: 1,
            }}
          >
            <View className="flex-row items-start gap-4">
              <View
                className="h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: theme.colors.accent }}
              >
                <Text className="text-lg font-bold text-white">{step.number}</Text>
              </View>

              <View className="flex-1">
                <Text
                  className="text-xl font-semibold"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {step.title}
                </Text>
                <Text
                  className="mt-2 text-sm leading-6"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {step.description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
