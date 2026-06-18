export default function CommercialRecord({ CommercialRecord, handleChanges }) {
  return (
    <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-5 text-center transition hover:border-red-400 hover:bg-slate-50">
      <input
        type="file"
        name="commercial_record_scan"
        accept="image/*"
        className="hidden"
        onChange={handleChanges}
      />
      <div className="flex flex-col items-center gap-2 ">
        <div>
          <p className="mt-0.5 text-xs text-slate-400 max-w-[240px] mx-auto truncate">
            Click to Add the Commercial Record
          </p>
        </div>
      </div>
    </label>
  );
}
