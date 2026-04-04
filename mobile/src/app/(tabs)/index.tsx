import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AboutSection } from '@/components/home/AboutSection';
import { CTASection } from '@/components/home/CTASection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HeroSection, Navbar } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import Footer from '@/components/layout/Footer';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { TrustedSchoolsSection } from '@/components/home/TrustedSchoolsSection';
import { theme } from '@/lib/theme';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.pageBackground }}
    >
      <Navbar />
      
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: theme.colors.pageBackground }}>
          <HeroSection />
          <TrustedSchoolsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <StatsSection />
          <AboutSection />
          <TestimonialsSection />
          <CTASection />
          <Footer onScrollToTop={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
