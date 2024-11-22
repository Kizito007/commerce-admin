import ProductList from "../components/common/ProductList";
import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";

export default function Page() {


  return (
    <>
      <Navbar />
      <Layout title="Products">
      <ProductList />
      </Layout>
    </>
  );
}
