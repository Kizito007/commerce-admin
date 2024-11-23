import LoadingSpinner from "./LoadingSpinner";

export default function AdminList({ admins, isLoading }) {
    return (
        <>
            {isLoading ?
                <LoadingSpinner /> :
                <div className=" bg-gray-100 max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Admins: {admins.length} </h2>
                    <div className="flex justify-end items-center mb-4">
                        <a
                            href="/admins/new"
                            className="bg-gray-950 text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
                        >
                            Add Admin
                        </a>
                    </div>

                    <ul role="list" className="mt-6 divide-y divide-gray-100">
                        {admins.map((admin) => (
                            <li key={admin.email} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <img alt="" src={admin?.photo?.url} className="size-12 flex-none rounded-full bg-gray-50" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm/6 font-semibold text-gray-900">{admin.username}</p>
                                        <p className="mt-1 truncate text-xs/5 text-gray-500">{admin.email}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm/6 text-gray-900">{admin.role}</p>
                                    {/* {person.lastSeen ? (
                    <p className="mt-1 text-xs/5 text-gray-500">
                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                    </p>
                    ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs/5 text-gray-500">Online</p>
                    </div>
                    )} */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
}
