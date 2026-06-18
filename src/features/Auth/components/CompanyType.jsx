import { useEffect, useState } from "react";
import Label from "./Label";
import axios from "axios";
export default function CompanyType({CompanyType,handleChanges}) {
  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/company-types",
      );
      setTypes(response.data.data);
      console.log("Company names fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching company names:", error);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div>
      <Label name="Company Type" htmlFor="company_type_id" />

      <div className="relative mt-1 rounded-xl shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
        <select
          id="company_type_id"
          name="company_type_id"
          required
          className="block w-full rounded-xl border-0 bg-slate-50/50 py-3.5 pl-11 pr-10 text-slate-900 ring-1 ring-inset ring-slate-200/80 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 transition-all duration-200 appearance-none"
          value={CompanyType}
          onChange={handleChanges}
        >
          <option value="" >
          choose thr type or your company....
          </option>
          {types.map((type) => (
            <option id={type.id} value={type.id}>
              {type.type_name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
