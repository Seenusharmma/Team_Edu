import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { trustedSchools } from '@/data/home';
import { theme } from '@/lib/theme';

const schoolAssets = [
  {
    name: 'Delhi Public School',
    image: require('../../../assets/logos/dps.jpeg'),
  },
  {
    name: "St. Xavier's School",
    image: require('../../../assets/logos/st.png'),
  },
  {
    name: 'Ryan International School',
    image: require('../../../assets/logos/ryan.jpeg'),
  },
  {
    name: 'Kendriya Vidyalaya',
    image: require('../../../assets/logos/kv.jpeg'),
  },
  {
    name: 'Modern School',
    image: require('../../../assets/logos/ms.jpeg'),
  },
  {
    name: 'Amity International School',
    image: require('../../../assets/logos/ai.png'),
  },
  {
    name: 'Podar International School',
    image: require('../../../assets/logos/pi.png'),
  },
];

const duplicatedSchools = [...schoolAssets, ...schoolAssets];
const CARD_WIDTH = 170;
const CARD_GAP = 14;
const SINGLE_TRACK_WIDTH = schoolAssets.length * (CARD_WIDTH + CARD_GAP);

export function TrustedSchoolsSection() {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -SINGLE_TRACK_WIDTH,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View
      className="overflow-hidden px-0 py-8"
      style={{ backgroundColor: theme.colors.inkSoft }}
    >
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: theme.colors.inkSoft,
        }}
      />
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: 'transparent',
        }}
      />

      <View className="px-5">
        <Text className="text-center text-[11px] font-semibold uppercase tracking-[2px] text-white/60">
          Partners
        </Text>
        <Text className="mt-3 text-center text-xl font-semibold text-white">
          Trusted By Top Schools & Institutions
        </Text>
        <Text className="mt-2 text-center text-sm leading-6 text-white/60">
          Join hundreds of educational institutions transforming learning
          experiences.
        </Text>
      </View>

      <View className="relative mt-7 overflow-hidden">
        <Animated.View
          className="flex-row"
          style={{
            width: SINGLE_TRACK_WIDTH * 2,
            transform: [{ translateX }],
          }}
        >
          {duplicatedSchools.map((school, index) => (
            <View
              key={`${school.name}-${index}`}
              className="mr-[14px] flex-row items-center rounded-full px-3 py-3"
              style={{
                width: CARD_WIDTH,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <View className="h-11 w-11 overflow-hidden rounded-full bg-white/10">
                <Image
                  source={school.image}
                  resizeMode="cover"
                  className="h-full w-full"
                />
              </View>
              <View className="ml-3 flex-1">
                <Text
                  className="text-xs font-semibold"
                  numberOfLines={2}
                  style={{ color: theme.colors.white }}
                >
                  {school.name}
                </Text>
                <Text className="mt-1 text-[10px] text-white/45">
                  Education Partner
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <LinearGradient
          colors={[theme.colors.inkSoft, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
          className="absolute bottom-0 left-0 top-0 w-12"
        />
        <LinearGradient
          colors={['transparent', theme.colors.inkSoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pointerEvents="none"
          className="absolute bottom-0 right-0 top-0 w-12"
        />
      </View>

      <View className="mt-6 items-center">
        <Text className="text-xs uppercase tracking-[2px] text-white/45">
          {trustedSchools.length}+ active school partners
        </Text>
      </View>
    </View>
  );
}
