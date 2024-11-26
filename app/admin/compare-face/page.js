"use client";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { convertBase64ImageToJpg } from "./convertBase64ToJpg";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/hooks/useAuth";

export default function CameraCaptureUpload() {
    useAuth();
    const [capturedImage, setCapturedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [admin, setAdmin] = useState({});
    const webcamRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    const adminId = searchParams.get('adminId');
    const router = useRouter();

    useEffect(() => {
        const fetchAdmin = async () => {
          try {
            const jwt = localStorage.getItem('jwt')
            const adminResponse = await axios.get(
                `https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/admins/${adminId}`,
                { headers: { 'Authorization': `Bearer ${jwt}` } }
            );
            setAdmin(adminResponse.data.data);
          } catch (err) {
          }
        };
    
        fetchAdmin();
      }, []);

    const captureImage = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleRetake = () => {
        setCapturedImage(null);
    };

    const uploadBase64Image = async (base64String) => {
        try {
            const imageBlob = await convertBase64ImageToJpg(base64String)
            const formData = new FormData();
            formData.append("file", imageBlob, "file");
            return formData;
        } catch (error) {
            console.error("Error during image processing:", error.message);
            return null;
        }
    };

    const compareImages = async () => {
        if (!capturedImage) {
            setError("Image is required for comparison.");
            return;
        }
        const formData = await uploadBase64Image(capturedImage)
        const jwt = localStorage.getItem('jwt')
        setIsLoading(true);
        try {
            const apiUrl =
                "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/upload-face";
            await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${jwt}` },
            });

            const response = await axios.post(
                "https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/compare-face", {},
                { headers: { 'Authorization': `Bearer ${jwt}` } }
            );
            const confidence = response.data.data.confidence
            if (confidence && confidence >= 75 ) {
                setSuccess(`Images matches with confidence ${confidence}`)
                localStorage.setItem("faceMatch", true);
                setIsLoading(false)
                setTimeout(() => {
                router.push('/dashboard');
                }, 3600);
                setTimeout(() => {
                    localStorage.removeItem('faceMatch');
                }, 3600000); // 1 hour
            } else {
                setError("Images do not match.");
            }
        } catch (err) {
            console.error("Error comparing images:", err);
            setError("Failed to compare images. Please try again.");
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

            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6">Image Verification</h1>

                {!capturedImage ? (
                    <div className="mb-6">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-lg shadow-lg"
                        />
                        <button
                            onClick={captureImage}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Capture Image
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 py-6">
                        <div className=" flex ">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="mt-2 mx-2 w-48 h-48 rounded-lg shadow-lg"
                        />
                        <img
                            src={admin.photo?.url}
                            alt="Captured"
                            className="mt-2 w-48 h-48 rounded-lg shadow-lg"
                        />
                        </div>
                        <button
                            onClick={handleRetake}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Retake
                        </button>
                    </div>
                )}

                {uploadedImage && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Uploaded Image:</h2>
                        <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="mt-2 w-48 h-48 rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {isLoading && <LoadingSpinner />} <br /><br />

                <button
                    onClick={compareImages}
                    className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
                >
                    Verify Image
                </button>
            </div>
        </>
    );
}
