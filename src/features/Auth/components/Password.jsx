  import { useState } from "react";
  import Label from "./Label";
  import { Hand } from "lucide-react";

  export default function Password({ password, handleChanges }) {
  
    return (
      <div>
        <Label name="Password" htmlFor="password" />
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="block w-full rounded-xl border-0 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200/80 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 transition-all duration-200"
            placeholder="••••••••"
            value={password}
            onChange={handleChanges}
          />
        </div>
      </div>
    );
  }
