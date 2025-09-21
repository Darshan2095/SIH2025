// components/FilterSidebar.js
export default function FilterSidebar() {
  return (
    <div className="w-72 p-6  bg-white sticky top-0 h-screen overflow-y-auto shadow-2xl rounded-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Filters</h2>
        <button className="text-blue-600 text-sm">Reset</button>
      </div>

      {/* State */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">State</h3>
        <select className="w-full border rounded p-2">
          <option>All</option>
          <option>Jammu & Kashmir</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
        </select>
      </div>

      {/* Gender */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Gender</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> All (387)</label>
          <label><input type="checkbox" /> Female (15)</label>
          <label><input type="checkbox" /> Male (12)</label>
        </div>
      </div>

      {/* Age */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Age</h3>
        <select className="w-full border rounded p-2">
          <option>All</option>
          <option>10-18</option>
          <option>18-25</option>
          <option>25-30</option>
        </select>
      </div>

      {/* Caste */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Caste</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> All (355)</label>
          <label><input type="checkbox" /> SC (24)</label>
          <label><input type="checkbox" /> ST (18)</label>
          <label><input type="checkbox" /> General (14)</label>
        </div>
      </div>

      {/* Ministry Name */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Ministry Name</h3>
        <div className="flex flex-col gap-1">
          <label><input type="checkbox" /> Ministry of Agriculture (29)</label>
          <label><input type="checkbox" /> Ministry of Commerce (16)</label>
          <label><input type="checkbox" /> Ministry of Fisheries (7)</label>
        </div>
      </div>
    </div>
  );
}
