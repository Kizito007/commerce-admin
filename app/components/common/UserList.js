import LoadingSpinner from "./LoadingSpinner";

export default function UserList({ users, isLoading }) {
    return (
        <>
            {isLoading ?
                <LoadingSpinner /> :
                <div className=" bg-gray-100 max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Users: {users.length} </h2>
                    <div className="flex justify-end items-center mb-4">
                        <a
                            href="/comms/broadcast"
                            className="bg-gray-950 text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
                        >
                            Broadcast Email
                        </a>
                    </div>

                    <ul role="list" className="mt-6 divide-y divide-gray-100">
                        {users.map((user) => (
                            <li key={user.email} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{user.email}</p>
                                    </div><p className="text-sm/6 font-semibold text-gray-900">{user.username}</p>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm/6 text-gray-900">{user.userId}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
}
