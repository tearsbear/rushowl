import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

//Assets
import rushOwlLogo from "../logo.svg";
import btnDownload from "../assets/btn-download.svg";
import routeIcon from "../assets/route-square.svg";
import googleIcon from "../assets/google.svg";

//Components
import MapBackground from "../components/MapBackground";
import LoginButton from "../components/LoginButton";
import Toast from "../components/Toast";
import InputForm from "../components/InputForm";

interface LoginResponse {
  message: string;
  token: string;
  user: any;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("error");

  useEffect(() => {
    if (error) {
      setToastType("error");
      setToastMessage(error);
    } else if (toastMessage) {
      setToastType("success");
    }

    if (toastMessage) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
        setError("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error, toastMessage]);

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Check for empty fields
      if (!email) {
        setError("Please enter your email address");
        return;
      }
      if (!password) {
        setError("Please enter your password");
        return;
      }

      // Check email validation
      if (!isEmailValid) {
        setError("Please enter a valid email address");
        return;
      }
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.post<LoginResponse>("/login", {
          email,
          password,
        });
        console.log("Login successful", response.data);

        // Set success message
        setToastMessage("Login successful!");
      } catch (error: any) {
        console.error("Login failed", error);
        // Check for specific backend error response
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error); // get error from backend
        } else {
          setError("Login failed. Please try again."); // default error message
        }
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, isEmailValid]
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-cream-100">
      {/* Left Side */}
      <MapBackground>
        <img src={rushOwlLogo} alt="RushOwl Logo" className="w-44" />
        <div>
          <h1 className="app-tagline text-4xl md:text-5xl mt-8 md:mt-0 font-bold text-white mb-4 whitespace-pre-line">
            Redefining Urban {"\n"} Mobility
            <span className="inline-block align-middle">
              <img src={routeIcon} alt="route icon" />
            </span>
          </h1>
          <p className="app-desc mb-10 whitespace-pre-line">
            Bridging the gap between private and public transit, {"\n"} making
            daily commutes convenient, comfortable, {"\n"} and enjoyable for
            everyone.
          </p>
          <img src={btnDownload} alt="RushOwl Download" />
        </div>
        <div className="flex space-x-1"></div>
      </MapBackground>

      {/* Right Side (Login Form) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-8 md:p-12 lg:p-16">
        <div className="flex-grow flex flex-col justify-center max-w-md w-full">
          <h2 className="text-3xl font-poppins-medium mb-2">Hello there 👋</h2>
          <p className="text-gray-600 font-light">
            We're happy to see you back again!
          </p>

          {/* Toast Notification */}
          <Toast
            showToast={showToast}
            toastMessage={toastMessage}
            toastType={toastType}
          />

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="pt-10 space-y-7 mb-8"
            noValidate
          >
            <InputForm
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginButton isLoading={isLoading} handleSubmit={handleSubmit} />
          </form>

          <div className="text-center">
            <p className="text-gray-600 mb-2">OR</p>

            <button className="w-full custom-google-btn font-poppins-medium whitespace-pre-line mb-12 md:mb-0 lg:mb-0">
              <span className="inline-block align-middle mr-3">
                <img src={googleIcon} alt="google icon" />
              </span>{" "}
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
