import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";


export default function ProductList({ products, isLoading, totalProductsCount }) {

  return (
    <div className="bg-gray-100">
      {isLoading ?
        <LoadingSpinner /> :
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Total Products: {totalProductsCount}</h2>

          <div className="flex justify-end items-center mb-4">
            <Link
              href="/products/create"
              className="bg-gray-950 text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              Add New Product
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.productId} className="group relative">
                <img
                  alt="product image"
                  src={product?.photo?.url}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href='#'>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
