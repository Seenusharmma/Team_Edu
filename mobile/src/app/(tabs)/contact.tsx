import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

import { theme } from '@/lib/theme';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log({ name, email, subject, message });
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.pageBackground }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1 px-5 py-8">
        <View className="mb-8">
          <Pressable 
            className="mb-4 flex-row items-center gap-2"
            onPress={() => router.back()}
          >
            <Text className="text-2xl" style={{ color: theme.colors.textPrimary }}>{'<'}</Text>
            <Text className="text-base font-medium" style={{ color: theme.colors.textSecondary }}>Back</Text>
          </Pressable>

          <Text className="text-3xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Contact Us
          </Text>
          <Text className="mt-2 text-base" style={{ color: theme.colors.textSecondary }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </View>

        <View className="gap-5">
          <View>
            <Text className="mb-2 text-sm font-medium" style={{ color: theme.colors.textPrimary }}>
              Full Name
            </Text>
            <TextInput
              className="rounded-xl border px-4 py-4 text-base"
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.whiteBorder,
                color: theme.colors.textPrimary,
              }}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium" style={{ color: theme.colors.textPrimary }}>
              Email Address
            </Text>
            <TextInput
              className="rounded-xl border px-4 py-4 text-base"
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.whiteBorder,
                color: theme.colors.textPrimary,
              }}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium" style={{ color: theme.colors.textPrimary }}>
              Subject
            </Text>
            <TextInput
              className="rounded-xl border px-4 py-4 text-base"
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.whiteBorder,
                color: theme.colors.textPrimary,
              }}
              placeholder="How can we help?"
              placeholderTextColor={theme.colors.textMuted}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium" style={{ color: theme.colors.textPrimary }}>
              Message
            </Text>
            <TextInput
              className="rounded-xl border px-4 py-4 text-base"
              style={{
                backgroundColor: theme.colors.white,
                borderColor: theme.colors.whiteBorder,
                color: theme.colors.textPrimary,
                minHeight: 150,
                textAlignVertical: 'top',
              }}
              placeholder="Write your message here..."
              placeholderTextColor={theme.colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
            />
          </View>

          <Pressable
            className="mt-4 rounded-2xl px-6 py-4"
            style={{
              backgroundColor: theme.colors.accent,
              ...theme.shadows.button,
            }}
            onPress={handleSubmit}
          >
            <Text className="text-center text-base font-semibold text-white">
              Send Message
            </Text>
          </Pressable>
        </View>

        <View className="mt-12 rounded-2xl p-6" style={{ backgroundColor: theme.colors.white }}>
          <Text className="mb-4 text-lg font-semibold" style={{ color: theme.colors.textPrimary }}>
            Get in Touch
          </Text>
          
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: theme.colors.accentSoft }}>
                <Text className="text-lg">📧</Text>
              </View>
              <Text className="text-base" style={{ color: theme.colors.textSecondary }}>support@siksha.com</Text>
            </View>
            
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: theme.colors.accentSoft }}>
                <Text className="text-lg">📱</Text>
              </View>
              <Text className="text-base" style={{ color: theme.colors.textSecondary }}>+91 1234567890</Text>
            </View>
            
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: theme.colors.accentSoft }}>
                <Text className="text-lg">📍</Text>
              </View>
              <Text className="text-base" style={{ color: theme.colors.textSecondary }}>New Delhi, India</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
