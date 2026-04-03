import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

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
    <View className="relative overflow-hidden px-5 pb-12 pt-8">
      <View
        className="absolute -left-12 top-4 h-40 w-40 rounded-full"
        style={{ backgroundColor: theme.colors.accentSoft }}
      />
      <View
        className="absolute -right-10 top-28 h-52 w-52 rounded-full"
        style={{ backgroundColor: theme.colors.accentWarm }}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.72)', 'rgba(246,239,230,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      <View className="relative">
        <View
          className="self-start rounded-full border px-4 py-2"
          style={{
            backgroundColor: theme.colors.whiteOverlay,
            borderColor: theme.colors.whiteBorder,
          }}
        >
          <Text
            className="text-[11px] font-semibold uppercase tracking-[2px]"
            style={{ color: theme.colors.accent }}
          >
            AI Learning Assistant
          </Text>
        </View>

        <Text
          className="mt-5 text-[38px] font-bold leading-[46px]"
          style={{ color: theme.colors.textPrimary }}
        >
          Accelerate Your Learning with{' '}
          <Text style={{ color: theme.colors.accent }}>AI Power</Text>
        </Text>

        <Text
          className="mt-5 text-base leading-7"
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
                allowsFullscreen={false}
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
