"use client"
import Navbar from "../components/layout/Navbar";
import Layout from "../components/layout/Layout";
import { useAuth } from "../components/hooks/useAuth";

export default function Page() {
  useAuth()
  return (
    <>
    <Navbar />
    <Layout title="Dashboard">
      Dashboard
    </Layout>
    </>
  );
}
