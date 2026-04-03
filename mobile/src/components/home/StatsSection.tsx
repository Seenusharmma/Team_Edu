import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';

import { stats } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

function formatNumber(num: number) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
  return `${num}`;
}

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const animated = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listener = animated.addListener(({ value: next }) => {
      setDisplayValue(Math.round(next));
    });

    Animated.timing(animated, {
      toValue: value,
      duration: 1600,
      useNativeDriver: false,
    }).start();

    return () => {
      animated.removeListener(listener);
    };
  }, [animated, value]);

  const formatted = useMemo(
    () => formatNumber(displayValue),
    [displayValue],
  );

  return (
    <View
      className="rounded-[24px] p-5"
      style={{
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.whiteBorder,
        ...theme.shadows.card,
      }}
    >
      <View className="flex-row items-end">
        <Text
          className="text-4xl font-bold"
          style={{ color: theme.colors.textPrimary }}
        >
          {formatted}
        </Text>
        <Text
          className="ml-1 text-xl font-semibold"
          style={{ color: theme.colors.accent }}
        >
          {suffix}
        </Text>
      </View>

      <Text
        className="mt-2 text-xs font-semibold uppercase tracking-[2px]"
        style={{ color: theme.colors.textSecondary }}
      >
        {label}
      </Text>
    </View>
  );
}

export function StatsSection() {
  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="Impact"
        title="Our Impact in Numbers"
        description="Real results powered by AI and innovation."
      />

      <View className="mt-8 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </View>

      <View className="mt-8 items-center gap-3">
        <Text
          className="text-xs font-semibold uppercase tracking-[2px]"
          style={{ color: theme.colors.textMuted }}
        >
          Trusted by 500+ Institutions
        </Text>
        <Text
          className="text-xs font-semibold uppercase tracking-[2px]"
          style={{ color: theme.colors.textMuted }}
        >
          ISO 27001 Certified
        </Text>
      </View>
    </View>
  );
}
