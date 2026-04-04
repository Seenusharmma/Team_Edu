import { useEffect, useCallback } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
  useDerivedValue,
  SharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { features } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;
const AUTO_PLAY_INTERVAL = 6000;
const TOTAL_CARDS = features.length;

function PaginationDots({
  currentIdx,
  totalCards,
}: {
  currentIdx: SharedValue<number>;
  totalCards: number;
}) {
  return (
    <View className="flex-row gap-2">
      {Array.from({ length: totalCards }).map((_, idx) => (
        <AnimatedDot key={idx} idx={idx} currentIdx={currentIdx} />
      ))}
    </View>
  );
}

function AnimatedDot({
  idx,
  currentIdx,
}: {
  idx: number;
  currentIdx: SharedValue<number>;
}) {
  const isActive = useDerivedValue(() => {
    return currentIdx.value === idx;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: isActive.value ? 24 : 8,
      backgroundColor: isActive.value ? theme.colors.accent : theme.colors.textMuted,
      opacity: isActive.value ? 1 : 0.3,
    };
  });

  return <Animated.View className="h-2 rounded-full" style={animatedStyle} />;
}

function FeatureCard({
  feature,
  onPrev,
  onNext,
  currentIdx,
  totalCards,
}: {
  feature: (typeof features)[0];
  onPrev: () => void;
  onNext: () => void;
  currentIdx: SharedValue<number>;
  totalCards: number;
}) {
  return (
    <View style={{ width: CARD_WIDTH }} className="px-5">
      <View
        className="rounded-[28px] p-6"
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
          <Text className="text-xl font-bold text-white">{feature.icon}</Text>
        </View>

        <Text className="text-xl font-semibold" style={{ color: theme.colors.textPrimary }}>
          {feature.title}
        </Text>

        <Text className="mt-3 text-base leading-7" style={{ color: theme.colors.textSecondary }}>
          {feature.description}
        </Text>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.whiteSoft, borderWidth: 1, borderColor: theme.colors.whiteBorder }}
            onPress={onPrev}
          >
            <Text style={{ color: theme.colors.textPrimary }}>{'<'}</Text>
          </Pressable>

          <PaginationDots currentIdx={currentIdx} totalCards={totalCards} />

          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.colors.whiteSoft, borderWidth: 1, borderColor: theme.colors.whiteBorder }}
            onPress={onNext}
          >
            <Text style={{ color: theme.colors.textPrimary }}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export function FeaturesSection() {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const context = useSharedValue(0);

  const scrollTo = useCallback((index: number) => {
    'worklet';
    const targetX = -index * CARD_WIDTH;
    translateX.value = withTiming(targetX, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    currentIndex.value = index;
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex.value + 1) % TOTAL_CARDS;
    scrollTo(nextIndex);
  }, [scrollTo]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex.value - 1 + TOTAL_CARDS) % TOTAL_CARDS;
    scrollTo(prevIndex);
  }, [scrollTo]);

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      if (!isDragging.value) {
        const nextIndex = (currentIndex.value + 1) % TOTAL_CARDS;
        scrollTo(nextIndex);
      }
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(autoPlayTimer);
  }, [scrollTo]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      context.value = translateX.value;
      cancelAnimation(translateX);
    })
    .onUpdate((event) => {
      translateX.value = context.value + event.translationX;
    })
    .onEnd((event) => {
      isDragging.value = false;
      const rawIndex = -translateX.value / CARD_WIDTH;
      let targetIndex = Math.round(rawIndex);

      if (event.velocityX < -500) targetIndex = Math.ceil(rawIndex);
      else if (event.velocityX > 500) targetIndex = Math.floor(rawIndex);

      targetIndex = Math.max(0, Math.min(targetIndex, TOTAL_CARDS - 1));
      scrollTo(targetIndex);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="py-12">
      <View className="px-5">
        <SectionHeader
          eyebrow="Features"
          title="Supercharge Your Learning"
          description="Experience the future of education with our AI-powered features."
        />
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View className="mt-8 overflow-hidden">
          <Animated.View
            className="flex-row"
            style={[{ width: CARD_WIDTH * TOTAL_CARDS }, animatedStyle]}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${index}`}
                feature={feature}
                onPrev={goToPrev}
                onNext={goToNext}
                currentIdx={currentIndex}
                totalCards={TOTAL_CARDS}
              />
            ))}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
