import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

export default function Order({ order, isLoading }) {

    return (
        <>
            {
                isLoading ?
                    <LoadingSpinner /> :
                    <div className="bg-white shadow-md rounded-lg p-6">
                        {/* Responsive Table Wrapper */}
                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border-b text-left">Order ID</th>
                                        <th className="px-4 py-2 border-b text-left">Amount</th>
                                        <th className="px-4 py-2 border-b text-left">Quantity</th>
                                        <th className="px-4 py-2 border-b text-left">Status</th>
                                        <th className="px-4 py-2 border-b text-left">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-gray-900">
                                        <td className="px-4 py-2 border-b">{order.orderId}</td>
                                        <td className="px-4 py-2 border-b">{order.amount}</td>
                                        <td className="px-4 py-2 border-b">{order.qty}</td>
                                        <td className="px-4 py-2 border-b">{order.status}</td>
                                        <td className="px-4 py-2 border-b">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

            }
        </>
    );
}
