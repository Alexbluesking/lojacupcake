import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Cupcake } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (cupcake: Cupcake, quantity: number) => void;
  removeItem: (cupcakeId: string) => void;
  updateQuantity: (cupcakeId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (cupcake: Cupcake, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.cupcake.id === cupcake.id);
      if (existing) {
        return prev.map(item =>
          item.cupcake.id === cupcake.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { cupcake, quantity }];
    });
  };

  const removeItem = (cupcakeId: string) => {
    setItems(prev => prev.filter(item => item.cupcake.id !== cupcakeId));
  };

  const updateQuantity = (cupcakeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cupcakeId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.cupcake.id === cupcakeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.cupcake.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
