import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  ScrollView,
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

  const handleBack = () => {
    router.replace('/');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
        {/* Add padding at the bottom to ensure content isn't covered by buttons */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={handleBack}
        >
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            isSaving && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={isSaving}
        >
          <Text style={styles.buttonText}>
            {isSaving ? 'Saving...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100, // Add extra padding at bottom for the navigation buttons
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: theme.colors.card,
  },
  genderButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '22',
  },
  genderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
  },
  genderTextActive: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderMin: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.text,
    marginRight: 8,
  },
  sliderMax: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.text,
    marginLeft: 8,
  },
  sliderValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  heightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heightInput: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    width: 60,
    textAlign: 'center',
  },
  heightUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    marginHorizontal: 8,
  },
  weightInput: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.text,
    width: '100%',
    textAlign: 'center',
  },
  activityButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: 12,
    marginBottom: 8,
  },
  activityButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '22',
  },
  activityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.text,
  },
  activityTextActive: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  bottomPadding: {
    height: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    padding: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  backButton: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  backButtonText: {
    color: theme.colors.text,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
});
