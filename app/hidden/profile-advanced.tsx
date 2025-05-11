import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import {
  ChevronRight,
  Settings,
  Heart,
  Medal,
  LogOut,
  Save,
  Calculator,
  Edit2,
} from 'lucide-react-native';
import { mockUserProfile } from '@/data/mockData';
import { theme } from '@/constants/theme';
import {
  UserProfile,
  DietaryPreference,
  ActivityLevel,
  HealthGoal,
} from '@/types';
import { calculateMacroTargets } from '@/utils/mealPlanUtils';

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    ...mockUserProfile,
  });
  const [editingDietary, setEditingDietary] = useState(false);

  const dietaryOptions: DietaryPreference[] = [
    'vegetarian',
    'vegan',
    'pescatarian',
    'keto',
    'paleo',
    'gluten-free',
    'dairy-free',
    'low-carb',
    'high-protein',
    'balanced',
  ];

  const activityOptions: { label: string; value: ActivityLevel }[] = [
    { label: 'Sedentary (office job, little exercise)', value: 'sedentary' },
    {
      label: 'Lightly Active (light exercise 1-3 days/week)',
      value: 'lightly_active',
    },
    {
      label: 'Moderately Active (moderate exercise 3-5 days/week)',
      value: 'moderately_active',
    },
    {
      label: 'Very Active (hard exercise 6-7 days/week)',
      value: 'very_active',
    },
    {
      label: 'Extremely Active (physical job & hard exercise)',
      value: 'extremely_active',
    },
  ];

  const healthGoalOptions: { label: string; value: HealthGoal }[] = [
    { label: 'Lose Weight', value: 'lose_weight' },
    { label: 'Maintain Weight', value: 'maintain_weight' },
    { label: 'Build Muscle', value: 'build_muscle' },
    { label: 'Improve Health', value: 'improve_health' },
  ];

  const handleDietaryToggle = (preference: DietaryPreference) => {
    const preferences = [...editedProfile.dietaryPreferences];
    const index = preferences.indexOf(preference);

    if (index >= 0) {
      preferences.splice(index, 1);
    } else {
      preferences.push(preference);
    }

    setEditedProfile({
      ...editedProfile,
      dietaryPreferences: preferences,
    });
  };

  const getActivityLabel = (value: ActivityLevel) => {
    return (
      activityOptions.find((option) => option.value === value)?.label || ''
    );
  };

  const getHealthGoalLabel = (value: HealthGoal) => {
    return (
      healthGoalOptions.find((option) => option.value === value)?.label || ''
    );
  };

  const handleSaveProfile = () => {
    // Recalculate macro targets
    const { targetProtein, targetCarbs, targetFat } =
      calculateMacroTargets(editedProfile);

    const updatedProfile = {
      ...editedProfile,
      targetProtein,
      targetCarbs,
      targetFat,
    };

    setUserProfile(updatedProfile);
    setIsEditing(false);
    setEditingDietary(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({ ...userProfile });
    setIsEditing(false);
    setEditingDietary(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Edit2 size={18} color={theme.colors.primary[600]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.iconButton, styles.cancelButton]}
              onPress={handleCancelEdit}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.saveButton]}
              onPress={handleSaveProfile}
            >
              <Save size={16} color="#fff" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoSection}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>{userProfile.name.charAt(0)}</Text>
          </View>
          <View style={styles.userDetails}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={editedProfile.name}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, name: text })
                }
                placeholder="Your Name"
              />
            ) : (
              <Text style={styles.userName}>{userProfile.name}</Text>
            )}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {userProfile.targetCalories}
                </Text>
                <Text style={styles.statLabel}>Target Calories</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.weight} kg</Text>
                <Text style={styles.statLabel}>Current Weight</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userProfile.height} cm</Text>
                <Text style={styles.statLabel}>Height</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Nutrition Goals</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Daily Calories</Text>
              {isEditing ? (
                <TextInput
                  style={styles.numberInput}
                  value={editedProfile.targetCalories.toString()}
                  onChangeText={(text) =>
                    setEditedProfile({
                      ...editedProfile,
                      targetCalories: parseInt(text) || 0,
                    })
                  }
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>
                  {userProfile.targetCalories} kcal
                </Text>
              )}
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Protein</Text>
              <Text style={styles.infoValue}>
                {userProfile.targetProtein}g (
                {Math.round(
                  ((userProfile.targetProtein * 4) /
                    userProfile.targetCalories) *
                    100
                )}
                %)
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Carbs</Text>
              <Text style={styles.infoValue}>
                {userProfile.targetCarbs}g (
                {Math.round(
                  ((userProfile.targetCarbs * 4) / userProfile.targetCalories) *
                    100
                )}
                %)
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fat</Text>
              <Text style={styles.infoValue}>
                {userProfile.targetFat}g (
                {Math.round(
                  ((userProfile.targetFat * 9) / userProfile.targetCalories) *
                    100
                )}
                %)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          <View style={styles.infoCard}>
            {isEditing ? (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={editedProfile.age.toString()}
                    onChangeText={(text) =>
                      setEditedProfile({
                        ...editedProfile,
                        age: parseInt(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Current Weight (kg)</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={editedProfile.weight.toString()}
                    onChangeText={(text) =>
                      setEditedProfile({
                        ...editedProfile,
                        weight: parseInt(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Goal Weight (kg)</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={editedProfile.goalWeight?.toString() || ''}
                    onChangeText={(text) =>
                      setEditedProfile({
                        ...editedProfile,
                        goalWeight: parseInt(text) || undefined,
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Height (cm)</Text>
                  <TextInput
                    style={styles.numberInput}
                    value={editedProfile.height.toString()}
                    onChangeText={(text) =>
                      setEditedProfile({
                        ...editedProfile,
                        height: parseInt(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.pickerRow}>
                  <Text style={styles.infoLabel}>Activity Level</Text>
                  <View style={styles.picker}>
                    {activityOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.pickerOption,
                          editedProfile.activityLevel === option.value &&
                            styles.pickerOptionSelected,
                        ]}
                        onPress={() =>
                          setEditedProfile({
                            ...editedProfile,
                            activityLevel: option.value,
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            editedProfile.activityLevel === option.value &&
                              styles.pickerOptionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.pickerRow}>
                  <Text style={styles.infoLabel}>Health Goal</Text>
                  <View style={styles.picker}>
                    {healthGoalOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.pickerOption,
                          editedProfile.healthGoal === option.value &&
                            styles.pickerOptionSelected,
                        ]}
                        onPress={() =>
                          setEditedProfile({
                            ...editedProfile,
                            healthGoal: option.value,
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.pickerOptionText,
                            editedProfile.healthGoal === option.value &&
                              styles.pickerOptionTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoValue}>{userProfile.age}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoValue}>
                    {userProfile.gender.charAt(0).toUpperCase() +
                      userProfile.gender.slice(1)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Current Weight</Text>
                  <Text style={styles.infoValue}>{userProfile.weight} kg</Text>
                </View>
                {userProfile.goalWeight && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Goal Weight</Text>
                    <Text style={styles.infoValue}>
                      {userProfile.goalWeight} kg
                    </Text>
                  </View>
                )}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoValue}>{userProfile.height} cm</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Activity Level</Text>
                  <Text style={styles.infoValue}>
                    {getActivityLabel(userProfile.activityLevel)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Health Goal</Text>
                  <Text style={styles.infoValue}>
                    {getHealthGoalLabel(userProfile.healthGoal)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>
            {isEditing && !editingDietary && (
              <TouchableOpacity onPress={() => setEditingDietary(true)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          {editingDietary ? (
            <View style={styles.dietaryOptions}>
              {dietaryOptions.map((preference) => (
                <TouchableOpacity
                  key={preference}
                  style={[
                    styles.dietaryOption,
                    editedProfile.dietaryPreferences.includes(preference) &&
                      styles.selectedDietaryOption,
                  ]}
                  onPress={() => handleDietaryToggle(preference)}
                >
                  <Text
                    style={[
                      styles.dietaryOptionText,
                      editedProfile.dietaryPreferences.includes(preference) &&
                        styles.selectedDietaryOptionText,
                    ]}
                  >
                    {preference.charAt(0).toUpperCase() +
                      preference.slice(1).replace('-', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setEditingDietary(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.tagContainer}>
              {userProfile.dietaryPreferences.map((preference) => (
                <View key={preference} style={styles.tag}>
                  <Text style={styles.tagText}>
                    {preference.charAt(0).toUpperCase() +
                      preference.slice(1).replace('-', ' ')}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Allergies</Text>
          <View style={styles.infoCard}>
            {isEditing ? (
              <View style={styles.allergiesInput}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter allergies separated by commas"
                  value={editedProfile.allergies.join(', ')}
                  onChangeText={(text) =>
                    setEditedProfile({
                      ...editedProfile,
                      allergies: text
                        .split(',')
                        .map((item) => item.trim())
                        .filter((item) => item),
                    })
                  }
                />
              </View>
            ) : (
              <View style={styles.tagContainer}>
                {userProfile.allergies.length > 0 ? (
                  userProfile.allergies.map((allergy) => (
                    <View key={allergy} style={[styles.tag, styles.allergyTag]}>
                      <Text style={[styles.tagText, styles.allergyTagText]}>
                        {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noAllergiesText}>
                    No allergies specified
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View
                style={[styles.settingsIcon, { backgroundColor: '#E1F5FE' }]}
              >
                <Settings size={20} color="#039BE5" />
              </View>
              <Text style={styles.settingsText}>App Settings</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View
                style={[styles.settingsIcon, { backgroundColor: '#FFF3E0' }]}
              >
                <Heart size={20} color="#FB8C00" />
              </View>
              <Text style={styles.settingsText}>Saved Recipes</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View
                style={[styles.settingsIcon, { backgroundColor: '#E8F5E9' }]}
              >
                <Medal size={20} color="#43A047" />
              </View>
              <Text style={styles.settingsText}>Progress & Achievements</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View
                style={[styles.settingsIcon, { backgroundColor: '#F3E5F5' }]}
              >
                <Calculator size={20} color="#8E24AA" />
              </View>
              <Text style={styles.settingsText}>Calorie Calculator</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingsItem, styles.logoutItem]}>
            <View style={styles.settingsItemLeft}>
              <View
                style={[styles.settingsIcon, { backgroundColor: '#FFEBEE' }]}
              >
                <LogOut size={20} color="#E53935" />
              </View>
              <Text style={[styles.settingsText, styles.logoutText]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl + 20,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.typography.heading2.fontSize,
    color: theme.colors.text,
  },
  editButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editActions: {
    flexDirection: 'row',
  },
  iconButton: {
    height: 36,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  saveButton: {
    backgroundColor: theme.colors.primary[500],
    marginLeft: theme.spacing.sm,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  cancelButton: {
    backgroundColor: theme.colors.gray[100],
  },
  cancelButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  scrollView: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    flexDirection: 'row',
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: theme.colors.primary[600],
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
  },
  nameInput: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary[300],
    paddingBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.gray[200],
  },
  sectionContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
  },
  editText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.primary[600],
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  infoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  numberInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[900],
    textAlign: 'right',
    minWidth: 80,
    padding: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.sm,
  },
  textInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[900],
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.sm,
  },
  allergiesInput: {
    paddingVertical: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.primary[700],
  },
  allergyTag: {
    backgroundColor: '#FFEBEE',
  },
  allergyTagText: {
    color: '#E53935',
  },
  noAllergiesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
    fontStyle: 'italic',
  },
  settingsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  settingsText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.text,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#E53935',
  },
  dietaryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[100],
    marginRight: 8,
    marginBottom: 8,
  },
  selectedDietaryOption: {
    backgroundColor: theme.colors.primary[100],
  },
  dietaryOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  selectedDietaryOptionText: {
    color: theme.colors.primary[700],
    fontFamily: 'Inter-SemiBold',
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary[500],
    marginTop: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  pickerRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  picker: {
    marginTop: 8,
  },
  pickerOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[100],
    marginBottom: 4,
  },
  pickerOptionSelected: {
    backgroundColor: theme.colors.primary[100],
  },
  pickerOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  pickerOptionTextSelected: {
    color: theme.colors.primary[700],
    fontFamily: 'Inter-SemiBold',
  },
  spacer: {
    height: 90,
  },
});

export default Profile;
