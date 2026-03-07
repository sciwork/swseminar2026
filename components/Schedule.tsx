import clsx from "clsx";
import { Fragment } from "react";
import DayLink from "@/components/DayLink";
import TalkInfoCard from "@/components/TalkInfoCard";
import { DayType } from "@/models/Schedule";
import dayjs from "@/utils/day";
import { getAggregatedTalksByTimeSlot } from "@/utils/schedule";

type Props = {
  days: DayType[];
  currentDay: dayjs.Dayjs | null;
};

const Schedule = ({ days, currentDay }: Props) => {
  const day = days.find((day) => day.date.isSame(currentDay, "day"));
  if (!day) return null;
  const timeSlots = getAggregatedTalksByTimeSlot(day.rooms);

  return (
    <>
      <div className="tw:mb-5 tw:flex tw:justify-center tw:gap-8 tw:tablet:mb-10">
        {days.map((day) => (
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
              className={clsx("tw:grid tw:gap-4", {
                "tablet:tw:grid-cols-2 tw:grid-cols-1":
                  timeSlot.talks.length > 1,
                "tw:grid-cols-1": timeSlot.talks.length === 1,
              })}
            >
              {timeSlot.talks.map((talk) => (
                <TalkInfoCard
                  key={talk.id}
                  variant={talk.type === "Non-talk" ? "general" : "booths"}
                  talk={talk}
                />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Schedule;
