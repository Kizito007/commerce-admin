"use client"
import { useEffect, useState, use } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../components/hooks/useAuth";
import FlashBanner from "../../components/common/FlashBanner";
import Product from "@/app/components/common/Product";
import Order from "@/app/components/common/Order";


export default function Page({ params }) {
  useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  const [order, setOrder] = useState();
  const { orderId } = use(params);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const orderResponse = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/order-mgmt/orders/${orderId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setOrder(orderResponse.data.data);
        const productId = orderResponse.data.data.productId
        const productResponse = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/product-mgmt/products/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setProduct(productResponse.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch product. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);


  return (
    <>
      <Navbar />
      <Layout title="Order Page">
        {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        <Order order={order} isLoading={isLoading} /> <br/><br/>
        <Product product={product} isLoading={isLoading} />
      </Layout>
    </>
  );
}
