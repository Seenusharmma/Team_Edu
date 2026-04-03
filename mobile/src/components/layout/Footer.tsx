import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { theme } from '@/lib/theme';

const footerLinks = {
  product: ['How it Works', 'Features', 'Pricing'],
  company: ['About Us', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Service'],
};

const socialLinks = ['X', 'in', 'GH'];

type FooterProps = {
  onScrollToTop?: () => void;
};

export default function Footer({ onScrollToTop }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <View style={{ backgroundColor: theme.colors.pageBackground }}>
      <View className="px-5 py-14">
        <View className="items-center">
          <Text
            className="text-center text-3xl font-bold leading-10"
            style={{ color: '#000000' }}
          >
            Transform Your Learning with AI
          </Text>

          <Text
            className="mt-4 max-w-[320px] text-center text-base leading-7"
            style={{ color: '#000000' }}
          >
            An AI-powered study system that reduces effort, saves time, and
            helps you master concepts faster.
          </Text>

          <View className="mt-8 w-full max-w-[360px] gap-3">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textMuted}
              className="rounded-2xl border px-5 py-4 text-sm"
              style={{
                borderColor: theme.colors.whiteBorder,
                backgroundColor: theme.colors.white,
                color: '#000000',
              }}
            />
            <Pressable
              className="rounded-2xl px-8 py-4"
              onPress={handleSubmit}
              style={{
                backgroundColor: theme.colors.textPrimary,
              }}
            >
              <Text className="text-center font-semibold text-white">
                Get Started
              </Text>
            </Pressable>
          </View>

          {isSubmitted ? (
            <Text
              className="mt-4 text-sm font-medium"
              style={{ color: theme.colors.accent }}
            >
              Thanks for subscribing!
            </Text>
          ) : null}
        </View>

        <View
          className="my-12 h-px w-full"
          style={{ backgroundColor: theme.colors.inkOverlay }}
        />

        <View className="gap-8">
          <View>
            <View className="mb-4 flex-row items-center gap-3">
              <View
                className="h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.colors.accent,
                }}
              >
                <Text className="text-lg font-bold text-white">S</Text>
              </View>
              <Text
                className="text-xl font-bold"
                style={{ color: '#000000' }}
              >
                Siksha
              </Text>
            </View>

            <Text
              className="max-w-[300px] text-sm leading-7"
              style={{ color: '#000000' }}
            >
              AI-powered study tool that reduces effort, saves time, and helps
              students and organizations master concepts faster.
            </Text>

            <View className="mt-5 flex-row gap-3">
              {socialLinks.map((social) => (
                <View
                  key={social}
                  className="h-10 w-10 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: theme.colors.whiteBorder,
                    backgroundColor: theme.colors.whiteSoft,
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: '#000000' }}
                  >
                    {social}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-row justify-between gap-6">
            <View className="flex-1">
              <Text
                className="mb-4 text-sm font-semibold uppercase tracking-[1.5px]"
                style={{ color: '#000000' }}
              >
                Product
              </Text>
              <View className="gap-3">
                {footerLinks.product.map((link) => (
                  <Text key={link} className="text-sm" style={{ color: '#000000' }}>
                    {link}
                  </Text>
                ))}
              </View>
            </View>

            <View className="flex-1">
              <Text
                className="mb-4 text-sm font-semibold uppercase tracking-[1.5px]"
                style={{ color: '#000000' }}
              >
                Company
              </Text>
              <View className="gap-3">
                {footerLinks.company.map((link) => (
                  <Text key={link} className="text-sm" style={{ color: '#000000' }}>
                    {link}
                  </Text>
                ))}
              </View>
            </View>

            <View className="flex-1">
              <Text
                className="mb-4 text-sm font-semibold uppercase tracking-[1.5px]"
                style={{ color: '#000000' }}
              >
                Legal
              </Text>
              <View className="gap-3">
                {footerLinks.legal.map((link) => (
                  <Text key={link} className="text-sm" style={{ color: '#000000' }}>
                    {link}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View
          className="mt-12 items-center gap-4 border-t pt-8"
          style={{ borderColor: theme.colors.inkOverlay }}
        >
          <Text className="text-sm" style={{ color: '#000000' }}>
            © {new Date().getFullYear()} Siksha. All rights reserved.
          </Text>
          <Pressable
            onPress={onScrollToTop}
            className="h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              borderColor: theme.colors.whiteBorder,
              backgroundColor: theme.colors.whiteSoft,
            }}
          >
            <Text style={{ color: '#000000', fontSize: 16 }}>↑</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
