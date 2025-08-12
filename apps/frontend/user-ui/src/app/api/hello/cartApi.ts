import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_CART_API_LINK; // e.g. 'https://api.example.com'
const PRODUCT_API = process.env.NEXT_PUBLIC_PRODUCT_FETCH_LINK;

interface ProductDetails {
  productId: string;
  listingId: string;
  sellerId: string;
  [key: string]: any;
}

// Fetch full product details from backend by product ID
const fetchFullProductDetails = async (productId: string): Promise<ProductDetails> => {
  const res = await fetch(`${PRODUCT_API}/products/${encodeURIComponent(productId)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product details for ID: ${productId}`);
  }

  const json = await res.json();
  return json.data;
};

export const addToCart = async (
  userId: string,
  product: {
    productId: string;
    listingId?: string;
    sellerId?: string;
    [key: string]: any;
  },
  quantity: number
) => {
  let { productId, listingId, sellerId } = product;

  // If listingId or sellerId is missing, fetch complete product details
  if (!listingId || !sellerId) {
    console.warn('🔎 Missing listingId or sellerId. Fetching full product details...');
    const fullDetails = await fetchFullProductDetails(productId);
    listingId = fullDetails.listingId;
    sellerId = fullDetails.sellerId;

    if (!listingId || !sellerId) {
      throw new Error('Failed to retrieve listingId or sellerId from product details.');
    }
  }

  const item = {
    productId,
    listingId,
    sellerId,
    quantity,
  };

  console.log('🛒 addToCart -> payload:', item);

  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated.');

  const response = await axios.post(
    `${API_BASE}/api/cart/add`,
    { userId, item },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const getCart = async (userId: string) => {
  const response = await axios.get(`${API_BASE}/cart/${userId}`);
  return response.data;
};

export const removeFromCart = async (userId: string, itemId: string) => {
  const response = await axios.delete(`${API_BASE}/cart/${userId}/item/${itemId}`);
  return response.data;
};

export const checkoutCart = async (userId: string) => {
  const response = await axios.post(`${API_BASE}/cart/${userId}/checkout`);
  return response.data;
};
