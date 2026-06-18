import Label from "./Label";
import { useState } from "react";

export default function Email({ email, handleChanges }) {

  return (
    <div>
      <Label name="Email" htmlFor="email" />

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
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
            />
          </svg>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-full rounded-xl border-0 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200/80 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 transition-all duration-200"
          placeholder="name@company.com"
          value={email}
          onChange={handleChanges}
        />
      </div>
    </div>
  );
}
