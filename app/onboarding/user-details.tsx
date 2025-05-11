import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import NativeSlider from '@react-native-community/slider';
import { useUserData, ActivityLevel } from '@/hooks/useUserData';

// Web-compatible slider component
function WebSlider({
  style,
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step,
}: {
  style?: any;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step: number;
}) {
  return (
    <input
      type="range"
      style={{
        ...style,
        width: '100%',
        height: 40,
        accentColor: theme.colors.primary,
      }}
      value={value}
      min={minimumValue}
      max={maximumValue}
      step={step}
      onChange={(e) => onValueChange(Number(e.target.value))}
    />
  );
}

const Slider = Platform.OS === 'web' ? WebSlider : NativeSlider;

const activityLevels: { label: string; value: ActivityLevel }[] = [
  { label: 'sedentary - little to no exercise', value: 'sedentary' },
  { label: 'lightly active - 1-3 days/week', value: 'lightly_active' },
  { label: 'moderately active - 3-5 days/week', value: 'moderately_active' },
  { label: 'very active - 6-7 days/week', value: 'very_active' },
  {
    label: 'extra active - very hard exercise & physical job',
    value: 'extra_active',
  },
];

export default function UserDetails() {
  const router = useRouter();
  const { userData, updateUserData, isLoading } = useUserData();

  const [gender, setGender] = useState<'male' | 'female'>(
    userData?.gender || 'female'
  );
  const [age, setAge] = useState(userData?.age || 27);
  const [heightFt, setHeightFt] = useState(userData?.heightFt || '5');
  const [heightIn, setHeightIn] = useState(userData?.heightIn || '2');
  const [weight, setWeight] = useState(userData?.weight || '109');
  const [activity, setActivity] = useState<ActivityLevel>(
    userData?.activity || 'sedentary'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = async () => {
    setIsSaving(true);
    try {
      await updateUserData({
        gender,
        age,
        heightFt,
        heightIn,
        weight,
        activity,
      });
      router.push('/onboarding/health-goals');
    } catch (error) {
      console.error('Error saving user details:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LETS FIND OUT YOUR DAILY CALORIES</Text>
      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('male')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'male' && styles.genderTextActive,
            ]}
          >
            MALE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.genderButtonActive,
          ]}
          onPress={() => setGender('female')}
        >
          <Text
            style={[
              styles.genderText,
              gender === 'female' && styles.genderTextActive,
            ]}
          >
            FEMALE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderMin}>0</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={110}
            step={1}
            value={age}
            onValueChange={setAge}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
          <Text style={styles.sliderMax}>110</Text>
        </View>
        <Text style={styles.sliderValue}>{age}</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height</Text>
        <View style={styles.heightRow}>
          <TextInput
            style={styles.heightInput}
            keyboardType="numeric"
            value={heightFt}
            onChangeText={setHeightFt}
            maxLength={1}
          />
          <Text style={styles.heightUnit}>ft</Text>
          <TextInput
            style={styles.heightInput}
            keyboardType="numeric"
            value={heightIn}
            onChangeText={setHeightIn}
            maxLength={2}
          />
          <Text style={styles.heightUnit}>in</Text>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.weightInput}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity Level</Text>
        {activityLevels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.activityButton,
              activity === level.value && styles.activityButtonActive,
            ]}
            onPress={() => setActivity(level.value as ActivityLevel)}
          >
            <Text
              style={[
                styles.activityText,
                activity === level.value && styles.activityTextActive,
              ]}
            >
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.nextButton, isSaving && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={isSaving}
      >
        <Text style={styles.nextButtonText}>
          {isSaving ? 'Saving...' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 60,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  genderButtonActive: {
    backgroundColor: theme.colors.secondary + '22',
    borderColor: theme.colors.secondary,
  },
  genderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  genderTextActive: {
    color: theme.colors.secondary,
    fontFamily: 'Inter-Bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  sliderMin: {
    fontSize: 13,
    color: theme.colors.text,
  },
  sliderMax: {
    fontSize: 13,
    color: theme.colors.text,
  },
  sliderValue: {
    alignSelf: 'center',
    fontSize: 15,
    color: theme.colors.text,
    marginTop: 4,
  },
  heightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heightInput: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  heightUnit: {
    fontSize: 16,
    color: theme.colors.text,
    marginHorizontal: 2,
  },
  weightInput: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
  },
  activityButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  activityButtonActive: {
    backgroundColor: theme.colors.secondary + '22',
    borderColor: theme.colors.secondary,
  },
  activityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: theme.colors.text,
    textAlign: 'center',
  },
  activityTextActive: {
    color: theme.colors.secondary,
    fontFamily: 'Inter-Bold',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  nextButtonText: {
    color: theme.colors.card,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
});
