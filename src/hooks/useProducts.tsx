
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  reviews: number;
  created_at?: string;
  updated_at?: string;
  details?: Record<string, string | string[]>;
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      return data as Product[];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (productError) {
        console.error('Error fetching product:', productError);
        throw productError;
      }

      // Fetch product details
      const { data: details, error: detailsError } = await supabase
        .from('product_details')
        .select('key, value')
        .eq('product_id', id);
      
      if (detailsError) {
        console.error('Error fetching product details:', detailsError);
        throw detailsError;
      }

      // Group details by key
      const groupedDetails: Record<string, string | string[]> = {};
      details?.forEach(detail => {
        if (groupedDetails[detail.key]) {
          if (Array.isArray(groupedDetails[detail.key])) {
            (groupedDetails[detail.key] as string[]).push(detail.value);
          } else {
            groupedDetails[detail.key] = [groupedDetails[detail.key] as string, detail.value];
          }
        } else {
          groupedDetails[detail.key] = detail.value;
        }
      });

      return {
        ...product,
        details: groupedDetails
      } as Product;
    },
    enabled: !!id,
  });
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products by category:', error);
        throw error;
      }
      
      return data as Product[];
    },
    enabled: !!categoryId,
  });
}

export function useSearchProducts(searchQuery: string) {
  return useQuery({
    queryKey: ['products', 'search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error searching products:', error);
        throw error;
      }
      
      return data as Product[];
    },
    enabled: !!searchQuery.trim(),
  });
}
