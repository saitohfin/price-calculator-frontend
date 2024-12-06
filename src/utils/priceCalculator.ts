import { CartItem } from '../types';
import { sortCartItemsByPrice } from './sorting';

export const calculateDiscounts = (items: CartItem[]): CartItem[] => {
  // Filtrar los artículos que deben excluirse de los cálculos de descuento
  const discountableItems = items.filter(item => !item.excludeFromDiscounts);
  const nonDiscountableItems = items.filter(item => item.excludeFromDiscounts);
  
  // Aplicar descuentos a cada par de artículos
  const itemsWithDiscounts = discountableItems.map((item, index) => ({
    ...item,
    appliedDiscount: (index % 2 === 0 && index + 1 < discountableItems.length) 
      ? (item.price * (item.discount || 0)) / 100 
      : 0
  }));

  // Aplicar descuentos al segundo artículo del par
  for (let i = 1; i < itemsWithDiscounts.length; i += 2) {
    itemsWithDiscounts[i].appliedDiscount = (itemsWithDiscounts[i].price * (itemsWithDiscounts[i].discount || 0)) / 100;
  }
  
  // Agregar de nuevo los artículos no descontables sin descuentos aplicados
  return [...itemsWithDiscounts, ...nonDiscountableItems.map(item => ({ 
    ...item, 
    appliedDiscount: 0 
  }))];
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price - item.appliedDiscount), 0);
};