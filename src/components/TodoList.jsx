import React, { useEffect, useRef, useState } from "react";
import Modal_Delete from "./Modal_Delete";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  // Tạo một tham chiếu
  const inputRef = useRef();

  useEffect(() => {
    // Focus vào input
    inputRef.current.focus();
  }, []);

  const [jobLocal, setJobLocal] = useState(() => {
    // Lấy dữ liệu trên local về
    const jobs = JSON.parse(localStorage.getItem("listJob")) || [];
    return jobs;
  });

  // Hàm lấy giá trị từ input
  const handleChange = (e) => {
    // Cập nhật lại state inputValue
    setInputValue(e.target.value);

    // Validate dữ liệu khi change
    setError(!e.target.value.trim());
  };

  // Hàm thêm mới công việc
  const handleAddJob = (e) => {
    // Ngăn chặn sự kiện mặc định của form
    e.preventDefault();

    // Validate dữ liệu
    if (!inputValue) {
      // Cập nhật lại state của error - Hiển thị lỗi
      setError(true);
    } else {
      // Ẩn lỗi
      setError(false);
      // Tạo đối tượng công việc
      const newJob = {
        id: Math.ceil(Math.random() * 1000000),
        jobName: inputValue,
        status: false,
      };

      // Clone hay copy lại tất cả giá trị có bên trong mảng jobLocal và thêm job mới vào mảng
      const newListJob = [...jobLocal, newJob];

      // Lưu dữ liệu lên local
      localStorage.setItem("listJob", JSON.stringify(newListJob));

      // Clear giá trị trong input
      setInputValue("");

      // Cập nhật lại danh sách công việc
      setJobLocal(newListJob);
    }
  };

  // Hàm xử lý hoàn thành công việc
  const handleChecked = (id) => {
    // Cập nhật trạng thái công việc
    const updateJob = jobLocal.map((job) => {
      if (job.id === id) {
        // Cập nhật lại trạng thái của công việc theo id vừa tim được
        return { ...job, status: !job.status };
      }
      return job;
    });

    // Lưu dữ liệu lên local
    localStorage.setItem("listJob", JSON.stringify(updateJob));

    // Lấy dữ liệu mới nhất từ local và cập nhật lại cho state
    setJobLocal(updateJob);
  };

  // Hàm hiển thị modal xác nhận xóa
  const handleShowConfirmDelete = (id) => {
    // Lưu trữ id cần xóa vào trong state
    setIdDelete(id);
    // Cập nhật lại trạng thái của biến showModal
    setShowModal(true);
  };

  // Hàm đóng modal xác nhận xóa
  const handleCloseConfirmDelete = () => {
    // Cập nhật lại trạng thái của biến showModal
    setShowModal(false);
  };

  // Hàm xóa một công việc theo id
  const deleteJob = () => {
    // Tiến hành lọc ra những phần tử khác với id cần xóa
    const filterJob = jobLocal.filter((job) => job.id !== idDelete);

    // Lưu dữ liệu lên local
    localStorage.setItem("listJob", JSON.stringify(filterJob));

    // Lấy dữ liệu mới nhất từ local và cập nhật lại cho state
    setJobLocal(filterJob);

    // Ẩn modal confirm delete
    handleCloseConfirmDelete();
  };

  return (
    <>
      {/* Hiển thị và ẩn modal xác nhận xóa */}
      {/* {showModal ? <Modal_Delete /> : <></>} */}
      {showModal && (
        <Modal_Delete
          idDelete={idDelete}
          close={handleCloseConfirmDelete}
          deleteJob={deleteJob}
        />
      )}

      <div className="flex justify-center items-center h-screen">
        <div className="border w-[60%] shadow-sm py-[56px] px-[56px] rounded-md">
          <h1 className="text-center text-[20px] font-bold">
            Danh sách công việc
          </h1>
          <form className="flex gap-3 my-4" onSubmit={handleAddJob}>
            <div className="flex-1">
              <input
                ref={inputRef}
                onChange={handleChange}
                value={inputValue}
                className="h-9 border outline-none px-4 w-full"
                type="text"
              />
              {error ? <p>Tên công việc không được để trống.</p> : <></>}
            </div>
            <button className="h-9 border px-4 bg-blue-600 text-white rounded">
              Thêm
            </button>
          </form>
          <ul className="flex flex-col gap-3">
            {jobLocal.map((job, index) => (
              <li className="flex justify-between" key={index}>
                <div>
                  <input
                    checked={job.status}
                    onChange={() => handleChecked(job.id)}
                    type="checkbox"
                  />
                  {job.status ? (
                    <>
                      <s>{job.jobName}</s>
                    </>
                  ) : (
                    <>
                      <span>{job.jobName}</span>
                    </>
                  )}
                </div>
                <div>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i
                    onClick={() => handleShowConfirmDelete(job.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
