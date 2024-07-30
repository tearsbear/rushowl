import React from "react";

interface ToastProps {
  showToast: boolean;
  toastMessage: string;
  toastType: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({
  showToast,
  toastMessage,
  toastType,
}) => (
  <>
    {showToast && (
      <div
        className={`absolute top-4 right-4 px-4 py-3 rounded fixed z-50 ${
          toastType === "success"
            ? "bg-green-100 border border-green-400 text-green-700"
            : "bg-red-100 border border-red-400 text-red-700"
        }`}
      >
        <p>{toastMessage}</p>
      </div>
    )}
  </>
);

export default Toast;
