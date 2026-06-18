import React, { useState } from "react";
import Label from "../components/Label";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Password from "../components/Password";
import Email from "../components/Email";
import CompanyName from "../components/CompanyName";
import CompanyType from "../components/CompanyType";
import CommercialRecord from "../components/CommercialRecord";
import api from "../services/AuthApi";
import axios from "axios";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    nameOfCompany: "",
    email: "",
    password: "",
    company_type_id: "",
    commercial_record_scan: "",
  });
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", formData);

      if (response.status === 200 || response.status === 201) {
        setFormData({
          nameOfCompany: "",
          email: "",
          password: "",
          company_type_id: "",
          commercial_record_scan: "",
        });
      }
      alert("registerd succssfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* رأس الصفحة / الشعار */}
      <Header
        title="Admin Register"
        paragraph="join us in this incredible journey"
      />

      {/* صندوق النموذج (Form Card) */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSumbit}>
            {/* اسم الشركة (nameOfCompany) */}
            <CompanyName
              CompanyName={formData.nameOfCompany}
              handleChanges={handleChanges}
            />

            {/* البريد الإلكتروني (email) */}
            <Email email={formData.email} handleChanges={handleChanges} />

            {/* نوع الشركة (company_type_id) */}
            <CompanyType
              CompanyType={formData.company_type_id}
              handleChanges={handleChanges}
            />

            {/* كلمة المرور (password) */}
            <Password
              password={formData.password}
              handleChanges={handleChanges}
            />
            <CommercialRecord
              CommercialRecord={formData.commercial_record_scan}
              handleChanges={handleChanges}
            />
            {/* زر الإرسال */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-600/10 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-150 transform active:scale-[0.99]"
              >
                Register as Admin
              </button>
            </div>
          </form>

          {/* رابط تسجيل الدخول */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              do you have account?{" "}
              {/* <Link to ="/login">
               Log-in
              </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
