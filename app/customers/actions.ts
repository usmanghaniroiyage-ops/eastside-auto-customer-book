"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getAuthenticatedSupabase() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  return supabase;
}

export async function addCustomer(formData: FormData) {
  const supabase = await getAuthenticatedSupabase();

  const name = (formData.get("name") as string).trim();
  const car_reg = (formData.get("car_reg") as string).toUpperCase().trim();
  const car_make = (formData.get("car_make") as string).trim();
  const car_model = (formData.get("car_model") as string).trim();

  const { error } = await supabase
    .from("customers")
    .insert({ name, car_reg, car_make, car_model });

  if (error) throw new Error(error.message);

  revalidatePath("/customers");
  redirect("/customers");
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = await getAuthenticatedSupabase();

  const name = (formData.get("name") as string).trim();
  const car_reg = (formData.get("car_reg") as string).toUpperCase().trim();
  const car_make = (formData.get("car_make") as string).trim();
  const car_model = (formData.get("car_model") as string).trim();

  const { error } = await supabase
    .from("customers")
    .update({ name, car_reg, car_make, car_model })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/customers");
  redirect("/customers");
}

export async function deleteCustomer(id: string, _formData: FormData) {
  const supabase = await getAuthenticatedSupabase();

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/customers");
}
