"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Article from "@/components/Article";
import ScheduleComponent from "@/components/Schedule";
import ToBeAnnounced from "@/components/ToBeAnnounced";
import { DayType } from "@/models/Schedule";
import { getSchedule } from "@/utils/apis";
import dayjs from "@/utils/day";

const getTimeSlotMinutes = (timeslotDuration: string | undefined) => {
  if (!timeslotDuration) {
    return 10;
  }

  const [hours, minutes] = timeslotDuration.split(":").map((value) => {
    return parseInt(value, 10);
  });

  return hours * 60 + minutes;
};

const getCurrentDay = (
  days: DayType[],
  searchDay: string | null,
): dayjs.Dayjs | null => {
  if (searchDay) {
    // assert that searchDay is in the schedule
    const d = days.find(
      (day) => day.date.format("YYYY-MM-DD") === searchDay,
    )?.date;

    if (d) {
      return d;
    }
  }

  // if searchDay is not in the schedule or not provided
  // return the first day
  return days[0]?.date ?? null;
};

const Page = () => {
  const searchParams = useSearchParams();
  const searchDay = searchParams.get("day");
  const [days, setDays] = useState<DayType[]>([]);
  const [timeSlotMinutes, setTimeSlotMinutes] = useState(10);
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      const schedule = await getSchedule();
      const newDays = schedule?.conference?.days ?? [];
      setTimeSlotMinutes(
        getTimeSlotMinutes(schedule?.conference?.timeslotDuration),
      );
      setDays(newDays);
      setCurrentDay(getCurrentDay(newDays, searchDay));
      setLoading(false);
    }

    fetchSchedule();
  }, [searchDay]);

  if (isLoading) {
    return <Article>Loading...</Article>;
  }

  return (
    <Article>
      {days.length === 0 ? (
        <ToBeAnnounced />
      ) : (
        <ScheduleComponent
          days={days}
          currentDay={currentDay}
          timeSlotMinutes={timeSlotMinutes}
        />
      )}
    </Article>
  );
};

export default Page;
