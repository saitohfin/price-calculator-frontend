import { CartItem } from '../types';

export const sortCartItemsForView = (items: CartItem[]): CartItem[] => {
  // First, separate discountable and non-discountable items
  const discountableItems = items.filter(item => !item.excludeFromDiscounts);
  const nonDiscountableItems = items.filter(item => item.excludeFromDiscounts);

  // Sort discountable items by name first, then by price (descending)
  const sortedDiscountable = [...discountableItems].sort((a, b) => {
    // First compare by name
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    // If names are equal, sort by price in descending order
    return b.price - a.price;
  });
  
  // Sort non-discountable items by name first, then by price (descending)
  const sortedNonDiscountable = [...nonDiscountableItems].sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return b.price - a.price;
  });

  // Return combined sorted arrays
  return [...sortedDiscountable, ...sortedNonDiscountable];
};

export const sortCartItemsByPrice = (items: CartItem[]): CartItem[] => {
  return items.sort((a, b) => {
    if (a.discount && !b.discount) {
      return -1;
    } else if (!a.discount && b.discount) {
      return 1;
    } else {
      return a.price - b.price;
    }
  });
};