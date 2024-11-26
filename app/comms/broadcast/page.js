"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useAuth, useFaceAuth } from "@/app/components/hooks/useAuth";
import Navbar from "@/app/components/layout/Navbar";

export default function CreateBroadcast() {
  useAuth();
  useFaceAuth('comms/broadcast');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    securityAnswer: "",
    role: "EDITOR", // Default value
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
        "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/admins";
      await axios.post(apiUrl, formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${jwt}` },
      });

      setSuccess("Admin created successfully!");
      setTimeout(() => {
        router.push("/admins");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while creating the administrator."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Navbar/>
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
            Broadcast Email
          </h2>
          <p className="mt-5 text-center tracking-tight text-gray-700">
            Broadcast email to users
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Subject
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="subject"
                  name="subject"
                  type="subject"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Say something nice to your users.</p>
                  </div>
            {isLoading && <LoadingSpinner />}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-950 px-3 p-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Broadcast Email
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  );
}
