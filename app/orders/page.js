import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";

export default function Page() {
  const orders = [
    {
      _id: "672e4c6572e4401a7283d417",
      amount: 200,
      qty: "2",
      status: "NEW",
      productId: "PD4ACG9U4MJO1Q0",
      userId: "USB2TP6KUBUT7J6",
      orderId: "OROMUZXA7IVGUG6",
      createdAt: "2024-11-08T17:37:41.291Z",
      updatedAt: "2024-11-08T17:37:41.291Z",
      __v: 0,
    },
    {
      _id: "672e4c6572e4401a7283d419",
      amount: 200,
      qty: "2",
      status: "NEW",
      productId: "PD4ACG9U4MJO1Q0",
      userId: "USB2TP6KUBUT7J6",
      orderId: "OROMUZXA7IVGUG6",
      createdAt: "2024-11-08T17:37:41.291Z",
      updatedAt: "2024-11-08T17:37:41.291Z",
      __v: 0,
    },
  ]
  return (
    <>
    <Navbar />
    <Layout title="Orders">
    <div className=" bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Orders: 2</h2>

    <table className="mt-10 min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b text-left">Order ID</th>
            <th className="px-4 py-2 border-b text-left">Amount</th>
            <th className="px-4 py-2 border-b text-left">Quantity</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Created At</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-gray-900">
              <td className="px-4 py-2 border-b">{order.orderId}</td>
              <td className="px-4 py-2 border-b">{order.amount}</td>
              <td className="px-4 py-2 border-b">{order.qty}</td>
              <td className="px-4 py-2 border-b">{order.status}</td>
              <td className="px-4 py-2 border-b">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
    </>
  );
}
