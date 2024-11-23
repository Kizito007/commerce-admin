"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useAuth } from "@/app/components/hooks/useAuth";

export default function CreateProduct() {
  useAuth();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    availableStock: "",
    percentageDiscount: "",
    status: "NEW", // Default value
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }
      const jwt = localStorage.getItem('jwt')

      const apiUrl =
        "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/product-mgmt/products";
      await axios.post(apiUrl, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${jwt}` },
      });

      setSuccess("Product created successfully!");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while creating the product."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {error && (
        <FlashBanner
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      {success && (
        <FlashBanner
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-gray-900">
            Create new Product
          </h2>
          <p className="mt-5 text-center tracking-tight text-gray-700">
            Enter your product details
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={formData.amount}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about the product.</p>
                  </div>


                </div>
              </div>

              <div>
                <label
                  htmlFor="availableStock"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    id="availableStock"
                    name="availableStock"
                    type="number"
                    required
                    value={formData.availableStock}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="percentageDiscount"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    id="percentageDiscount"
                    name="percentageDiscount"
                    type="number"
                    value={formData.percentageDiscount}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                      Status
                    </label>
                    <div className="mt-2">
                      <select
                        id="status"
                        name="status"
                        autoComplete="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm/6"
                      >
                        <option>NEW</option>
                        <option>USED</option>
                        <option>LIMITED</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                  Product Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
                      >
                        <span>Upload a file</span>
                        <input id="file" name="file" type="file" onChange={handleChange} className="sr-only" accept=".png, .jpg" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {isLoading && <LoadingSpinner />}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  );
}
