import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"
          onClick={onClose}
          aria-label="Tutup"
        >
          &times;
        </button>
        {title && <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
