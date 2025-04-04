import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    // totalPrice: number;
}

export const useCartStore = create<CartStore>()(
    persist((set) => ({
        items: [],
        addItem: (item) => 
            set((state) => {
                const existing = state.items.find((i) => i.id === item.id);

                if (existing) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    };
                }

                return { items: [...state.items, item] };
            }),
            removeItem: (id) => set((state) => {
                return { items: state.items.map((items) => items.id === id ? { ...items, quantity: items.quantity - 1 } : items).filter((item) => item.quantity > 0) }; 
            }),
            clearCart: () => 
                set(() => {
                return { items: [] };
            }),
    }), {name: "cart"} // name of the item in the storage (must be unique)
));
