import LoadingSpinner from "./LoadingSpinner";

export default function DashboardStats({ stats, isLoading }) {
  const statCards = [
    { title: "Products", value: stats?.products },
    { title: "Orders", value: stats?.orders },
    { title: "Users", value: stats?.users },
  ];

  const adminCards = [
    { title: "Total Access Managers", value: stats?.totalAccessManagers },
    { title: "Super Admins", value: stats?.superAdmin },
    { title: "Editors", value: stats?.editor },
    { title: "Arbitrators", value: stats?.arbitrator },
  ];

  return (

    <div className="bg-gray-100 text-gray-900 min-h-screen p-8 space-y-12">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
      {
        isLoading ?
          <LoadingSpinner /> :
          <>
            {/* Products, Orders, and Users Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 shadow-sm border border-gray-300 bg-white hover:shadow-md transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold tracking-wide">{card.title}</h2>
                  <p className="text-4xl font-bold mt-2">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Admin Stats */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 tracking-wide">Admin Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {adminCards.map((card, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-6 shadow-sm border border-gray-300 bg-white hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold tracking-wide">{card.title}</h3>
                    <p className="text-3xl font-bold mt-2">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
      }
    </div>
  );
}
