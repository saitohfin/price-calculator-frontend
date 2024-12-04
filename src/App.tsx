import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { ButtonGrid } from './components/ButtonGrid';
import { Cart } from './components/Cart';
import { Item, CartItem } from './types';
import { calculateDiscounts } from './utils/priceCalculator';
import { sortCartItems } from './utils/sorting';

const AVAILABLE_ITEMS: Item[] = [
  { id: '1', name: 'Accesorios', price: 18.99, discount: 40 },
  { id: '2', name: 'Conjunto', price: 14.99, discount: 40 },
  { id: '3', name: 'Collar', price: 12.99, discount: 40 },
  { id: '4', name: 'Pulsera', price: 9.99, discount: 40 },
  { id: '5', name: 'Collar', price: 9.99, discount: 40 },
  { id: '6', name: 'Anillo', price: 9.99, discount: 40 },
  { id: '7', name: 'Pulsera', price: 12.99, discount: 40 },
  { id: '8', name: 'Pulsera', price: 6.99, discount: 40 },
  { id: '9', name: 'Anillo', price: 6.99, discount: 40 },
  { id: '10', name: 'Anillo', price: 4.99, discount: 40 },
  { id: '11', name: 'Pendiente', price: 4.99, discount: 40 },
  { id: '12', name: 'Pendiente', price: 6.99, discount: 40 },
  { id: '13', name: 'Pendiente', price: 9.99, discount: 40 },
  { 
    id: '14',
    name: 'Gastos de envío', 
    price: 3.99, 
    excludeFromDiscounts: true 
  },
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddItem = (item: Item) => {
    const newItems = [...cartItems, { ...item, appliedDiscount: 0 }];
    const sortedAndDiscounted = calculateDiscounts(sortCartItems(newItems));
    setCartItems(sortedAndDiscounted);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    const sortedAndDiscounted = calculateDiscounts(sortCartItems(newItems));
    setCartItems(sortedAndDiscounted);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-2">
            <Tag className="h-8 w-8" />
            <h1>Price Calculator</h1>
          </div>
          <p className="text-gray-600">Select items to calculate total with pair discounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <ButtonGrid 
              items={AVAILABLE_ITEMS}
              onItemClick={handleAddItem}
            />
          </div>
          <div className="md:col-span-1">
            <Cart 
              items={cartItems} 
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;