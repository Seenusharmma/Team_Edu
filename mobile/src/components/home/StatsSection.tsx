import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';

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
  isSmallScreen,
}: {
  value: number;
  suffix: string;
  label: string;
  isSmallScreen: boolean;
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

    return () => animated.removeListener(listener);
  }, [animated, value]);

  const formatted = useMemo(() => formatNumber(displayValue), [displayValue]);

  return (
    <View
      // Logic: If screen is small, take up ~48% (2 per row). If large, take up ~23% (4 per row).
      style={{
        width: isSmallScreen ? '48%' : '23%',
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.whiteBorder,
        ...theme.shadows.card,
      }}
      className="rounded-[20px] p-4 items-center justify-center mb-3"
    >
      <View className="flex-row items-baseline">
        <Text
          className="text-2xl font-bold"
          style={{ color: theme.colors.textPrimary }}
        >
          {formatted}
        </Text>
        <Text
          className="ml-0.5 text-sm font-semibold"
          style={{ color: theme.colors.accent }}
        >
          {suffix}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-center"
        style={{ color: theme.colors.textSecondary }}
      >
        {label}
      </Text>
    </View>
  );
}

export function StatsSection() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400; // Standard breakpoint for small mobile devices

  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="Impact"
        title="Our Impact in Numbers"
        description="Real results powered by AI and innovation."
      />

      <View 
        className="mt-8 flex-row flex-wrap justify-between"
      >
        {stats.map((stat) => (
          <StatCard 
            key={stat.label} 
            {...stat} 
            isSmallScreen={isSmallScreen} 
          />
        ))}
      </View>

      <View className="mt-6 flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2">
        <Text
          className="text-[10px] font-bold uppercase tracking-[1px]"
          style={{ color: theme.colors.textMuted }}
        >
          500+ Institutions
        </Text>
        <View className="h-3 w-[1px] bg-gray-300 hidden sm:flex" />
        <Text
          className="text-[10px] font-bold uppercase tracking-[1px]"
          style={{ color: theme.colors.textMuted }}
        >
          ISO 27001 Certified
        </Text>
      </View>
    </View>
  );
}