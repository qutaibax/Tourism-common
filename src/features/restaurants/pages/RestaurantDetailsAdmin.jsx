import React, { useState } from "react";

export default function RestaurantDetailsAdmin() {
  // State to toggle between View mode and Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Dummy restaurant data with separate structured 24h format times for easier form handling
  const [restaurant, setRestaurant] = useState({
    name: "The Golden Chef",
    type: "type of restaurant",
    city: "Downtown Boulevard, St. 5",
    location: "Downtown Boulevard, St. 5",
    phone: "+971 50 123 4567",
    rating: 5,
    hoursStart: "09:00", // 24-hour format standard for inputs
    hoursEnd: "23:00", // 24-hour format standard for inputs
    description:
      "Provide details about the culinary style, signature dishes, atmosphere, and seating capacity.",
  });

  // Helper function to format 24h string back to beautiful AM/PM for view mode
  const formatTimeStr = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = parseInt(hourString, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold text-[#E50000] tracking-wider uppercase">
            Food & Beverage
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            {isEditing ? "Edit Restaurant Details" : restaurant.name}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-[#E50000] text-white font-medium hover:bg-red-700 transition shadow-lg shadow-red-600/20"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 rounded-xl bg-[#E50000] text-white font-medium hover:bg-red-700 transition shadow-lg shadow-red-600/20"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          {/* Restaurant Name */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Restaurant Name
            </label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={restaurant.name}
                className="w-full bg-[#F4F6F9] px-4 py-3 rounded-xl border border-transparent focus:border-slate-200 focus:bg-white outline-none text-slate-900"
              />
            ) : (
              <p className="text-lg font-semibold text-slate-800 bg-[#F4F6F9]/50 p-3 rounded-xl border border-slate-100">
                🍴 {restaurant.name}
              </p>
            )}
          </div>

          {/* Restaurant Type & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Restaurant Type
              </label>
              {isEditing ? (
                <select
                  defaultValue={restaurant.type}
                  className="w-full bg-[#F4F6F9] px-4 py-3 rounded-xl outline-none text-slate-900"
                >
                  <option value="type of restaurant">type of restaurant</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Fine Dining">Fine Dining</option>
                </select>
              ) : (
                <p className="text-slate-700 bg-[#F4F6F9]/30 p-3 rounded-xl border border-slate-100">
                  {restaurant.type}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={restaurant.phone}
                  className="w-full bg-[#F4F6F9] px-4 py-3 rounded-xl outline-none text-slate-900"
                />
              ) : (
                <p className="text-slate-700 font-mono bg-[#F4F6F9]/30 p-3 rounded-xl border border-slate-100">
                  📞 {restaurant.phone}
                </p>
              )}
            </div>
          </div>

          {/* City & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={restaurant.city}
                  className="w-full bg-[#F4F6F9] px-4 py-3 rounded-xl outline-none text-slate-900"
                />
              ) : (
                <p className="text-slate-700 bg-[#F4F6F9]/30 p-3 rounded-xl border border-slate-100">
                  📍 {restaurant.city}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={restaurant.location}
                  className="w-full bg-[#F4F6F9] px-4 py-3 rounded-xl outline-none text-slate-900"
                />
              ) : (
                <p className="text-slate-700 bg-[#F4F6F9]/30 p-3 rounded-xl border border-slate-100">
                  🗺️ {restaurant.location}
                </p>
              )}
            </div>
          </div>

          {/* Restaurant Description */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Restaurant Description
            </label>
            {isEditing ? (
              <textarea
                rows="4"
                defaultValue={restaurant.description}
                className="w-full bg-[#F4F6F9] p-4 rounded-xl outline-none text-slate-900"
              />
            ) : (
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                {restaurant.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Media, Ratings & Time Picker */}
        <div className="space-y-6">
          {/* Cover Image Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-left mb-3">
              Cover Image
            </label>
            <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden mb-4">
              <span className="text-slate-400 text-sm font-medium">
                Current Restaurant Photo
              </span>
            </div>
            {isEditing && (
              <button className="text-xs text-[#E50000] font-bold underline hover:text-red-700 transition">
                Upload new image
              </button>
            )}
          </div>

          {/* Ratings & Interactive Working Hours Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Initial Rating (0 to 5)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={restaurant.rating}
                  className="w-full bg-[#F4F6F9] px-4 py-2 rounded-xl outline-none text-slate-900"
                />
              ) : (
                <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
                  ⭐ {restaurant.rating} / 5
                </div>
              )}
            </div>

            {/* TIME EDITING ENHANCEMENT */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Working Hours
              </label>
              {isEditing ? (
                <div className="space-y-3 bg-[#F4F6F9]/60 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      Opens at:
                    </span>
                    <input
                      type="time"
                      defaultValue={restaurant.hoursStart}
                      className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-900 outline-none focus:border-red-500 font-medium"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      Closes at:
                    </span>
                    <input
                      type="time"
                      defaultValue={restaurant.hoursEnd}
                      className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-900 outline-none focus:border-red-500 font-medium"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-700 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100 inline-block w-full">
                  ⏱️ {formatTimeStr(restaurant.hoursStart)} -{" "}
                  {formatTimeStr(restaurant.hoursEnd)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
