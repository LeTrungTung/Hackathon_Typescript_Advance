import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";

interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  avatar: string;
}

interface FormData {
  name: string;
  age: number;
  class: string;
  avatar: string;
}

const StudentManage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [updateFormActive, setUpdateFormActive] =
    useState<boolean>(false);
  const [updateFormData, setUpdateFormData] = useState<FormData>({
    name: "",
    age: 0,
    class: "",
    avatar: "",
  });

  useEffect(() => {
    // Lấy dữ liệu sinh viên từ API
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/apis/v1/students"
      );
      setStudents(response.data.data);
      console.log(3333, response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
    }
  };

  const deleteStudent = async (studentId: string) => {
    if (!window.confirm("Xóa ok?")) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:4000/apis/v1/students/${studentId}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  const openFormUpdate = async (studentId: string) => {
    try {
      const response = await axios.get<Student>(
        `http://localhost:4000/apis/v1/students/${studentId}`
      );
      const studentData = response.data;
      setUpdateFormData({
        name: studentData.name,
        age: studentData.age,
        class: studentData.class,
        avatar: `http://localhost:4000/${studentData.avatar}`,
      });
      setUpdateFormActive(true);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
    }
  };

  const closeFormUpdate = () => {
    setUpdateFormActive(false);
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const updateStudent = async (event: React.FormEvent) => {
    event.preventDefault();
    // try {
    //   await axios.put(
    //     `http://localhost:4000/apis/v1/students/${updateFormData.id}`,
    //     {
    //       name: updateFormData.name,
    //       age: updateFormData.age,
    //       class: updateFormData.class,
    //     }
    //   );
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Lỗi khi cập nhật sinh viên:", error);
    // }
  };

  return (
    <div className="body_container">
      <h1 style={{ textAlign: "center" }}>QUẢN LÝ SINH VIÊN</h1>
      {/* Hiển thị component form sinh viên */}
      {/* {updateFormActive ? (
        // <StudentForm
        //   formData={updateFormData}
        //   handleChange={handleFormChange}
        //   handleSubmit={updateStudent}
        //   submitTitle="Cập Nhật"
        // />
      ) : (
        // <StudentForm
        //   formData={{}}
        //   handleChange={handleFormChange}
        //   handleSubmit={() => {}}
        //   submitTitle="Tạo Mới"
        // />
      )} */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tuổi</th>
            <th scope="col">Ảnh đại diện</th>
            <th scope="col">Lớp</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <img
                  src={`http://localhost:4000/${student.avatar}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  alt={`Ảnh đại diện của ${student.name}`}
                />
              </td>
              <td>{student.class}</td>
              <td>
                <div
                  onClick={() => deleteStudent(student.id)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 900,
                    color: "red",
                  }}
                >
                  X
                </div>
              </td>
              <td>
                <div
                  onClick={() => openFormUpdate(student.id)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 900,
                    color: "red",
                  }}
                >
                  Cập Nhật
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManage;
