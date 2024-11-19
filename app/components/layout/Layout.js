export default function Layout({children, title}) {
    return (
      <>
        <div className="min-h-full">
  
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </div>
          </main>
        </div>
      </>
    );
  }
  