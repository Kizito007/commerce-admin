"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Layout from "../components/layout/Layout";
import { useAuth } from "../components/hooks/useAuth";
import DashboardStats from "../components/common/DashboardStats";
import { getGreeting } from "../components/common/Greeting";
import FlashBanner from "../components/common/FlashBanner";

export default function Page() {
  useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/admins/stats',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setStats(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const greeting = getGreeting()
  return (
    <>
      <Navbar />
      <Layout title={greeting}>
        {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        <DashboardStats stats={stats} isLoading={isLoading} />
      </Layout>
    </>
  );
}
