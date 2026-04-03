import { Pressable, Text, View } from 'react-native';

import { theme } from '@/lib/theme';

export function CTASection() {
  return (
    <View
      className="overflow-hidden px-5 py-12"
      style={{ backgroundColor: theme.colors.chocolate }}
    >
      <View
        className="absolute -left-16 -top-16 h-40 w-40 rounded-full"
        style={{ backgroundColor: 'rgba(157,95,55,0.24)' }}
      />
      <View
        className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full"
        style={{ backgroundColor: 'rgba(207,141,99,0.18)' }}
      />

      <View className="relative">
        <Text className="text-center text-3xl font-bold leading-10 text-white">
          Ready to Transform Your Learning Journey?
        </Text>

        <Text className="mt-5 text-center text-base leading-7 text-white/80">
          Join thousands of students and educators already using Siksha to
          achieve their learning goals. Start your free trial today.
        </Text>

        <View className="mt-8 gap-3">
          <Pressable
            className="rounded-2xl px-6 py-4"
            style={{
              backgroundColor: theme.colors.accent,
              ...theme.shadows.button,
            }}
          >
            <Text className="text-center text-base font-semibold text-white">
              Get Started Free
            </Text>
          </Pressable>

          <Pressable
            className="rounded-2xl border px-6 py-4"
            style={{ borderColor: 'rgba(255,255,255,0.45)' }}
          >
            <Text className="text-center text-base font-semibold text-white">
              Learn More
            </Text>
          </Pressable>
        </View>

        <View className="mt-8 gap-3">
          <Text className="text-center text-sm text-white/75">
            • No credit card required
          </Text>
          <Text className="text-center text-sm text-white/75">
            • 14-day free trial
          </Text>
          <Text className="text-center text-sm text-white/75">
            • Cancel anytime
          </Text>
        </View>
      </View>
    </View>
  );
}
