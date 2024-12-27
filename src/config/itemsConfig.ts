import { Item } from '../types';

const itemsWithoutId: Omit<Item, 'id'>[] = [
  { name: 'Accesorios', price: 18.99, discount: 40 },
  { name: 'Conjunto', price: 14.99, discount: 40 },
  { name: 'Collar', price: 12.99, discount: 40 },
  { name: 'Pulsera', price: 9.99, discount: 40 },
  { name: 'Collar', price: 9.99, discount: 40 },
  { name: 'Anillo', price: 9.99, discount: 40 },
  { name: 'Pulsera', price: 12.99, discount: 40 },
  { name: 'Pulsera', price: 6.99, discount: 40 },
  { name: 'Pulsera', price: 14.99, discount: 40 },
  { name: 'Anillo', price: 6.99, discount: 40 },
  { name: 'Anillo', price: 4.99, discount: 40 },
  { name: 'Pendiente', price: 4.99, discount: 40 },
  { name: 'Pendiente', price: 6.99, discount: 40 },
  { name: 'Pendiente', price: 9.99, discount: 40 },
  { name: 'Pendiente', price: 12.99, discount: 40 },
  { name: 'Collar', price: 25.99, discount: 40 },
  { name: 'Collar', price: 14.99, discount: 40 },
  { name: 'Collar', price: 22.99, discount: 40 },
  { 
    name: 'Gastos de envío', 
    price: 3.99, 
    excludeFromDiscounts: true 
  },
];

export const AVAILABLE_ITEMS: Item[] = itemsWithoutId.map((item, index) => ({
  ...item,
  id: (index + 1).toString(),
}));