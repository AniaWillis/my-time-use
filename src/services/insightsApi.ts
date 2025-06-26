import { Insight } from "../types/insights_context";
import { supabase } from "../auth/supabase-client";

export async function fetchInsightsDataApi() {
  const { data: userInsights, error: userInsightsError } = await supabase
    .from("userInsights")
    .select("*");

  if (userInsightsError) {
    throw new Error("Failed to fetch data from Supabase");
  }

  return { userInsights: userInsights || [] };
}

export async function createListItemApi(newItem: Insight) {
  const { data, error } = await supabase
    .from("userInsights")
    .insert([newItem])
    .select()
    .single();
  if (error) throw new Error(`Failed to add a new list item: ${error.message}`);
  return data;
}

export async function updateListItemApi(updatedItem: Insight) {
  const { id, ...fieldsToUpdate } = updatedItem;
  const { data, error } = await supabase
    .from("userInsights")
    .update(fieldsToUpdate)
    .eq("id", id)
    .select()
    .single();
  if (error)
    throw new Error(`Failed to update the list item: ${error.message}`);
  return data;
}

export async function deleteListItemApi(id: string) {
  const { error } = await supabase.from("userInsights").delete().eq("id", id);
  if (error)
    throw new Error(`Failed to delete the list item: ${error.message}`);
  return id;
}
