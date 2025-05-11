import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="user-details" />
      <Stack.Screen name="health-goals" />
      <Stack.Screen name="diet-preferences" />
    </Stack>
  );
}
