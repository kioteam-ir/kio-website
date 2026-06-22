import React, { useEffect, useState } from "react";
import { fetcher } from "../core/fetcher";

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetcher.project_list();
      setSubmissions(data);
    } catch (err) {
      setError("خطا در دریافت اطلاعات از سرور");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   const handleDelete = async (id) => {
  //     if (!window.confirm("این درخواست حذف شود؟")) return;
  //     try {
  //       await deleteSubmission(id);
  //       setSubmissions((prev) => prev.filter((s) => s.id !== id));
  //       if (selected && selected.id === id) setSelected(null);
  //     } catch (err) {
  //       alert("حذف با خطا مواجه شد");
  //     }
  //   };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleString("fa-IR");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">درخواست‌های همکاری</h3>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={fetchData}
          >
            بروزرسانی
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              console.log("logout");
            }}
          >
            خروج
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="alert alert-info">هیچ درخواستی ثبت نشده است.</div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>نام</th>
                  <th>ایمیل</th>
                  <th>موضوع</th>
                  <th>تاریخ</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setSelected(item)}
                      >
                        مشاهده
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => console.log("deleted")}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* مودال نمایش پیام کامل */}
      {selected && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.subject}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelected(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>نام:</strong> {selected.name}
                </p>
                <p>
                  <strong>ایمیل:</strong> {selected.email}
                </p>
                <p>
                  <strong>تاریخ:</strong> {formatDate(selected.createdAt)}
                </p>
                <hr />
                <p style={{ whiteSpace: "pre-wrap" }}>{selected.message}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelected(null)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
