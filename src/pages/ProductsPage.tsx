
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Disc, Loader2 } from 'lucide-react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL params on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    
    if (search) {
      setSearchQuery(search);
    }
    
    // Get category from path if on a category page
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'category' && pathParts[2]) {
      setSelectedCategory(pathParts[2]);
    } else {
      setSelectedCategory(null);
    }
  }, [location]);

  // Filter products by selected category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory
      : true;
      
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    return matchesCategory && matchesSearch;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return a.featured ? -1 : 1;
    }
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    
    // Update URL without triggering a reload
    if (categoryId) {
      navigate(`/category/${categoryId}${searchQuery ? `?search=${searchQuery}` : ''}`, { replace: true });
    } else {
      navigate(`/products${searchQuery ? `?search=${searchQuery}` : ''}`, { replace: true });
    }
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setSortOption(e.target.value);
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pt-32">
        {/* Page Header */}
        <div className="bg-muted py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'}`
                : searchQuery
                  ? `Search Results: "${searchQuery}"`
                  : 'All Products'
              }
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {searchQuery 
                ? `Showing results for "${searchQuery}"`
                : 'Browse our complete collection of premium tech products and find the perfect fit for your lifestyle.'
              }
            </p>
          </div>
        </div>
        
        {/* Product Listing */}
        <div className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryChange(null)}
                    >
                      All Products
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <Button 
                      variant="outline" 
                      className="lg:hidden flex items-center gap-2 mr-2"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                    <p className="text-muted-foreground">
                      Showing {sortedProducts.length} products
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <label htmlFor="sort" className="text-sm sr-only">
                      Sort by
                    </label>
                    <select
                      id="sort"
                      name="sort"
                      value={sortOption}
                      onChange={handleSortChange}
                      className="w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="featured">Featured</option>
                      <option value="priceAsc">Price: Low to High</option>
                      <option value="priceDesc">Price: High to Low</option>
                      <option value="nameAsc">Name: A to Z</option>
                      <option value="nameDesc">Name: Z to A</option>
                    </select>
                  </div>
                </div>
                
                {/* Mobile Filters */}
                {isFilterVisible && (
                  <div className="lg:hidden mb-6 p-4 border rounded-md animate-fade-in">
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          handleCategoryChange(null);
                          setIsFilterVisible(false);
                        }}
                      >
                        All Products
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            handleCategoryChange(category.id);
                            setIsFilterVisible(false);
                          }}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                  </div>
                ) : sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-in" 
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Disc className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No products found</h3>
                    <p className="text-muted-foreground mt-1 mb-6">
                      We couldn't find any products that match your criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery('');
                      handleCategoryChange(null);
                    }}>
                      View All Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
