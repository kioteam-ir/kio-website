import React, { useEffect, useState } from "react";
import { fetcher } from "../core/fetcher";

function SubmissionModal({ selected, onClose, onDelete }) {
  if (!selected) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString("fa-IR");
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {selected.subject}
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              #{selected.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                Name
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {selected.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                Phone Number
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                {selected.phone_number}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              Date
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {formatDate(selected.createdAt)}
            </p>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
              Message
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selected.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(selected.id)}
            className="px-4 py-2 text-sm rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString("fa-IR");
    } catch {
      return dateStr;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetcher.project_list();
      setSubmissions(data.result);
    } catch (err) {
      setError("خطا در دریافت اطلاعات از سرور");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    // TODO: call delete API here
    console.log("deleted", id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              درخواست‌های همکاری
            </h1>
            {!loading && !error && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                {submissions.length} درخواست
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              بروزرسانی
            </button>
            <button
              onClick={() => console.log("logout")}
              className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              خروج
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-gray-200 dark:border-gray-700 border-t-gray-500 dark:border-t-gray-400 rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              هیچ درخواستی ثبت نشده است.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 w-10">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 w-32">
                    نام
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 w-44">
                    شماره تلفن
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                    موضوع
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 w-36">
                    تاریخ
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 w-28">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item, index) => (
                  <tr
                    key={item.id ?? index}
                    className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <td className="px-4 py-3 text-gray-400 dark:text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200 truncate">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono truncate">
                      {item.phone_number}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 truncate">
                      {String(item.description).slice(0, 30) +
                        (item.description.length > 30 ? "..." : "")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 dark:text-gray-500 text-xs">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setSelected(item)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          مشاهده
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-red-100 dark:border-red-900 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SubmissionModal
        selected={selected}
        onClose={() => setSelected(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
