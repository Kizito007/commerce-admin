"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import AdminList from "../components/common/AdminList";
import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../components/hooks/useAuth";
import FlashBanner from "../components/common/FlashBanner";

export default function Page() {
  useAuth();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcAdmins = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/admins',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setAdmins(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetcAdmins();
  }, []);

  return (
    <>
    <Navbar />
    <Layout title="Admins">
      {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
      <AdminList admins={admins} isLoading={isLoading} />
    </Layout>
    </>
  );
}
