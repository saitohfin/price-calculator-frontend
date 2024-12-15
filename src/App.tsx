import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { ButtonGrid } from './components/ButtonGrid';
import { Cart } from './components/Cart';
import { Item, CartItem } from './types';
import { calculateDiscountsForPairItems, calculateDiscountsForSecondItem } from './utils/priceCalculator';
import { sortCartItemsByDiscount, sortCartItemsForView } from './utils/sorting';
import { AVAILABLE_ITEMS } from './config/itemsConfig';
import { PDFGenerator } from './utils/pdfGenerator'; // Add this import

const TYPE_DISCOUNT:String = "SECOND_ITEM_DISCOUNT";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>('');
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);

  const handleAddItem = (item: Item) => {
    const newItems = [...cartItems, { ...item, appliedDiscount: 0 }];
    let sortedAndDiscounted: CartItem[];
  
    if (TYPE_DISCOUNT === "SECOND_ITEM_DISCOUNT") {
      sortedAndDiscounted = calculateDiscountsForSecondItem(sortCartItemsForView(newItems));
    } else {
      sortedAndDiscounted = calculateDiscountsForPairItems(sortCartItemsByDiscount(newItems));
    }
  
    setCartItems(sortedAndDiscounted);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    let sortedAndDiscounted: CartItem[];
  
    if (TYPE_DISCOUNT === "SECOND_ITEM_DISCOUNT") {
      sortedAndDiscounted = calculateDiscountsForSecondItem(sortCartItemsForView(newItems));
    } else {
      sortedAndDiscounted = calculateDiscountsForPairItems(sortCartItemsByDiscount(newItems));
    }
  
    setCartItems(sortedAndDiscounted);
  };

  const handleSaveName = () => {
    if (!name.trim()) {
      setIsNameEmpty(true);
      return;
    }

    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    PDFGenerator.generatePDF(name, cartItems);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-2">
            <Tag className="h-8 w-8" />
            <h1>Luna Ambar Calculator</h1>
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
              onClearCart={() => {
                setCartItems([]);
                setName('');
                setIsNameEmpty(false);
              }}
            />
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) {
                    setIsNameEmpty(false);
                  }
                }}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isNameEmpty ? 'border-red-500' : ''}`}
              />
              {isNameEmpty && <p className="text-red-500 text-xs italic">Por favor, introduce un nombre.</p>}
              <button
                onClick={handleSaveName}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;