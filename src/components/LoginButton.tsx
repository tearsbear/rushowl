import React from "react";

interface LoginButtonProps {
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  isLoading,
  handleSubmit,
}) => (
  <button
    type="submit"
    className="w-full custom-submit-btn font-poppins-medium hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-400 disabled:opacity-50"
    disabled={isLoading}
  >
    {isLoading ? "Please wait..." : "Continue"}
  </button>
);

export default LoginButton;
