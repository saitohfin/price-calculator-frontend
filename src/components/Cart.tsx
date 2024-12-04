import React from 'react';
import { Trash2, Lock } from 'lucide-react';
import { CartItem } from '../types';
import { calculateTotal } from '../utils/priceCalculator';
import { sortCartItems } from '../utils/sorting';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemoveItem }) => {
  const sortedItems = sortCartItems(items);
  const total = calculateTotal(sortedItems);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {sortedItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {sortedItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="flex items-center gap-4 p-2 rounded hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-2">
                      {item.name}
                      {item.excludeFromDiscounts && (
                        <Lock className="h-3 w-3 text-gray-400" />
                      )}
                    </span>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600">{item.price.toFixed(2)}€</span>
                      {item.appliedDiscount > 0 && (
                        <span className="ml-2 text-green-600">
                          (-{((item.appliedDiscount / item.price) * 100).toFixed(0)}%)
                        </span>
                      )}
                    </div>
                    {item.appliedDiscount > 0 && (
                      <span className="text-green-600 font-medium">
                        {(item.price - item.appliedDiscount).toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};