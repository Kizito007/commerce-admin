"use client"
import Navbar from "../components/layout/Navbar";
import Layout from "../components/layout/Layout";
import { useAuth } from "../components/hooks/useAuth";
import DashboardStats from "../components/common/DashboardStats";
import { getGreeting } from "../components/common/Greeting";

export default function Page() {
  // useAuth()
  const greeting = getGreeting()
  return (
    <>
    <Navbar />
    <Layout title={greeting}>
      <DashboardStats />
    </Layout>
    </>
  );
}
