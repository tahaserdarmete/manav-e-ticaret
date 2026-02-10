import { CartResponse, OrderResponse, Product, URLResponse } from "@/types";

// api adresi
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const userId = process.env.NEXT_PUBLIC_USER_ID;

// sepete ürün ekle
export const addToBasket = async (
  groceryId: string,
  quantity: number,
): URLResponse => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ groceryId, quantity, userId }),
  });

  return res.json();
};

// bir ürünü satın al
export const checkoutSingleItem = async (
  grocery: Product,
  quantity: number,
) => {
  const body = {
    grocery: grocery._id,
    quantity,
    customerInfo: {
      userId,
      name: "Taha Serdar Mete",
      phone: "555 666 77 88",
      deliveryAddress: "İstanbul, Türkiye",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

// sepetteki ürünleri al
export const getBasket = async (): CartResponse => {
  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`);

  return res.json();
};

// sepetteki ürünün miktarını güncelleme fonksiyonu
export const updateQuantity = async (
  groceryId: string,
  newQuantity: number,
) => {
  const res = await fetch(`${BASE_URL}/api/cart/item`, {
    method: "PUT",
    body: JSON.stringify({ userId, groceryId, quantity: newQuantity }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

// sepeti temizleyen fonksiyon
export const clearBasket = async () => {
  const res = await fetch(`${BASE_URL}/api/cart?userId=${userId}`, {
    method: "DELETE",
  });
  return res.json();
};

// bir ürünü sepetten kaldıran fonksiyon
export const removeFromBasket = async (groceryId: string) => {
  const res = await fetch(
    `${BASE_URL}/api/cart/item?userId=${userId}&groceryId=${groceryId}`,
    {
      method: "DELETE",
    },
  );
  return res.json();
};

// sepetteki bütün ürünler için satın alım url oluşturan fonksiyon
export const checkoutBasket = async (): URLResponse => {
  const body = {
    userId,
    customerInfo: {
      userId,
      name: "Taha Serdar Mete",
      phone: "555 666 77 88",
      deliveryAddress: "İstanbul, Turkey",
      isDelivery: true,
    },
  };

  const res = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

// siparişleri getiren fonksiyon
export const getOrders = async (): OrderResponse => {
  const res = await fetch(`${BASE_URL}/api/orders?customer_id=${userId}`);

  return res.json();
};
