import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteCustomer } from "./actions";

type Customer = {
  id: string;
  name: string;
  car_reg: string;
  car_make: string;
  car_model: string;
  created_at: string;
};

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  const count = customers?.length ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#1C1F21" }}>
            Customer Book
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {count} {count === 1 ? "customer" : "customers"} on record
          </p>
        </div>
        <Link
          href="/customers/new"
          className="px-4 py-2 rounded text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ background: "#E8821A" }}
        >
          + Add Customer
        </Link>
      </div>

      {/* Empty state */}
      {!customers?.length ? (
        <div
          className="text-center py-20 bg-white rounded border border-gray-200"
        >
          <p className="text-4xl mb-4">🚗</p>
          <p className="text-gray-500 font-medium">No customers yet.</p>
          <p className="text-gray-400 text-sm mt-1">
            Hit <strong>+ Add Customer</strong> to get started.
          </p>
        </div>
      ) : (
        /* Customer table */
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#1C1F21", color: "white" }}>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Reg</th>
                <th className="text-left px-4 py-3 font-medium">Make</th>
                <th className="text-left px-4 py-3 font-medium">Model</th>
                <th className="text-left px-4 py-3 font-medium">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {customers.map((c: Customer, i: number) => (
                <tr
                  key={c.id}
                  className="border-t border-gray-100 hover:bg-amber-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td
                    className="px-4 py-3 font-mono font-bold"
                    style={{ color: "#1C1F21" }}
                  >
                    {c.car_reg}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.car_make}</td>
                  <td className="px-4 py-3 text-gray-600">{c.car_model}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(c.created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <Link
                        href={`/customers/${c.id}/edit`}
                        className="px-3 py-1 rounded text-xs border font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Edit
                      </Link>
                      <form action={deleteCustomer.bind(null, c.id)}>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded text-xs border font-medium text-red-600 hover:bg-red-50 border-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
