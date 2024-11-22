import LoadingSpinner from "./LoadingSpinner";

export default function OrderList({orders, isLoading, totalOrdersCount}) {

  return (
    <>
    {
        isLoading ?
        <LoadingSpinner /> :
        <div className=" bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Orders: {totalOrdersCount} </h2>

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
    }
    </>
  );
}
