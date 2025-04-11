import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import AdminLayout from "../components/layouts/AdminLayout";
import SubjectPopularity from "../components/SubjectPopularity";
import AddAdminForm from "../components/AddAdminForm";

const AdminAccounts = () => {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const studentRes = await axios.get("/api/users/students");
        const tutorRes = await axios.get("/api/users/tutors");
        setStudents(studentRes.data);
        setTutors(tutorRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`/api/users/${id}`);
      if (type === "student") {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } else {
        setTutors((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-10 max-w-[1149px] mx-auto">
        <section>
        <h2 className="text-[16px] font-semibold text-[#1D2939] mb-4">Manage Accounts</h2>
          <UserTable
            title="Student Name"
            users={students}
            onDelete={(id) => handleDelete(id, "student")}
          />
        </section>
  
        <section>
          <UserTable
            title="Tutor Name"
            users={tutors}
            onDelete={(id) => handleDelete(id, "tutor")}
          />
        </section>
        <SubjectPopularity />
        <AddAdminForm />
      </div>
    </AdminLayout>
  );
  
};

export default AdminAccounts;
