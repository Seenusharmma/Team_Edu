import { Pressable, Text, View } from 'react-native';

import { aboutParagraphs } from '@/data/home';
import { theme } from '@/lib/theme';

export function AboutSection() {
  return (
    <View
      className="px-5 py-12"
      style={{ backgroundColor: theme.colors.chocolate }}
    >
      <View
        className="mb-6 h-64 rounded-[28px] p-5"
        style={{ backgroundColor: '#3a2923' }}
      >
        <View className="h-full justify-between rounded-[24px] border border-white/10 p-5">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-white/60">
            About Siksha
          </Text>
          <View>
            <Text className="text-2xl font-bold text-white">
              Personalized AI support for every learner.
            </Text>
            <Text className="mt-3 text-sm leading-6 text-white/70">
              Inspired by the same warm, premium visual direction as the
              website, rebuilt here for mobile.
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-3xl font-bold text-white">
        About <Text style={{ color: theme.colors.accent }}>Siksha</Text>
      </Text>
      <View
        className="mb-6 mt-4 h-1 w-16 rounded-full"
        style={{ backgroundColor: theme.colors.accent }}
      />

      <View className="gap-4">
        {aboutParagraphs.map((paragraph) => (
          <Text
            key={paragraph}
            className="text-base leading-7"
            style={{ color: theme.colors.whiteOverlay }}
          >
            {paragraph}
          </Text>
        ))}
      </View>

      <Pressable
        className="mt-8 rounded-2xl px-6 py-4"
        style={{
          backgroundColor: theme.colors.accent,
          alignSelf: 'flex-start',
          ...theme.shadows.button,
        }}
      >
        <Text className="text-base font-semibold text-white">
          Learn More About Us
        </Text>
      </Pressable>
    </View>
  );
}
