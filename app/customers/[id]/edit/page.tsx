import { createClient } from "@/lib/supabase/server";
import { updateCustomer } from "../../actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (!customer) redirect("/customers");

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
          Edit Customer
        </h1>
        <p className="text-sm text-gray-500 mt-1">{customer.name}</p>
      </div>

      <form
        action={updateCustomer.bind(null, customer.id)}
        className="bg-white rounded border border-gray-200 p-6 flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            name="name"
            required
            defaultValue={customer.name}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Plate
          </label>
          <input
            name="car_reg"
            required
            defaultValue={customer.car_reg}
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
              defaultValue={customer.car_make}
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
              defaultValue={customer.car_model}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 px-4 py-2 rounded text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ background: "#E8821A" }}
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}
