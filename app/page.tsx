"use client";

import { useState, useEffect, useRef } from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  image: string;
  rating: number;
};

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('price');
  const productsPerPage = 10;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`https://66b9fb8cfa763ff550fa5d55.mockapi.io/products`);
      const allProducts: Product[] = await res.json();
      const paginatedProducts = allProducts.slice(0, currentPage * productsPerPage);
      setProducts(paginatedProducts);
    }

    fetchProducts();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    }, options);

    const target = document.querySelector('#load-more');
    if (target && observerRef.current) observerRef.current.observe(target);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortType === 'price') return parseFloat(a.price) - parseFloat(b.price);
    if (sortType === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div>
      <Header />
      <main className="max-w-[1220px] mx-auto px-5 py-[30px] pt-28">
        <div className="flex gap-5 flex-col gap-0 sm:flex-row sm:gap-5">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full mb-4 text-gray-500"
          />
          <select onChange={(e) => setSortType(e.target.value)} className="border p-2 rounded w-full mb-4 text-gray-500">
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        <ProductList products={sortedProducts} />
        <div id="load-more" className="mt-4 px-4 py-2 bg-transparent"></div>
      </main>
    </div>
  );
}
