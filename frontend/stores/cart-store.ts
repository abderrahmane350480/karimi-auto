"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";
import type { OrderResponse } from "@/lib/api";

export interface CartLineItem {
  lineId: string;
  productId: string;
  slug: string;
  nameAr: string;
  quantity: number;
  bundlePieces: number;
  unitOfferPrice: number;
  totalPrice: number;
  source: "product_page" | "cart_cross_sell" | "upsell" | "cross_sell_addon";
  addToCartEventId: string;
}

export interface PendingCheckout {
  name: string;
  phoneRaw: string;
  phoneE164: string;
  checkoutEventId: string;
  purchaseEventId: string;
}

export interface ConfirmedOrder extends OrderResponse {
  customerName: string;
  phone: string;
}

interface CartState {
  items: CartLineItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isUpsellOpen: boolean;
  pendingCheckout: PendingCheckout | null;
  upsellProduct: Product | null;
  upsellAccepted: boolean;
  confirmedOrder: ConfirmedOrder | null;

  addItem: (item: Omit<CartLineItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  openUpsell: (product: Product, checkout: PendingCheckout) => void;
  acceptUpsell: () => void;
  skipUpsell: () => void;

  setConfirmedOrder: (order: ConfirmedOrder) => void;
  clearConfirmedOrder: () => void;

  getSubtotal: () => number;
  getCartSlugs: () => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      isUpsellOpen: false,
      pendingCheckout: null,
      upsellProduct: null,
      upsellAccepted: false,
      confirmedOrder: null,

      addItem: (item) => {
        const lineId = `${item.slug}-${item.bundlePieces}-${Date.now()}`;
        set((s) => ({ items: [...s.items, { ...item, lineId }] }));
      },

      removeItem: (lineId) =>
        set((s) => ({ items: s.items.filter((i) => i.lineId !== lineId) })),

      clearCart: () =>
        set({ items: [], isCartOpen: false, isCheckoutOpen: false, isUpsellOpen: false, pendingCheckout: null }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      // Cart stays open in background when checkout opens — modal appears on top
      openCheckout: () => set({ isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false, isCartOpen: false }),

      openUpsell: (product, checkout) =>
        set({
          isCheckoutOpen: false,
          isUpsellOpen: true,
          upsellProduct: product,
          upsellAccepted: false,
          pendingCheckout: checkout,
        }),

      acceptUpsell: () => set({ upsellAccepted: true }),

      skipUpsell: () =>
        set({ isUpsellOpen: false, upsellProduct: null, upsellAccepted: false }),

      setConfirmedOrder: (order) => set({ confirmedOrder: order }),

      clearConfirmedOrder: () => set({ confirmedOrder: null }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.totalPrice, 0),

      getCartSlugs: () => Array.from(new Set(get().items.map((i) => i.slug))),
    }),
    {
      name: "ka-cart",
      partialize: (s) => ({
        items: s.items,
        confirmedOrder: s.confirmedOrder,
      }),
    }
  )
);
