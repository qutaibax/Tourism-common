import { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import {
  Utensils,
  MapPin,
  Phone,
  Star,
  Clock,
  Camera,
  Sparkles,
} from "lucide-react";

import { createRestaurant } from "../services/restaurantService";

export default function AddRestaurant() {
  // حاله الحقول (Form States)
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [rate, setRate] = useState(5);
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("23:00");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [types, setTypes] = useState([]);

  // الحماية من الأرقام السالبة أو فوق 5 في حقل التقييم
  const handleRateChange = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue < 0) {
      setRate(0);
    } else if (numericValue > 5) {
      setRate(5);
    } else {
      setRate(numericValue);
    }
  };

  // معالجة رفع الملفات (صورة المطعم)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  const restaurantData = {
    name: name,
    restaurant_type_id: type,
    city_name: city,
    location: location,
    phone_number: phone,
    initial_rating: rate,
    open_time: openingTime,
    close_time: closingTime,
    description: description,
  };
  //  AXIOS POST REQUEST لربط البيانات مع الباك إند
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createRestaurant(restaurantData);
      console.log("Success:", result);
      alert(`🎉 Successfully created: ${name}`);
    } catch (error) {
      console.log("Error:", error);
      alert("❌ Failed to create restaurant");
    }
  };
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/types");
        const data = await res.json();
        setTypes(data.data);
      } catch (error) {
        console.log("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <div className="space-y-6">
      {/* القسم العلوي التوضيحي للعنوان */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
            1. Restaurant Details
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            Create a new restaurant listing
          </h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-700">
          <Sparkles size={14} />
          Restaurant Management Panel
        </div>
      </div>

      {/* نموذج الاستمارة الرئيسي المطابق لتصميم الفندق */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.04)] space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* 1. اسم المطعم */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Restaurant Name
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Utensils size={18} className="text-red-600" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="The Golden Chef"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 2. نوع المطعم (قائمة منسدلة) */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Restaurant Type
            </span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            >
              <option value="" disabled>
                type of restaurant
              </option>

              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          {/* 3. الموقع */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">City</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <MapPin size={18} className="text-red-600" />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Downtown Boulevard, St. 5"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Location
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <MapPin size={18} className="text-red-600" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Downtown Boulevard, St. 5"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 4. رقم الهاتف الحقل الجديد */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Phone Number
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Phone size={18} className="text-red-600" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 5. التقييم ذكي يحمي من المدخلات العشوائية */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Initial Rating (0 to 5)
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-600/5 transition">
              <Star size={18} className="text-red-600" />
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                required
                value={rate}
                onChange={(e) => handleRateChange(e.target.value)}
                placeholder="4.5"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 text-slate-800 text-sm"
              />
            </div>
          </label>

          {/* 6. أوقات العمل من وإلى بساعة المتصفح الأنيقة */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Working Hours
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-red-500 focus-within:bg-white transition">
                <Clock size={14} className="text-red-600 flex-shrink-0" />
                <input
                  type="time"
                  required
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs text-slate-800 font-medium"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-red-500 focus-within:bg-white transition">
                <Clock size={14} className="text-red-600 flex-shrink-0" />
                <input
                  type="time"
                  required
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 7. الوصف الممتد الحقل الجديد */}
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Restaurant Description
            </span>
            <textarea
              rows="4"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the culinary style, signature dishes, atmosphere, and seating capacity."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-600/5 text-sm"
            />
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
                  {fileName
                    ? "Restaurant logo selected!"
                    : "Upload cover image"}
                </p>
                <p className="mt-0.5 text-xs text-slate-400 max-w-[240px] mx-auto truncate">
                  {fileName ? fileName : "Click to browse restaurant photo"}
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
              Save Restaurant Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
