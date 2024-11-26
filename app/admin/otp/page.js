"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const adminId = searchParams.get('adminId'); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiUrl =
      "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/auth/verify-email-token";
    const data = { token: otp, userId: adminId};
    try {
      const response = await axios.post(apiUrl, data);
      const token = response.data.data.token;
      if (token) {
        setSuccess("OTP Verified")
        localStorage.setItem("jwt", token);
        setIsLoading(false);
        setTimeout(() => {
          localStorage.removeItem('jwt');
          router.push('/admin/login');
        }, 3600000); // 1 hour
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        console.error("OTP not found in the response");
        setError("Network Error");
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error during verification:", error.response?.data.message);
      setError(error.response?.data.message);
      setIsLoading(false);
      setTimeout(() => {
          router.push('/admin/login');
        }, 3600);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
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
      {
        success && (
          <FlashBanner
            message={success}
            type="success"
            onClose={() => setSuccess(null)}
          />
        )
      }
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <br />
        <br />
        <br />
        <br />
        <br />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Enter the OTP that was sent to your email
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submit} method="POST" className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm/6 font-medium text-gray-900">
                  OTP
                </label>
                <div className="mt-2">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                    onChange={handleOtpChange}
                  />
                </div>
              </div>
              {isLoading && <LoadingSpinner />}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  