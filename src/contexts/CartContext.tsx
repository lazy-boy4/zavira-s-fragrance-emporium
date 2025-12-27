import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

/**
 * Cart Context - Secure cart state management
 * 
 * Features:
 * - Persistent state via localStorage
 * - Type-safe actions with reducer pattern
 * - Maximum quantity limits for security
 * - Price validation (prices should come from backend)
 */

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean };

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "zavira_cart";
const MAX_QUANTITY_PER_ITEM = 10;
const MAX_ITEMS_IN_CART = 20;
const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 15;
const TAX_RATE = 0.08;

// Validate cart item structure for security
const isValidCartItem = (item: unknown): item is CartItem => {
  if (typeof item !== "object" || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.price === "number" &&
    obj.price >= 0 &&
    obj.price <= 10000 && // Maximum reasonable price
    typeof obj.quantity === "number" &&
    obj.quantity >= 1 &&
    obj.quantity <= MAX_QUANTITY_PER_ITEM
  );
};

// Safely load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    
    // Validate each item
    return parsed.filter(isValidCartItem).slice(0, MAX_ITEMS_IN_CART);
  } catch {
    // Clear corrupted data
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

// Safely save cart to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage might be full or disabled
    console.warn("Failed to save cart to localStorage");
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload, isLoading: false };
      
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // Update quantity of existing item
        const newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_ITEM) }
            : item
        );
        return { ...state, items: newItems };
      }
      
      // Add new item (with quantity limit check)
      if (state.items.length >= MAX_ITEMS_IN_CART) {
        return state;
      }
      
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const validQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY_PER_ITEM));
      
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: validQuantity } : item
      );
      return { ...state, items: newItems };
    }
    
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
      
    case "CLEAR_CART":
      return { ...state, items: [] };
      
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
      
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isLoading: true });

  // Load cart from storage on mount
  useEffect(() => {
    const items = loadCartFromStorage();
    dispatch({ type: "SET_ITEMS", payload: items });
  }, []);

  // Save cart to storage when items change
  useEffect(() => {
    if (!state.isLoading) {
      saveCartToStorage(state.items);
    }
  }, [state.items, state.isLoading]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getItemCount = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const getSubtotal = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal();
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [getSubtotal]);

  const getTax = useCallback(() => {
    return getSubtotal() * TAX_RATE;
  }, [getSubtotal]);

  const getTotal = useCallback(() => {
    return getSubtotal() + getShipping() + getTax();
  }, [getSubtotal, getShipping, getTax]);

  const value: CartContextType = {
    items: state.items,
    isLoading: state.isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
