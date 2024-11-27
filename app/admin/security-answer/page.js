"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function SecurityAnswer() {
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const adminId = localStorage.getItem('adminId')
        const jwt = localStorage.getItem('jwt')
        const apiUrl =
            "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/auth/verify-security-answer";
        const data = { securityAnswer, adminId };
        try {
            const response = await axios.post(apiUrl, data, {
                headers: { 'Authorization': `Bearer ${jwt}` },
            });
            const token = response.data.data.token;
            if (token) {
                setSuccess("Security Answer Verified")
                localStorage.setItem("isAnswered", true);
                setIsLoading(false);
                setTimeout(() => {
                    localStorage.removeItem('isAnswered');
                    router.push('/admin/login');
                }, 3600000); // 1 hour
                router.push("/products");
            } else {
                setIsLoading(false);
                console.log("Security Answer not found in the response");
                setError("Network Error");
                router.push("/admin/login");
            }
        } catch (error) {
            console.log("Error during verification:", error.response?.data.message);
            setError(error.response?.data.message);
            setIsLoading(false);
            setTimeout(() => {
                router.push('/admin/login');
            }, 3600);
        }
    };

    const handleSecurityAnswerChange = (e) => {
        setSecurityAnswer(e.target.value);
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
                        Enter the answer to your security question
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={submit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="securityAnswer" className="block text-sm/6 font-medium text-gray-900">
                                Security Answer
                            </label>
                            <div className="mt-2">
                                <input
                                    id="securityAnswer"
                                    name="securityAnswer"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm/6"
                                    onChange={handleSecurityAnswerChange}
                                />
                            </div>
                        </div>
                        {isLoading && <LoadingSpinner />}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                            >
                                Verify Security Answer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}