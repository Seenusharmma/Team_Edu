import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing, 
  interpolateColor,
  withRepeat,
  useDerivedValue
} from 'react-native-reanimated';
import { steps } from '@/data/home';
import { theme } from '@/lib/theme';
import { SectionHeader } from './SectionHeader';

const DARK_BROWN = '#5D4037'; 

export function HowItWorksSection() {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    // duration: 8000 (8 seconds) for a much slower, premium feel
    // withRepeat(..., -1, false) means loop infinitely, do not reverse (reset to 0)
    progress.value = withRepeat(
      withTiming(1, {
        duration: 8000,
        easing: Easing.linear, // Linear works best for a constant speed loop
      }),
      -1,
      false 
    );
  }, []);

  const animatedLineStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="px-5 py-12">
      <SectionHeader
        eyebrow="How It Works"
        title="Start Learning in 4 Simple Steps"
        description="Our automated system guides you through every stage of your growth."
      />

      <View className="mt-16 h-20 justify-center">
        {/* Background Path */}
        <View 
          className="absolute h-[2px] w-full self-center" 
          style={{ backgroundColor: theme.colors.whiteBorder }} 
        />

        {/* Animated Looping Line */}
        <Animated.View 
          className="absolute h-[3px] self-start" 
          style={[{ backgroundColor: DARK_BROWN, borderRadius: 2 }, animatedLineStyle]} 
        />

        <View className="flex-row justify-between">
          {steps.map((step, index) => (
            <StepNode 
              key={step.number} 
              step={step} 
              index={index} 
              progress={progress} 
              onPress={() => setSelectedStep(step)}
            />
          ))}
        </View>
      </View>

      {/* Popup remains the same for user interaction */}
      <Modal visible={!!selectedStep} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setSelectedStep(null)}>
          <View className="flex-1 items-center justify-center px-8" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <TouchableWithoutFeedback>
              <View className="w-full rounded-[40px] p-10 bg-white shadow-2xl">
                <Text className="text-sm font-bold tracking-tighter" style={{ color: DARK_BROWN }}>
                  PHASE 0{selectedStep?.number}
                </Text>
                <Text className="text-3xl font-bold mt-2" style={{ color: theme.colors.textPrimary }}>
                  {selectedStep?.title}
                </Text>
                <Text className="mt-6 text-lg leading-8" style={{ color: theme.colors.textSecondary }}>
                  {selectedStep?.description}
                </Text>
                <Pressable 
                  onPress={() => setSelectedStep(null)}
                  className="mt-10 py-5 rounded-3xl items-center"
                  style={{ backgroundColor: DARK_BROWN }}
                >
                  <Text className="text-white font-bold text-lg">Dismiss</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function StepNode({ step, index, progress, onPress }: any) {
  const stepPosition = index / (steps.length - 1);

  const animatedCircleStyle = useAnimatedStyle(() => {
    // The background color transition
    const bgColor = interpolateColor(
      progress.value,
      [stepPosition - 0.02, stepPosition],
      [theme.colors.white, DARK_BROWN]
    );

    return {
      backgroundColor: bgColor,
      borderColor: bgColor === theme.colors.white ? theme.colors.whiteBorder : DARK_BROWN,
      // Subtle pulse when the line hits the node
      transform: [{ scale: progress.value >= stepPosition && progress.value < stepPosition + 0.1 ? withTiming(1.15) : withTiming(1) }]
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [stepPosition - 0.02, stepPosition],
      [theme.colors.textPrimary, '#FFFFFF']
    );
    return { color: textColor };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View 
        className="h-14 w-14 items-center justify-center rounded-full border-2 z-10"
        style={[animatedCircleStyle, theme.shadows.card]}
      >
        <Animated.Text className="text-xl font-black" style={animatedTextStyle}>
          {step.number}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}