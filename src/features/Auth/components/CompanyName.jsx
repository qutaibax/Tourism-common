
import Label from "./Label";
export default function CompanyName({CompanyName,handleChanges}) {
  return (
    <div>
      <Label name="Company Name" htmlFor="nameOfCompany" />

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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <input
          type="text"
          id="nameOfCompany"
          name="nameOfCompany"
          required
          className="block w-full rounded-xl border-0 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200/80 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 transition-all duration-200"
          placeholder="Add name of company"
          value={CompanyName}
          onChange={handleChanges}
        />
      </div>
    </div>
  );
}
