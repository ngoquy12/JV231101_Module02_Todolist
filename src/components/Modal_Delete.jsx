import React from "react";
import "./index.css";

export default function Modal_Delete({ close, idDelete, deleteJob }) {
  // Tìm kiếm công việc theo id

  // b1: Lấy dữ liệu từ local
  const jobLocal = JSON.parse(localStorage.getItem("listJob"));

  // b2: Tìm kiếm công việc theo id
  const findJob = jobLocal.find((job) => job.id === idDelete);

  return (
    <>
      <div className="overlay">
        <div className="w-[450px] bg-white px-6 py-5 rounded flex flex-col  gap-4">
          <div className="flex justify-between">
            <h3>Xác nhận</h3>
            <h3 onClick={close}>Đóng</h3>
          </div>
          <div>
            Bạn có chắc chắn muốn xóa công việc "{findJob?.jobName}" không?
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={close}
              className="h-9 border px-4 bg-white text-black rounded"
            >
              Hủy
            </button>
            <button
              onClick={deleteJob}
              className="h-9 border px-4 bg-blue-600 text-white rounded"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
