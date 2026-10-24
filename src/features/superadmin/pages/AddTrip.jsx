import { useState, useEffect } from "react";
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Info,
  ShieldAlert,
  Hotel,
  Utensils,
  Camera,
  Sparkles,
  CheckSquare,
} from "lucide-react";

// فرضاً أن هذا هو المسار الصحيح لخدمة الرحلات لديك
// import { createTrip } from "../services/tripService";

export default function AddTrip() {
  // 1. استخدام Object واحد في الـ useState لإدارة حالة الحقول كاملة
  const [formData, setFormData] = useState({
    trip_type_id: "",
    title: "",
    city_name_id: "",
    des_and_events: "",
    start_date: "",
    end_date: "",
    price: 0,
    status: "pending", // القيمة الافتراضية
    des_of_accommodation: "",
    des_of_restaurant: "",
    des_of_policies: "",
    is_full: false,
  });

  const [fileName, setFileName] = useState("");
  const [tripTypes, setTripTypes] = useState([]);
  const [cities, setCities] = useState([]);

  // معالجة تغيير الحقول بشكل عام وديناميكي
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // الحماية من الأرقام السالبة لحقل السعر
  const handlePriceChange = (value) => {
    const numericValue = parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      price: isNaN(numericValue) || numericValue < 0 ? 0 : numericValue,
    }));
  };

  // معالجة رفع الملفات (صورة الرحلة)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // إرسال البيانات للباك إند
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من منطقية التواريخ (تاريخ النهاية بعد البداية)
    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      alert("❌ Error: End date must be after start date!");
      return;
    }

    try {
      // هنا نقوم باستدعاء الدالة الخاصة بك لإرسال formData
      // const result = await createTrip(formData);
      console.log("Submitted Trip Data:", formData);
      alert(`🎉 Successfully created trip: ${formData.title}`);
    } catch (error) {
      console.log("Error:", error);
      alert("❌ Failed to create trip");
    }
  };

  // جلب أنواع الرحلات والمدن عند تحميل المكون
  useEffect(() => {
    const fetchRequiredData = async () => {
      try {
        // جلب أنواع الرحلات
        const typesRes = await fetch("http://127.0.0.1:8000/api/trip-types");
        const typesData = await typesRes.json();
        setTripTypes(typesData.data || []);

        // جلب قائمة المدن
        const citiesRes = await fetch("http://127.0.0.1:8000/api/cities");
        const citiesData = await citiesRes.json();
        setCities(citiesData.data || []);
      } catch (error) {
        console.log("Error fetching initial data:", error);
      }
    };

    fetchRequiredData();
  }, []);

  return (
    <div className="space-y-6">
      {/* القسم العلوي التوضيحي للعنوان (بنفس الألوان الجذابة والهوية البصرية) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
            1. Trip Details
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            Create a new trip listing
          </h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-700">
          <Sparkles size={14} />
          Trip Management Panel
        </div>
      </div>

      {/* نموذج الاستمارة الرئيسي مع الحفاظ التام على هوية التصميم */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.04)] space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* 1. عنوان الرحلة */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Trip Title
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Compass size={18} className="text-red-600" />
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Adventure in the Red Sea"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 2. نوع الرحلة (قائمة منسدلة) */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Trip Type
            </span>
            <select
              name="trip_type_id"
              required
              value={formData.trip_type_id}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition outline-none text-slate-800"
            >
              <option value="" disabled>
                Select type of trip
              </option>
              {tripTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>

          {/* 3. المدينة (قائمة منسدلة) */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Destination City
            </span>
            <select
              name="city_name_id"
              required
              value={formData.city_name_id}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition outline-none text-slate-800"
            >
              <option value="" disabled>
                Select destination city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>

          {/* 4. السعر */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Price ($)
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <DollarSign size={18} className="text-red-600" />
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="150.00"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 5. تاريخ ووقت البداية */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Start Date & Time
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Calendar size={18} className="text-red-600" />
              <input
                type="datetime-local"
                name="start_date"
                required
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 6. تاريخ ووقت النهاية */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              End Date & Time
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Calendar size={18} className="text-red-600" />
              <input
                type="datetime-local"
                name="end_date"
                required
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 7. حالة الرحلة */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Trip Status
            </span>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-600/5 transition outline-none text-slate-800"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="finished">Finished</option>
            </select>
          </label>

          {/* 8. هل الرحلة ممتلئة بالكامل؟ (أنماط التبديل السريع والتحقق البصري) */}
          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="is_full"
                checked={formData.is_full}
                onChange={handleInputChange}
                className="hidden"
              />
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all ${
                  formData.is_full
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {formData.is_full && <CheckSquare size={16} />}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Mark Trip as Fully Booked (Is Full)
              </span>
            </label>
          </div>

          {/* 9. وصف الرحلة وفعالياتها */}
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Description and Events
            </span>
            <div className="relative">
              <textarea
                name="des_and_events"
                rows="3"
                value={formData.des_and_events}
                onChange={handleInputChange}
                placeholder="Provide a detailed itinerary and events scheduled for this trip..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-600/5 text-sm"
              />
            </div>
          </label>

          {/* 10. تفاصيل الإقامة */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Accommodation details
            </span>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Hotel size={18} className="text-red-600 mt-1 flex-shrink-0" />
              <textarea
                name="des_of_accommodation"
                rows="2"
                value={formData.des_of_accommodation}
                onChange={handleInputChange}
                placeholder="Details about hotel, rooms, facilities..."
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm resize-none"
              />
            </div>
          </label>

          {/* 11. تفاصيل المطعم */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Restaurant details
            </span>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Utensils size={18} className="text-red-600 mt-1 flex-shrink-0" />
              <textarea
                name="des_of_restaurant"
                rows="2"
                value={formData.des_of_restaurant}
                onChange={handleInputChange}
                placeholder="Details about meals, catering, special diets..."
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm resize-none"
              />
            </div>
          </label>

          {/* 12. سياسات الرحلة وشروطها */}
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Trip Policies & Conditions
            </span>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <ShieldAlert
                size={18}
                className="text-red-600 mt-1 flex-shrink-0"
              />
              <textarea
                name="des_of_policies"
                rows="3"
                value={formData.des_of_policies}
                onChange={handleInputChange}
                placeholder="Cancellation policies, terms of service, and safety guidelines..."
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>
        </div>

        {/* سطر رفع الملفات والزر النهائي لربط البيانات */}
        <div className="grid gap-4 sm:grid-cols-2 mt-6 pt-6 border-t border-slate-100">
          {/* مربع الصورة المرتبط بالـ FK */}
          <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-5 text-center transition hover:border-red-400 hover:bg-slate-50">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                <Camera size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {fileName ? "Trip cover selected!" : "Upload cover image"}
                </p>
                <p className="mt-0.5 text-xs text-slate-400 max-w-[240px] mx-auto truncate">
                  {fileName ? fileName : "Click to browse trip photo"}
                </p>
              </div>
            </div>
          </label>

          {/* زر الحفظ الأنيق والممتد بارتفاع مربع الصورة */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-[84px] rounded-2xl bg-red-600 font-bold text-white shadow-lg shadow-red-600/10 transition hover:bg-red-500 hover:shadow-red-600/20 active:scale-[0.99]"
            >
              Save Trip Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
