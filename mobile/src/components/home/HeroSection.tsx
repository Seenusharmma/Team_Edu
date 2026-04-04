import { useEffect } from 'react';
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { router } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';

import { theme } from '@/lib/theme';

const laptopAsset = Image.resolveAssetSource(
  require('../../../assets/home/laptop.png'),
);

export function HeroSection() {
  const { width: windowWidth } = useWindowDimensions();
  const player = useVideoPlayer(
    require('../../../assets/home/hero-merged.mp4'),
    (videoPlayer) => {
      videoPlayer.loop = true;
      videoPlayer.muted = true;
      videoPlayer.play();
    },
  );

  const laptopWidth = Math.min(windowWidth - 72, 360);
  const laptopHeight = laptopWidth * (laptopAsset.height / laptopAsset.width);
  const screenLeft = laptopWidth * 0.1615;
  const screenTop = laptopHeight * 0.1935;
  const screenWidth = laptopWidth * 0.677;
  const screenHeight = laptopHeight * 0.4475;

  return (
    <View className="pb-12 pt-28">
      <View
        className="absolute -left-12 top-8 h-40 w-40 rounded-full"
        style={{ backgroundColor: theme.colors.accentSoft }}
      />
      <View
        className="absolute -right-10 top-32 h-52 w-52 rounded-full"
        style={{ backgroundColor: theme.colors.accentWarm }}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.5)', 'rgba(246,239,230,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      <View className="relative px-5">
        <Text
          className="text-[36px] font-bold leading-[44px]"
          style={{ color: theme.colors.textPrimary }}
        >
          Accelerate Your Learning with{' '}
          <Text style={{ color: theme.colors.accent }}>AI Power</Text>
        </Text>

        <Text
          className="mt-4 text-base leading-7"
          style={{ color: theme.colors.textSecondary }}
        >
          Master concepts faster, save hours of study time, and achieve better
          results with our intelligent learning assistant that adapts to your
          unique needs.
        </Text>

        <View className="mt-8 flex-row gap-3">
          <Pressable
            className="flex-1 rounded-2xl px-6 py-4"
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
            className="flex-1 rounded-2xl border px-6 py-4"
            style={{
              borderColor: theme.colors.textPrimary,
              backgroundColor: 'rgba(255,255,255,0.45)',
            }}
          >
            <Text
              className="text-center text-base font-semibold"
              style={{ color: theme.colors.textPrimary }}
            >
              Watch Demo
            </Text>
          </Pressable>
        </View>

        <View className="mt-10 items-center">
          <View
            className="relative"
            style={{ width: laptopWidth, height: laptopHeight }}
          >
            <View
              className="absolute bg-black"
              style={{
                left: screenLeft,
                top: screenTop,
                width: screenWidth,
                height: screenHeight,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <VideoView
                player={player}
                nativeControls={false}
                contentFit="cover"
                fullscreenOptions={{ enable: false }}
                surfaceType="textureView"
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <Image
              source={require('../../../assets/home/laptop.png')}
              resizeMode="contain"
              style={{
                width: laptopWidth,
                height: laptopHeight,
                zIndex: 2,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export function Navbar() {
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);

  useEffect(() => {
    titleOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    titleScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 100 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  return (
    <View
      className="absolute left-0 right-0 top-0 z-50 px-4 pt-12 pb-3"
    >
      <View
        className="flex-row items-center justify-between rounded-2xl px-4 py-3"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderWidth: 1,
          borderColor: theme.colors.whiteBorder,
          ...theme.shadows.nav,
        }}
      >
        <View className="flex-row items-center gap-2">
          <View 
            className="h-10 w-10 items-center justify-center rounded-xl" 
            style={{ backgroundColor: theme.colors.chocolate }}
          >
            <Text className="text-base font-bold text-white">S</Text>
          </View>
          <Animated.Text
            className="text-xl font-bold"
            style={[{ color: theme.colors.chocolate }, titleAnimatedStyle]}
          >
            Siksha
          </Animated.Text>
        </View>

        <Pressable
          className="rounded-xl px-5 py-2.5"
          style={{ 
            backgroundColor: theme.colors.accent,
            ...theme.shadows.button,
          }}
          onPress={() => router.push('/contact')}
        >
          <Text className="text-sm font-semibold text-white">Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );
}
