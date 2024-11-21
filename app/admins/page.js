import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";

export default function Page() {
  const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]

  return (
    <>
    <Navbar />
    <Layout title="Admins">
    <div className="mt-6 bg-gray-100 max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Admins: 4</h2>

    <ul role="list" className="mt-6 divide-y divide-gray-100">
      {people.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
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
            )}
          </div>
        </li>
      ))}
    </ul>
    </div>
    </Layout>
    </>
  );
}
