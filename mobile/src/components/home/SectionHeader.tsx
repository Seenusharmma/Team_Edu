import { Text, View } from 'react-native';

import { theme } from '@/lib/theme';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  inverted = false,
}: SectionHeaderProps) {
  const titleColor = inverted
    ? theme.colors.white
    : theme.colors.textPrimary;
  const bodyColor = inverted
    ? theme.colors.whiteOverlay
    : theme.colors.textSecondary;

  return (
    <View className="items-center">
      <View className="mb-4 flex-row items-center gap-3">
        <View
          className="h-px w-12"
          style={{
            backgroundColor: inverted
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0,0,0,0.1)',
          }}
        />
        <Text
          className="text-[11px] font-semibold uppercase tracking-[2px]"
          style={{ color: theme.colors.accent }}
        >
          {eyebrow}
        </Text>
        <View
          className="h-px w-12"
          style={{
            backgroundColor: inverted
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0,0,0,0.1)',
          }}
        />
      </View>

      <Text
        className="text-center text-[30px] font-bold leading-10"
        style={{ color: titleColor }}
      >
        {title}
      </Text>

      {description ? (
        <Text
          className="mt-4 max-w-[320px] text-center text-base leading-7"
          style={{ color: bodyColor }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}
