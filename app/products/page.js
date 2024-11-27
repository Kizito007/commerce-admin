"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import ProductList from "../components/common/ProductList";
import { useAuth, useSecurityQuestionAuth } from "../components/hooks/useAuth";
import FlashBanner from "../components/common/FlashBanner";

export default function Page() {
  useAuth();
  useSecurityQuestionAuth();
  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/product-mgmt/products',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setProducts(response.data.data.products);
        setTotalProductsCount(response.data.data.totalProductsCount)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Layout title="Products">
      {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        <ProductList products={products} isLoading={isLoading} totalProductsCount={totalProductsCount} />
      </Layout>
    </>
  );
}
