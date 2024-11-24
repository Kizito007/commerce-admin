import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";


export default function Product({ product, isLoading }) {

  return (
    <>
      {isLoading ?
        <LoadingSpinner /> :
        <div className="bg-white">
          <div className="pt-6">
            {/* <nav aria-label="Breadcrumb">
              <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                  <div className="flex items-center">
                    <Link href="/products" className="mr-2 text-sm font-medium text-gray-900">
                      Products
                    </Link>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              </ol>
            </nav> */}

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <img
                alt="product-image"
                src={product?.photo?.url}
                className="aspect-[4/3] size-full object-cover"
              />
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">${product.amount}</p>

                {/* Reviews */}
                <div className="mt-6">
                  {/* <h3 className="sr-only">Reviews</h3> */}
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Total stock: {product.totalStock}</p>
                  </div>
                </div>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Product Status</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}
