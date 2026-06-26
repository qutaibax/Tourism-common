import Label from "../components/Label";
import Password from "../components/Password";
import Email from "../components/Email";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/AuthApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      alert("log in successfully");
      console.log(response.data.token);

      const token = response.data.token;
      const role = response.data.admin.company_type.type_name;

      localStorage.setItem("token", token);
      localStorage.setItem("AdminRole", role);

      if (role === "super") {
        navigate("/super");
      } else if (role === "hotel") {
        navigate("/hotel");
      } else if (role === "resturant") {
        navigate("/restaurants");
      } else {
        navigate("/unauthorized"); // صفحة تخبره أنه ليس لديه صلاحية
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <Header title="Admin Log-in" paragraph="welocome back dear Admin" />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl h-80">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handelSubmit}>
            <Password
              password={formData.password}
              handleChanges={handleChanges}
            />
            <Email email={formData.email} handleChanges={handleChanges} />
            {/* زر الإرسال */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-600/10 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-150 transform active:scale-[0.99]"
              >
                Welocome back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
