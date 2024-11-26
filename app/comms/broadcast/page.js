"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuth, useFaceAuth } from "@/app/components/hooks/useAuth";
import Navbar from "@/app/components/layout/Navbar";

export default function CreateBroadcast() {
  useAuth();
  useFaceAuth('comms/broadcast');
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const jwt = localStorage.getItem('jwt')
      const apiUrl =
        "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/send-bulk-email";
      await axios.post(apiUrl, { subject, text }, {
        headers: { 'Authorization': `Bearer ${jwt}` },
      });

      setSuccess("Emails broadcasted successfully!");
      setTimeout(() => {
        router.push("/comms");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred while broadcasting the emails."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Navbar />
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
                  value={subject}
                  onChange={handleSubjectChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                Text
              </label>
              <div className="mt-2">
                <textarea
                  id="text"
                  name="text"
                  rows={3}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                  value={text}
                  onChange={handleTextChange}
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
