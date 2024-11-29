"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import { useAuth, useCommsSecurityQuestionAuth } from "../components/hooks/useAuth";
import FlashBanner from "../components/common/FlashBanner";
import UserList from "../components/common/UserList";

export default function Page() {
  useAuth();
  useCommsSecurityQuestionAuth('comms')
  const [users, seUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/users',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        seUsers(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Layout title="Comms">
        {error && (
          <FlashBanner
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        <UserList users={users} isLoading={isLoading} />
      </Layout>
    </>
  );
}
