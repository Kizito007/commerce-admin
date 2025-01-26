"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import FlashBanner from "../components/common/FlashBanner";
import OrderList from "../components/common/OrderList";
import { useOrdersSecurityQuestionAuth } from "../components/hooks/useAuth";

export default function Page() {
  useOrdersSecurityQuestionAuth('orders')
  const [orders, setOrders] = useState([]);
  const [totalOrdersCount, setTotalOrdersCount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/order-mgmt/orders',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setOrders(response.data.data.orders);
        setTotalOrdersCount(response.data.data.totalOrdersCount)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setIsLoading(false);
        router.push("/admin/login")
      }
    };

    fetchOrders();
  }, []);
  return (
    <>
    <Navbar />
    <Layout title="Orders">
      {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
      <OrderList orders={orders} isLoading={isLoading} totalOrdersCount={totalOrdersCount} />
    </Layout>
    </>
  );
}
