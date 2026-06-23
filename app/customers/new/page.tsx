import { addCustomer } from "../actions";
import Link from "next/link";

export default function NewCustomerPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link
          href="/customers"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to customers
        </Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: "#1C1F21" }}>
          Add Customer
        </h1>
      </div>

      <form
        action={addCustomer}
        className="bg-white rounded border border-gray-200 p-6 flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            name="name"
            required
            placeholder="John Smith"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#E8821A" } as React.CSSProperties}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Plate
          </label>
          <input
            name="car_reg"
            required
            placeholder="AB12 CDE"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono uppercase tracking-widest focus:outline-none focus:ring-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <input
              name="car_make"
              required
              placeholder="Ford"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              name="car_model"
              required
              placeholder="Focus"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 px-4 py-2 rounded text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ background: "#E8821A" }}
        >
          Save Customer
        </button>
      </form>
    </div>
  );
}
