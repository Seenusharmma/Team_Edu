import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { testimonials } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const prev = () => {
    setCurrentIndex((index) =>
      index === 0 ? testimonials.length - 1 : index - 1,
    );
  };

  const next = () => {
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  };

  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="Testimonials"
        title="Loved by Students & Teachers"
        description="See what our community has to say about their learning experience with Siksha."
      />

      <View
        className="mt-8 rounded-[28px] p-6"
        style={{
          backgroundColor: theme.colors.white,
          borderWidth: 1,
          borderColor: theme.colors.whiteBorder,
          ...theme.shadows.card,
        }}
      >
        <View
          className="mb-5 h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.colors.accent }}
        >
          <Text className="text-xl font-bold text-white">"</Text>
        </View>

        <Text
          className="text-base italic leading-7"
          style={{ color: theme.colors.textSecondary }}
        >
          "{current.quote}"
        </Text>

        <View className="mt-6 flex-row items-center">
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.accentSoft }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              {initials(current.name)}
            </Text>
          </View>

          <View className="ml-4 flex-1">
            <Text
              className="text-base font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              {current.name}
            </Text>
            <Text
              className="mt-1 text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              {current.role} • {current.location}
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: theme.colors.whiteSoft,
              borderWidth: 1,
              borderColor: theme.colors.whiteBorder,
            }}
            onPress={prev}
          >
            <Text style={{ color: theme.colors.textPrimary }}>{'<'}</Text>
          </Pressable>

          <View className="flex-row gap-2">
            {testimonials.map((testimonial, index) => (
              <Pressable
                key={testimonial.name}
                className="h-2 rounded-full"
                style={{
                  width: currentIndex === index ? 24 : 8,
                  backgroundColor:
                    currentIndex === index
                      ? theme.colors.accent
                      : theme.colors.textMuted,
                  opacity: currentIndex === index ? 1 : 0.3,
                }}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>

          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{
              backgroundColor: theme.colors.whiteSoft,
              borderWidth: 1,
              borderColor: theme.colors.whiteBorder,
            }}
            onPress={next}
          >
            <Text style={{ color: theme.colors.textPrimary }}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
