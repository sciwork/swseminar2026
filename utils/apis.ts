import { SCHEDULE_URL } from "@/configurations/constants";
import RawSchedule from "@/models/RawSchedule";
import Schedule, { ScheduleType } from "@/models/Schedule";

export async function getSchedule(): Promise<ScheduleType | null> {
  const res = await fetch(SCHEDULE_URL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null;
  }
  const json = await res.json();
  const rawSchedule = RawSchedule.fromJson(json);
  const schedule = Schedule.fromRaw(rawSchedule);

  return schedule;
}
