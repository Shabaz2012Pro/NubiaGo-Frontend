import { supabase, handleSupabaseError, USE_MOCK_DATA } from './supabaseClient';
import mockData from '../mockData';

const { mockProducts, mockCategories } = mockData;
import { Product, Category } from '../types';

// Products API
export const productsApi = {
  // Search products with filters
  searchProducts: async (query = '', filters = {}): Promise<{ products: Product[], total: number }> => {
    try {
      if (USE_MOCK_DATA) {
        // Filter mock data based on query and filters
        let filteredProducts = [...mockProducts];

        if (query) {
          const searchLower = query.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchLower) || 
            product.description.toLowerCase().includes(searchLower) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }

        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }

        if (filters.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);
        }

        if (filters.rating !== undefined) {
          filteredProducts = filteredProducts.filter(product => product.rating >= filters.rating);
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return { products: filteredProducts, total: filteredProducts.length };
      }

      // Real implementation with Supabase
      let queryBuilder = supabase
        .from('products')
        .select('*, supplier:suppliers(*)', { count: 'exact' });

      // Apply search query
      if (query) {
        queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`);
      }

      // Apply filters
      if (filters.category) {
        queryBuilder = queryBuilder.eq('category', filters.category);
      }

      if (filters.minPrice !== undefined) {
        queryBuilder = queryBuilder.gte('price', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        queryBuilder = queryBuilder.lte('price', filters.maxPrice);
      }

      if (filters.rating !== undefined) {
        queryBuilder = queryBuilder.gte('rating', filters.rating);
      }

      if (filters.inStock !== undefined) {
        queryBuilder = queryBuilder.eq('in_stock', filters.inStock);
      }

      // Apply pagination
      if (filters.page !== undefined && filters.limit !== undefined) {
        const from = (filters.page - 1) * filters.limit;
        const to = from + filters.limit - 1;
        queryBuilder = queryBuilder.range(from, to);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_low':
            queryBuilder = queryBuilder.order('price', { ascending: true });
            break;
          case 'price_high':
            queryBuilder = queryBuilder.order('price', { ascending: false });
            break;
          case 'rating':
            queryBuilder = queryBuilder.order('rating', { ascending: false });
            break;
          case 'newest':
            queryBuilder = queryBuilder.order('created_at', { ascending: false });
            break;
          default:
            // Default sorting by relevance (handled by search)
            break;
        }
      }

      const { data, error, count } = await queryBuilder;

      if (error) throw error;

      return { 
        products: data as unknown as Product[], 
        total: count || data.length 
      };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      if (USE_MOCK_DATA) {
        // Find product in mock data
        const product = mockProducts.find(p => p.id === id);

        if (!product) {
          return null;
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return product;
      }

      // Real implementation with Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*, supplier:suppliers(*)')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data as unknown as Product;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      if (USE_MOCK_DATA) {
        // Filter featured products from mock data
        const featuredProducts = mockProducts.filter(p => p.isFeatured);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return featuredProducts;
      }

      // Real implementation with Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*, supplier:suppliers(*)')
        .eq('is_featured', true)
        .limit(8);

      if (error) throw error;

      return data as unknown as Product[];
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get product reviews
  getProductReviews: async (productId: string, page = 1, limit = 10) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock reviews data
        const mockReviews = [
          {
            id: '1',
            productId,
            userId: 'user-1',
            userName: 'John Doe',
            rating: 5,
            title: 'Excellent product!',
            comment: 'This is exactly what I was looking for. Great quality and fast shipping.',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            helpful: 12,
            images: []
          },
          {
            id: '2',
            productId,
            userId: 'user-2',
            userName: 'Jane Smith',
            rating: 4,
            title: 'Good but could be better',
            comment: 'The product is good overall, but there are a few minor issues.',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            helpful: 5,
            images: []
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return {
          reviews: mockReviews,
          total: mockReviews.length
        };
      }

      // Real implementation with Supabase
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('reviews')
        .select('*, user:profiles(first_name, last_name, avatar_url)', { count: 'exact' })
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        reviews: data,
        total: count || 0
      };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Add a product review
  addReview: async (productId: string, rating: number, title: string, comment: string, images?: string[]) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate adding a review
        console.log('Adding review:', { productId, rating, title, comment, images });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return { id: 'new-review-id' };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to leave a review');
      }

      // Add review to database
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          title,
          comment,
          images: images || []
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get recommendations
  getRecommendations: async (userId: string): Promise<Product[]> => {
    try {
      if (USE_MOCK_DATA) {
        // Return random products as recommendations
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return shuffled.slice(0, 4);
      }

      // Real implementation with Supabase
      // This would typically involve a more complex recommendation algorithm
      // For now, we'll just return some random products
      const { data, error } = await supabase
        .from('products')
        .select('*, supplier:suppliers(*)')
        .limit(8);

      if (error) throw error;

      return data as unknown as Product[];
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get recently viewed products
  getRecentlyViewed: async (userId: string): Promise<Product[]> => {
    try {
      if (USE_MOCK_DATA) {
        // Return some mock products as recently viewed
        const recentlyViewed = mockProducts.slice(0, 3);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return recentlyViewed;
      }

      // Real implementation with Supabase
      const { data, error } = await supabase
        .from('recently_viewed')
        .select('products(*)')
        .eq('user_id', userId)
        .order('viewed_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Extract products from the join
      const products = data.map(item => item.products);

      return products as unknown as Product[];
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      if (USE_MOCK_DATA) {
        // Return mock categories
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCategories;
      }

      // Real implementation with Supabase
      const { data, error } = await supabase
        .from('categories')
        .select('*, subcategories(*)');

      if (error) throw error;

      return data as unknown as Category[];
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};

// Cart API
export const cartApi = {
  // Get cart items
  getCart: async () => {
    try {
      if (USE_MOCK_DATA) {
        // Return mock cart data
        const mockCart = [
          {
            id: 'cart-item-1',
            product: mockProducts[0],
            quantity: 1,
            addedAt: new Date()
          },
          {
            id: 'cart-item-2',
            product: mockProducts[1],
            quantity: 2,
            addedAt: new Date()
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return mockCart;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // For guest users, return cart from local storage
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        return guestCart;
      }

      // For authenticated users, get cart from database
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', user.id);

      if (error) throw error;

      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Add item to cart
  addToCart: async (productId: string, quantity = 1, variantId?: string) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate adding to cart
        console.log('Adding to cart:', { productId, quantity, variantId });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return { id: 'new-cart-item-id' };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // For guest users, store cart in local storage
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');

        // Check if product already exists in cart
        const existingItemIndex = guestCart.findIndex((item: any) => 
          item.product.id === productId && 
          ((!item.variantId && !variantId) || item.variantId === variantId)
        );

        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          guestCart[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          const product = mockProducts.find(p => p.id === productId);
          if (product) {
            guestCart.push({
              id: `guest-cart-${Date.now()}`,
              product,
              quantity,
              variantId,
              addedAt: new Date()
            });
          }
        }

        localStorage.setItem('guest_cart', JSON.stringify(guestCart));
        return { id: `guest-cart-${Date.now()}` };
      }

      // For authenticated users, add to database
      // First check if item already exists
      const { data: existingItems, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('variant_id', variantId || null);

      if (fetchError) throw fetchError;

      if (existingItems && existingItems.length > 0) {
        // Update quantity if item already exists
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItems[0].quantity + quantity })
          .eq('id', existingItems[0].id)
          .select();

        if (error) throw error;
        return data[0];
      } else {
        // Add new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            variant_id: variantId,
            quantity
          })
          .select();

        if (error) throw error;
        return data[0];
      }
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Remove item from cart
  removeFromCart: async (cartItemId: string) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate removing from cart
        console.log('Removing from cart:', cartItemId);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return { success: true };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // For guest users, remove from local storage
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        const updatedCart = guestCart.filter((item: any) => item.id !== cartItemId);
        localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
        return { success: true };
      }

      // For authenticated users, remove from database
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (cartItemId: string, quantity: number) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate updating cart
        console.log('Updating cart item quantity:', { cartItemId, quantity });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return { success: true };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // For guest users, update in local storage
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');

        const updatedCart = guestCart.map((item: any) => {
          if (item.id === cartItemId) {
            return { ...item, quantity };
          }
          return item;
        });

        localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
        return { success: true };
      }

      // For authenticated users, update in database
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate clearing cart
        console.log('Clearing cart');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return { success: true };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // For guest users, clear local storage
        localStorage.removeItem('guest_cart');
        return { success: true };
      }

      // For authenticated users, delete all cart items
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Merge guest cart with user cart after login
  mergeGuestCart: async () => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate merging cart
        console.log('Merging guest cart with user cart');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clear guest cart
        localStorage.removeItem('guest_cart');

        return { success: true };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get guest cart from local storage
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');

      if (guestCart.length === 0) {
        return { success: true };
      }

      // Get user's existing cart
      const { data: userCart, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;

      // Prepare items to add or update
      const itemsToUpsert = [];

      for (const guestItem of guestCart) {
        const existingItem = userCart?.find(item => 
          item.product_id === guestItem.product.id && 
          item.variant_id === guestItem.variantId
        );

        if (existingItem) {
          // Update quantity if item already exists
          itemsToUpsert.push({
            id: existingItem.id,
            user_id: user.id,
            product_id: guestItem.product.id,
            variant_id: guestItem.variantId,
            quantity: existingItem.quantity + guestItem.quantity
          });
        } else {
          // Add new item
          itemsToUpsert.push({
            user_id: user.id,
            product_id: guestItem.product.id,
            variant_id: guestItem.variantId,
            quantity: guestItem.quantity
          });
        }
      }

      // Upsert items to database
      if (itemsToUpsert.length > 0) {
        const { error } = await supabase
          .from('cart_items')
          .upsert(itemsToUpsert);

        if (error) throw error;
      }

      // Clear guest cart
      localStorage.removeItem('guest_cart');

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};

// Orders API
export const ordersApi = {
  // Get user orders
  getOrders: async (page = 1, limit = 10) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock orders data
        const { mockOrders } = mockData;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
          orders: mockOrders,
          total: mockOrders.length
        };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Calculate pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Get orders from database
      const { data, error, count } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        orders: data,
        total: count || 0
      };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Get order by ID
  getOrderById: async (id: string) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock order data
        const { mockOrders, mockProducts } = mockData;
        const mockOrder = {
          id: 'order-1',
          order_number: 'ORD-12345',
          user_id: 'user-1',
          status: 'delivered',
          total: 299.98,
          subtotal: 279.98,
          tax: 20.00,
          shipping_cost: 0,
          discount: 0,
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-18T15:45:00Z',
          order_items: [
            {
              id: 'order-item-1',
              order_id: 'order-1',
              product_id: '1',
              quantity: 1,
              price: 199.99,
              total_price: 199.99,
              products: mockProducts[0]
            },
            {
              id: 'order-item-2',
              order_id: 'order-1',
              product_id: '2',
              quantity: 1,
              price: 99.99,
              total_price: 99.99,
              products: mockProducts[1]
            }
          ],
          addresses: {
            id: 'address-1',
            user_id: 'user-1',
            first_name: 'John',
            last_name: 'Doe',
            address_line1: '123 Main St',
            address_line2: 'Apt 4B',
            city: 'Lagos',
            state: 'Lagos State',
            postal_code: '100001',
            country: 'Nigeria',
            phone: '+234 XXX XXX XXXX'
          },
          payments: [
            {
              id: 'payment-1',
              order_id: 'order-1',
              payment_method: 'Credit Card',
              payment_status: 'completed',
              amount: 299.98,
              payment_date: '2024-01-15T10:35:00Z'
            }
          ]
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return mockOrder;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get order from database
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*, products(*)),
          addresses(*),
          payments(*)
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Track order
  trackOrder: async (orderNumber: string) => {
    try {
      if (USE_MOCK_DATA) {
        // Mock tracking data
        const { mockProducts } = mockData;
        const mockTracking = {
          orderNumber,
          trackingNumber: 'TRK-987654321',
          carrier: 'NubiaGO Express',
          estimatedDelivery: '2024-01-25',
          status: 'in_transit',
          statusText: 'In Transit',
          progress: 60,
          origin: 'Istanbul, Turkey',
          destination: 'Lagos, Nigeria',
          events: [
            {
              date: '2024-01-15',
              time: '09:15 AM',
              location: 'Istanbul, Turkey',
              status: 'Order Processed',
              description: 'Your order has been processed and is ready for shipment.'
            },
            {
              date: '2024-01-16',
              time: '02:30 PM',
              location: 'Istanbul, Turkey',
              status: 'Package Shipped',
              description: 'Your package has been shipped and is on its way.'
            },
            {
              date: '2024-01-18',
              time: '10:45 AM',
              location: 'Cairo, Egypt',
              status: 'In Transit',
              description: 'Your package has arrived at the transit facility.'
            },
            {
              date: '2024-01-20',
              time: '08:20 AM',
              location: 'Cairo, Egypt',
              status: 'Departed',
              description: 'Your package has left the transit facility.'
            }
          ]
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return mockTracking;
      }

      // Real implementation with Supabase
      // First get the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('id, tracking_number')
        .eq('order_number', orderNumber)
        .single();

      if (orderError) throw orderError;

      if (!order.tracking_number) {
        throw new Error('No tracking information available for this order');
      }

      // Then get the tracking information
      const { data: tracking, error: trackingError } = await supabase
        .from('tracking')
        .select('*')
        .eq('tracking_number', order.tracking_number)
        .single();

      if (trackingError) throw trackingError;

      // Get tracking events
      const { data: events, error: eventsError } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('tracking_id', tracking.id)
        .order('timestamp', { ascending: false });

      if (eventsError) throw eventsError;

      // Combine data
      return {
        ...tracking,
        events
      };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Create order
  createOrder: async (
    shippingAddress: string,
    billingAddress: string,
    paymentMethod: string,
    items: Array<{ product_id: string; quantity: number; variant_id?: string }>,
    notes?: string
  ) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate creating an order
        console.log('Creating order:', { shippingAddress, billingAddress, paymentMethod, items, notes });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return 'order-123';
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Start a transaction
      // Note: Supabase doesn't support transactions directly through the JS client
      // In a real app, this would be handled by a serverless function

      // 1. Create the order
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

      // Calculate totals (in a real app, this would be done server-side)
      let subtotal = 0;
      for (const item of items) {
        // Get product price
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('price')
          .eq('id', item.product_id)
          .single();

        if (productError) throw productError;

        subtotal += product.price * item.quantity;
      }

      const tax = subtotal * 0.1; // 10% tax
      const shippingCost = 10; // Fixed shipping cost
      const total = subtotal + tax + shippingCost;

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: 'processing',
          subtotal,
          tax,
          shipping_cost: shippingCost,
          total,
          notes
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        // In a real app, you would get the price from the database
        price: 0, // Placeholder
        total_price: 0 // Placeholder
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Save shipping address
      const { error: addressError } = await supabase
        .from('order_addresses')
        .insert({
          order_id: order.id,
          address_type: 'shipping',
          address: shippingAddress
        });

      if (addressError) throw addressError;

      // 4. Save billing address if different
      if (billingAddress !== shippingAddress) {
        const { error: billingAddressError } = await supabase
          .from('order_addresses')
          .insert({
            order_id: order.id,
            address_type: 'billing',
            address: billingAddress
          });

        if (billingAddressError) throw billingAddressError;
      }

      // 5. Record payment (in a real app, this would integrate with a payment processor)
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          order_id: order.id,
          payment_method: paymentMethod,
          payment_status: 'pending',
          amount: total
        });

      if (paymentError) throw paymentError;

      // 6. Clear the cart
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) throw clearCartError;

      return order.id;
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    try {
      if (USE_MOCK_DATA) {
        // Simulate cancelling an order
        console.log('Cancelling order:', orderId);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true };
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (orderError) throw orderError;

      // Check if order can be cancelled
      if (order.status !== 'processing' && order.status !== 'pending') {
        throw new Error('This order cannot be cancelled');
      }

      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return handleSupabaseError(error as Error);
    }
  }
};

const supabaseApi = {
  productsApi,
  categoriesApi,
  cartApi,
  ordersApi
};

export default supabaseApi;