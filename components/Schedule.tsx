"use client";

import { Fragment, useEffect, useState } from "react";
import DayLink from "@/components/DayLink";
import TalkInfoCard from "@/components/TalkInfoCard";
import { DayType } from "@/models/Schedule";
import dayjs from "@/utils/day";
import { isDesktop } from "@/utils/device";
import { getAggregatedTalksByTimeSlot } from "@/utils/schedule";

type Props = {
  days: DayType[];
  currentDay: dayjs.Dayjs | null;
};

const Schedule = ({ days, currentDay }: Props) => {
  const [desktop, setDesktop] = useState(isDesktop());

  useEffect(() => {
    const handleResize = () => {
      setDesktop(isDesktop());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const day = days.find((day) => day.date.isSame(currentDay, "day"));
  if (!day) return null;
  const timeSlots = getAggregatedTalksByTimeSlot(day.rooms);
  return (
    <>
      <div className="tw:mb-5 tw:flex tw:justify-center tw:gap-8 tw:tablet:mb-10">
        {days.length > 1 &&
          days.map((day) => (
            <DayLink
              key={day.date.format("MM-DD")}
              to={`/program?day=${day.date.format("YYYY-MM-DD")}`}
              active={day.date.isSame(currentDay, "day")}
            >
              {day.date.format("ddd, MM/DD")}
            </DayLink>
          ))}
      </div>
      <div className="tw:flex tw:flex-col tw:gap-6 tw:tablet:gap-8">
        {timeSlots.map((timeSlot) => (
          <Fragment key={`timeslot-${timeSlot.date.format()}`}>
            <div className="tw:text-center tw:font-yk tw:text-2xl tw:tablet:text-3xl">
              {timeSlot.date.format("HH:mm")}
            </div>
            <div
              className="tw:grid tw:gap-4"
              style={{
                gridTemplateColumns: desktop
                  ? `repeat(${Object.keys(timeSlot.roomTalks).length}, minmax(0, 1fr))`
                  : "repeat(1, minmax(0, 1fr))",
              }}
            >
              {Object.keys(timeSlot.roomTalks).map((roomName) => (
                <div
                  className="tw:flex tw:flex-col tw:gap-4"
                  key={`timeslot-${timeSlot.date.format()}-${roomName}`}
                >
                  <div className="tw:hidden tw:text-center tw:font-yk tw:desktop:block">
                    {roomName}
                  </div>
                  {timeSlot.roomTalks[roomName].map((talk) => (
                    <TalkInfoCard
                      key={talk.id}
                      className="tw:flex-1"
                      variant={talk.type === "Non-talk" ? "general" : "booths"}
                      talk={talk}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Schedule;
