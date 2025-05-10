import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {
  Check,
  ChevronDown,
  Plus,
  ShoppingCart,
  Search,
  ArrowUpDown,
} from 'lucide-react-native';
import { mockWeeklyMealPlan } from '@/data/mockData';
import { theme } from '@/constants/theme';
import { ShoppingListItem } from '@/types';

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState(
    mockWeeklyMealPlan.shoppingList
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    produce: true,
    dairy: true,
    meat: true,
    grains: true,
    pantry: true,
    spices: true,
    other: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'category' | 'name'>('category');
  const [customItem, setCustomItem] = useState('');

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleItemPurchased = (itemName: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const addCustomItem = () => {
    if (customItem.trim()) {
      const newItem: ShoppingListItem = {
        name: customItem.trim(),
        quantity: 1,
        unit: '',
        purchased: false,
        category: 'other',
      };

      setShoppingList((prev) => [...prev, newItem]);
      setCustomItem('');
    }
  };

  const filteredItems = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'category') {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const groupedItems = sortedItems.reduce<Record<string, ShoppingListItem[]>>(
    (groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {}
  );

  const allPurchased = shoppingList.every((item) => item.purchased);
  const purchasedCount = shoppingList.filter((item) => item.purchased).length;
  const totalCount = shoppingList.length;
  const progressPercentage =
    totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0;

  const renderCategory = ({ item: category }: { item: string }) => {
    const items = groupedItems[category];
    if (!items || items.length === 0) return null;

    // Get category display name
    const getCategoryName = (cat: string) => {
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryHeader}
          onPress={() => toggleCategory(category)}
        >
          <View style={styles.categoryTitleContainer}>
            <Text style={styles.categoryTitle}>
              {getCategoryName(category)}
            </Text>
            <Text style={styles.itemCount}>{items.length} items</Text>
          </View>
          <ChevronDown
            size={20}
            color={theme.colors.gray[700]}
            style={{
              transform: [
                { rotate: expandedCategories[category] ? '180deg' : '0deg' },
              ],
            }}
          />
        </TouchableOpacity>

        {expandedCategories[category] && (
          <View style={styles.itemsContainer}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={`${item.name}-${index}`}
                style={[styles.itemRow, item.purchased && styles.purchasedItem]}
                onPress={() => toggleItemPurchased(item.name)}
              >
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      item.purchased && styles.checkedCheckbox,
                    ]}
                  >
                    {item.purchased && <Check size={14} color="#fff" />}
                  </View>
                </View>
                <View style={styles.itemDetails}>
                  <Text
                    style={[
                      styles.itemName,
                      item.purchased && styles.purchasedText,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.itemQuantity}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Shopping List</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                setSortBy(sortBy === 'category' ? 'name' : 'category')
              }
            >
              <ArrowUpDown size={18} color={theme.colors.gray[700]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {purchasedCount} of {totalCount} items
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Search
            size={18}
            color={theme.colors.gray[500]}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.gray[500]}
          />
        </View>
      </View>

      <FlatList
        data={Object.keys(groupedItems)}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ShoppingCart size={60} color={theme.colors.gray[300]} />
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        }
        ListFooterComponent={<View style={styles.listFooter} />}
      />

      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.addItemInput}
          placeholder="Add a custom item..."
          value={customItem}
          onChangeText={setCustomItem}
          placeholderTextColor={theme.colors.gray[500]}
          onSubmitEditing={addCustomItem}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addCustomItem}
          disabled={!customItem.trim()}
        >
          <Plus size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl + 20,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    ...theme.shadow.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: theme.colors.gray[900],
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  progressSection: {
    marginTop: theme.spacing.md,
  },
  progressContainer: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
    textAlign: 'right',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[900],
  },
  listContentContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  categoryContainer: {
    marginBottom: theme.spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginRight: theme.spacing.sm,
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[500],
  },
  itemsContainer: {
    marginTop: theme.spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  purchasedItem: {
    opacity: 0.6,
  },
  checkboxContainer: {
    marginRight: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[900],
    marginBottom: 2,
  },
  purchasedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.gray[500],
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.md,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  addItemInput: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.text,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooter: {
    height: 90,
  },
});

export default ShoppingListScreen;
