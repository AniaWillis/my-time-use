import { Activity, DayRecord, RecordsData } from "../types/records";
import { supabase } from "../auth/supabase-client";

export async function fetchAllRecords(): Promise<RecordsData> {
  const { data: dailyRecords, error: dailyError } = await supabase
    .from("dailyRecords")
    .select("*");

  const { data: activities, error: activitiesError } = await supabase
    .from("activities")
    .select("*");

  if (dailyError || activitiesError) {
    throw new Error("Failed to fetch data from Supabase");
  }

  return { dailyRecords: dailyRecords || [], activities: activities || [] };
}

export async function createDateRecordApi(newDay: DayRecord) {
  const { data, error } = await supabase
    .from("dailyRecords")
    .insert([newDay])
    .select()
    .single();

  if (error) throw new Error(`Failed to add a day record: ${error.message}`);
  return data;
}

export async function updateDateApi(date: string, id: string) {
  const { data: updatedDay, error: updateError } = await supabase
    .from("dailyRecords")
    .update({ date })
    .eq("id", id)
    .select()
    .single();

  if (updateError) throw new Error("Failed to update the date");

  const { data: activities, error: activityFetchError } = await supabase
    .from("activities")
    .select("*")
    .eq("dateId", id);

  if (activityFetchError)
    throw new Error("Failed to fetch associated activities");

  const updates = activities.map((activity) =>
    supabase.from("activities").update({ date }).eq("id", activity.id)
  );

  const updateResults = await Promise.all(updates);
  const failed = updateResults.find((result) => result.error);

  if (failed) throw new Error("Failed to update one or more activities");

  return updatedDay;
}

export async function deleteDailyRecordApi(id: string) {
  const { data: activities, error: activityFetchError } = await supabase
    .from("activities")
    .select("*")
    .eq("dateId", id);

  if (activityFetchError)
    throw new Error("Failed to fetch associated activities");

  const deletions = activities.map((activity) =>
    supabase.from("activities").delete().eq("id", activity.id)
  );

  const deleteResults = await Promise.all(deletions);
  const failed = deleteResults.find((result) => result.error);

  if (failed) throw new Error("Failed to delete one or more activities");

  const { error } = await supabase.from("dailyRecords").delete().eq("id", id);

  if (error) throw new Error("Failed to delete the day record");
  return id;
}

export async function addActivityApi(newActivity: Activity) {
  const { data, error } = await supabase
    .from("activities")
    .insert([newActivity])
    .select()
    .single();

  if (error) throw new Error("Failed to add an activity record.");
  return data;
}

export async function rateActivityApi(activityId: string, rating: string) {
  const { data, error } = await supabase
    .from("activities")
    .update({ rating })
    .eq("id", activityId)
    .select()
    .single();

  if (error) throw new Error("Failed to update rating");
  return data;
}

export async function updateActivityApi(updatedActivity: Activity) {
  const { id, ...fieldsToUpdate } = updatedActivity;

  const { data, error } = await supabase
    .from("activities")
    .update(fieldsToUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update activity");
  return data;
}

export async function deleteActivityApi(id: string) {
  const { error } = await supabase.from("activities").delete().eq("id", id);

  if (error) throw new Error("Failed to delete the activity record");
  return id;
}

export async function deleteAllRecordsApi() {
  const { error: activityError } = await supabase
    .from("activities")
    .delete()
    .not("id", "is", null);

  if (activityError) {
    throw new Error("Could not delete activities");
  }

  const { error: dailyError } = await supabase
    .from("dailyRecords")
    .delete()
    .not("id", "is", null);

  if (dailyError) {
    throw new Error("Could not delete daily records");
  }
}
