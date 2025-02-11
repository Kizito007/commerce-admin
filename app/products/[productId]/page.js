"use client"
import { useEffect, useState, use } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../components/hooks/useAuth";
import FlashBanner from "../../components/common/FlashBanner";
import Product from "@/app/components/common/Product";


export default function Page({ params }) {
  useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  const { productId } = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/product-mgmt/products/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setProduct(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch product. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);


  return (
    <>
      <Navbar />
      <Layout title="Product Page">
        {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        <Product product={product} isLoading={isLoading} />
      </Layout>
    </>
  );
}
