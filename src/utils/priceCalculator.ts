import { CartItem } from '../types';
import { sortCartItems } from './sorting';

export const calculateDiscounts = (items: CartItem[]): CartItem[] => {
  // Sort all items first
  const sortedItems = sortCartItems(items);
  
  // Filter out items that should be excluded from discount calculations
  const discountableItems = sortedItems.filter(item => !item.excludeFromDiscounts);
  const nonDiscountableItems = sortedItems.filter(item => item.excludeFromDiscounts);
  
  // Calculate how many items should receive discounts (half rounded down)
  const discountCount = Math.floor(discountableItems.length / 2);
  
  // Apply discounts to the lowest-priced items
  const itemsWithDiscounts = discountableItems.map((item, index) => ({
    ...item,
    appliedDiscount: index < discountCount 
      ? (item.price * (item.discount || 0)) / 100 
      : 0
  }));
  
  // Add back the non-discountable items with no discounts applied
  return [...itemsWithDiscounts, ...nonDiscountableItems.map(item => ({ 
    ...item, 
    appliedDiscount: 0 
  }))];
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price - item.appliedDiscount), 0);
};