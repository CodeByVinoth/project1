import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

// ---------- Helper to format time ----------
const formatTime = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHours = h % 12 || 12;
  const formattedMinutes = m < 10 ? `0${m}` : m;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// ---------- Calendar ----------
const CustomDateAndTimePicker = ({ onClose, onContinue, initialSelection }) => {
  const [dateSelection, setDateSelection] = useState(initialSelection);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];

    const startDay = firstDayOfMonth.getDay();
    for (let i = 0; i < startDay; i++) days.push(null);

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return {
      month: date.toLocaleString("default", { month: "long" }),
      year,
      days,
    };
  };

  const calendar = generateCalendar(currentMonth);

  const handleDateClick = (date) => {
    if (!date || date < new Date().setHours(0, 0, 0, 0)) return;
    if (dateSelection.startDate && dateSelection.endDate) {
      setDateSelection({ ...dateSelection, startDate: date, endDate: null });
    } else if (dateSelection.startDate && date < dateSelection.startDate) {
      setDateSelection({
        ...dateSelection,
        startDate: date,
        endDate: dateSelection.endDate,
      });
    } else if (dateSelection.startDate) {
      setDateSelection({ ...dateSelection, endDate: date });
    } else {
      setDateSelection({ ...dateSelection, startDate: date });
    }
  };

  const isSelected = (date) => {
    if (!date) return false;
    const dateOnly = new Date(date.setHours(0, 0, 0, 0));
    const startOnly = dateSelection.startDate
      ? new Date(dateSelection.startDate.setHours(0, 0, 0, 0))
      : null;
    const endOnly = dateSelection.endDate
      ? new Date(dateSelection.endDate.setHours(0, 0, 0, 0))
      : null;

    if (startOnly && endOnly)
      return dateOnly >= startOnly && dateOnly <= endOnly;
    return startOnly && dateOnly.getTime() === startOnly.getTime();
  };

  const handleTimeChange = (e, type) => {
    const newHours = parseFloat(e.target.value);
    const newTime = formatTime(newHours);
    setDateSelection((prev) => ({ ...prev, [type]: newTime }));
  };

  const handleContinue = () => {
    onContinue(dateSelection);
  };

  const handleReset = () => {
    setDateSelection({
      startDate: new Date(),
      endDate: new Date(),
      startTime: "06:00 AM",
      endTime: "03:00 PM",
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const isPastDate = (date) => {
    if (!date) return false;
    return date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-[600px] h-[550px]  overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center text-2xs font-semibold text-black">
            <Calendar size={15} className="text-gray-600 mr-1" />
            <span>
              {dateSelection.startDate?.toLocaleDateString()} -{" "}
              {dateSelection.endDate?.toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-blue-600"
          >
            RESET
          </button>
        </div>

        {/* Month controls */}
        <div className="flex items-center justify-center space-x-4 mb-3">
          <button
            onClick={handlePreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <h4 className="text-sm font-semibold text-gray-800">
            {calendar.month} '{calendar.year.toString().slice(-2)}
          </h4>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-medium mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        <div className="grid grid-cols-7 text-center text-sm">
          {calendar.days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-1 transition-colors rounded-full ${
                day
                  ? isSelected(day)
                    ? "bg-blue-600 text-white font-bold"
                    : isPastDate(day)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-800 hover:bg-gray-100"
                  : "cursor-default"
              }`}
              disabled={!day || isPastDate(day)}
            >
              {day ? day.getDate() : ""}
            </button>
          ))}
        </div>

        {/* Time */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-800">
            Start Time
          </label>
          <input
            type="range"
            min="6"
            max="21"
            step="0.25"
            value={parseInt(dateSelection.startTime.split(":")[0])}
            onChange={(e) => handleTimeChange(e, "startTime")}
            className="w-full"
          />
          <label className="text-sm font-medium text-gray-800">End Time</label>
          <input
            type="range"
            min="6"
            max="21"
            step="0.25"
            value={parseInt(dateSelection.endTime.split(":")[0])}
            onChange={(e) => handleTimeChange(e, "endTime")}
            className="w-full"
          />
        </div>

        <div className="mt-5">
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Location Picker (Final Redesigned Version) ----------
const LocationPicker = ({ onClose, onSelectLocation }) => {
  const suggestedLocations = [
    {
      name: "Majestic Bus Stand",
      details: "Kempegowda, Bengaluru, Karnataka 560009, India",
    },
    {
      name: "Yeshwanthpur, Bengaluru",
      details: "Yeshwanthpur, Bengaluru, Karnataka, India",
    },
    {
      name: "BTM Layout, Bengaluru",
      details: "BTM Layout, Bengaluru, Karnataka, India",
    },
    { name: "Bengaluru Palace", details: "Bengaluru, Karnataka, India" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl w-[800px] h-[600px] max-w-xl py-1 mx-auto overflow-hidden">
      {/* Header and Close Button */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">
          Search for the location
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <div className="px-6 pt-6 pb-4">
        {/* Search Input */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for the car location"
            className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Current Location */}
        <button
          onClick={() => onSelectLocation("Current Location")}
          className="w-full text-left p-4 mb-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 flex items-center gap-4 text-base font-semibold"
        >
          <MapPin size={24} className="text-blue-600" />
          <span className="text-gray-800">Current Location</span>
        </button>

        {/* Suggested Locations */}
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Suggested Locations
        </h4>
        <div className="space-y-3">
          {suggestedLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => onSelectLocation(location.name)}
              className="w-full text-left p-2.5 rounded-lg flex items-start gap-4 transition-colors duration-200 hover:bg-gray-100"
            >
              <MapPin size={22} className="text-gray-500 mt-1" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {location.name}
                </div>
                <div className="text-2xs text-gray-500">{location.details}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end px-6 py-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

// ---------- Main Component (BookingForm) ----------
const BookingForm = () => {
  const [tripType, setTripType] = useState("single");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [activeLocationField, setActiveLocationField] = useState(null);

  const [dateSelection, setDateSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    startTime: "06:00 AM",
    endTime: "03:00 PM",
  });

  const [formData, setFormData] = useState({
    destination: "",
    pickupLocation: "",
    dropLocation: "",
    passengers: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, ...dateSelection });
  };

  const handleDateAndTimeContinue = (newSelection) => {
    setDateSelection(newSelection);
    setShowCalendar(false);
  };

  const handleLocationClick = (field) => {
    setActiveLocationField(field);
    setShowLocationPicker(true);
  };

  const handleLocationSelect = (location) => {
    if (activeLocationField === "pickup") {
      setFormData({ ...formData, pickupLocation: location });
    } else if (activeLocationField === "drop") {
      setFormData({ ...formData, dropLocation: location });
    }
    setShowLocationPicker(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-md relative mx-auto mt-6">
      <h3 className="text-center pb-3 text-lg font-semibold text-black">
        Your Trip, Our Responsibility
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination */}
        <div>
          <label className="block text-sm mb-1">Enter Destination</label>
          <div className="bg-gray-100 flex items-center gap-2 p-2 rounded-lg">
            <MapPin size={16} className="text-gray-500" />
            <input
              type="text"
              className="bg-transparent flex-1 text-sm outline-none"
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
            />
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm mb-1">Trip Dates</label>
          <div
            className="bg-gray-100 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => setShowCalendar(true)}
          >
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm">
              {dateSelection.startDate?.toLocaleDateString()} -{" "}
              {dateSelection.endDate?.toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Pickup & Drop */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Pickup Point"
            className="bg-gray-100 flex-1 p-2 rounded-lg text-sm cursor-pointer"
            value={formData.pickupLocation}
            readOnly
            onClick={() => handleLocationClick("pickup")}
          />
          <input
            type="text"
            placeholder="Drop Point"
            className="bg-gray-100 flex-1 p-2 rounded-lg text-sm cursor-pointer"
            value={formData.dropLocation}
            readOnly
            onClick={() => handleLocationClick("drop")}
          />
        </div>

        {/* Trip type */}
        <div className="flex rounded-lg overflow-hidden border">
          <button
            type="button"
            onClick={() => setTripType("single")}
            className={`flex-1 py-2 text-sm ${
              tripType === "single" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Single
          </button>
          <button
            type="button"
            onClick={() => setTripType("round")}
            className={`flex-1 py-2 text-sm ${
              tripType === "round" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Round
          </button>
        </div>
        {/* Passengers */}
        <input
          type="number"
          min="1"
          placeholder="Enter number of passengers"
          className="w-full bg-gray-100 p-2 rounded-lg text-sm"
          value={formData.passengers}
          onChange={(e) =>
            setFormData({ ...formData, passengers: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Start Trip
        </button>
      </form>

      {/* Calendar Overlay */}
      {showCalendar && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCalendar(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CustomDateAndTimePicker
              initialSelection={dateSelection}
              onClose={() => setShowCalendar(false)}
              onContinue={handleDateAndTimeContinue}
            />
          </div>
        </div>
      )}

      {/* Location Picker Overlay */}
      {showLocationPicker && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLocationPicker(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LocationPicker
              onClose={() => setShowLocationPicker(false)}
              onSelectLocation={handleLocationSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
