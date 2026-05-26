"use client";

import { Fragment, useEffect, useState } from "react";
import DayLink from "@/components/DayLink";
import TalkInfoCard from "@/components/TalkInfoCard";
import { DayType, RoomTalkMapType, TalkType } from "@/models/Schedule";
import dayjs from "@/utils/day";
import { isDesktop } from "@/utils/device";
import { alignToTimeSlot, getAggregatedTalksByTimeSlot } from "@/utils/schedule";

type Props = {
  days: DayType[];
  currentDay: dayjs.Dayjs | null;
  timeSlotMinutes: number;
};

type DesktopCellType = {
  row: number;
  roomName: string;
  talks: TalkType[];
  span: number;
};
const DESKTOP_TIME_SLOT_ROW_MIN_HEIGHT = "0.75rem";

const getTalkSpan = (talk: TalkType, timeSlotMinutes: number) => {
  const durationInMinutes = talk.end.diff(talk.start, "minute");

  return Math.max(1, Math.ceil(durationInMinutes / timeSlotMinutes));
};

const getTimelineSlots = (
  roomTalks: RoomTalkMapType,
  timeSlotMinutes: number,
) => {
  const talks = Object.values(roomTalks).flat();
  if (talks.length === 0) {
    return [];
  }

  const earliestStart = talks.reduce((currentEarliest, talk) => {
    if (talk.start.isBefore(currentEarliest)) {
      return talk.start;
    }

    return currentEarliest;
  }, talks[0].start);
  const latestEnd = talks.reduce((currentLatest, talk) => {
    if (talk.end.isAfter(currentLatest)) {
      return talk.end;
    }

    return currentLatest;
  }, talks[0].end);
  const alignedStart = alignToTimeSlot(earliestStart, timeSlotMinutes);

  const slots = [];
  let current = alignedStart;
  while (current.isBefore(latestEnd)) {
    slots.push(current);
    current = current.add(timeSlotMinutes, "minute");
  }

  return slots;
};

const getTalkStartTimeSet = (roomTalks: RoomTalkMapType, timeSlotMinutes: number) => {
  return new Set(
    Object.values(roomTalks)
      .flat()
      .map((talk) => {
        return alignToTimeSlot(talk.start, timeSlotMinutes).format();
      }),
  );
};

const getTalksByRoomAndTimeSlot = (
  roomTalks: RoomTalkMapType,
  roomNames: string[],
  timeSlotMinutes: number,
) => {
  return roomNames.reduce(
    (acc, roomName) => {
      acc[roomName] = roomTalks[roomName].reduce(
        (roomAcc, talk) => {
          const key = alignToTimeSlot(talk.start, timeSlotMinutes).format();
          if (!roomAcc[key]) {
            roomAcc[key] = [];
          }

          roomAcc[key].push(talk);
          return roomAcc;
        },
        {} as { [key: string]: TalkType[] },
      );

      return acc;
    },
    {} as { [key: string]: { [key: string]: TalkType[] } },
  );
};

const buildDesktopCells = (
  timelineSlots: dayjs.Dayjs[],
  roomTalks: RoomTalkMapType,
  roomNames: string[],
  timeSlotMinutes: number,
) => {
  const talksByRoomAndTimeSlot = getTalksByRoomAndTimeSlot(
    roomTalks,
    roomNames,
    timeSlotMinutes,
  );
  const occupiedUntilByRoom = roomNames.reduce(
    (acc, roomName) => {
      acc[roomName] = -1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  return timelineSlots.reduce((cells, timeSlot, rowIndex) => {
    roomNames.forEach((roomName) => {
      if (occupiedUntilByRoom[roomName] >= rowIndex) {
        return;
      }

      const talks = talksByRoomAndTimeSlot[roomName][timeSlot.format()] ?? [];
      if (talks.length === 0) {
        cells.push({
          row: rowIndex,
          roomName,
          talks: [],
          span: 1,
        });
        return;
      }

      const span = Math.max(
        ...talks.map((talk) => {
          return getTalkSpan(talk, timeSlotMinutes);
        }),
      );
      occupiedUntilByRoom[roomName] = rowIndex + span - 1;
      cells.push({
        row: rowIndex,
        roomName,
        talks,
        span,
      });
    });

    return cells;
  }, [] as DesktopCellType[]);
};

const Schedule = ({ days, currentDay, timeSlotMinutes }: Props) => {
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
  const roomNames = Object.keys(day.rooms);
  const timeSlots = getAggregatedTalksByTimeSlot(day.rooms);
  const timelineSlots = getTimelineSlots(day.rooms, timeSlotMinutes);
  const talkStartTimeSet = getTalkStartTimeSet(day.rooms, timeSlotMinutes);
  const desktopGridTemplateColumns = desktop
    ? `minmax(0, 5.5rem) repeat(${roomNames.length}, minmax(0, 1fr))`
    : "repeat(1, minmax(0, 1fr))";
  const desktopCells = buildDesktopCells(
    timelineSlots,
    day.rooms,
    roomNames,
    timeSlotMinutes,
  );
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
        <div
          className="tw:sticky tw:top-0 tw:z-10 tw:hidden tw:items-center tw:gap-4 tw:bg-white/90 tw:py-3 tw:backdrop-blur-sm tw:desktop:grid"
          style={{
            gridTemplateColumns: desktopGridTemplateColumns,
          }}
        >
          <div />
          {roomNames.map((roomName) => (
            <div
              className="tw:text-center tw:font-yk"
              key={`room-header-${roomName}`}
            >
              {roomName}
            </div>
          ))}
        </div>
        <div
          className="tw:hidden tw:items-stretch tw:gap-4 tw:desktop:grid"
          style={{
            gridTemplateColumns: desktopGridTemplateColumns,
            gridAutoRows: `minmax(${DESKTOP_TIME_SLOT_ROW_MIN_HEIGHT}, auto)`,
          }}
        >
          {timelineSlots.map((timeSlot, rowIndex) => (
            <div
              className="tw:flex tw:h-full tw:items-start tw:justify-center tw:pt-2 tw:text-center tw:font-yk tw:text-2xl"
              key={`desktop-timeslot-${timeSlot.format()}`}
              style={{
                gridColumn: 1,
                gridRow: rowIndex + 1,
              }}
            >
              {talkStartTimeSet.has(timeSlot.format()) ? timeSlot.format("HH:mm") : ""}
            </div>
          ))}
          {desktopCells.map((cell) => {
            const roomIndex = roomNames.indexOf(cell.roomName);
            if (roomIndex === -1) {
              return null;
            }

            const key = `desktop-cell-${cell.roomName}-${cell.row}`;
            const style = {
              gridColumn: roomIndex + 2,
              gridRow: `${cell.row + 1} / span ${cell.span}`,
            };

            if (cell.talks.length === 0) {
              return <div className="tw:min-h-0" key={key} style={style} />;
            }

            return (
              <div
                className="tw:flex tw:h-full tw:flex-col tw:gap-4"
                key={key}
                style={style}
              >
                {cell.talks.map((talk) => (
                  <TalkInfoCard
                    key={talk.id}
                    className="tw:h-full"
                    variant={talk.type}
                    talk={talk}
                  />
                ))}
              </div>
            );
          })}
        </div>
        {timeSlots.map((timeSlot) => (
          <Fragment key={`timeslot-${timeSlot.date.format()}`}>
            <div className="tw:text-center tw:font-yk tw:text-2xl tw:tablet:text-3xl tw:desktop:hidden">
              {timeSlot.date.format("HH:mm")}
            </div>
            <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:desktop:hidden">
              {timeSlot.talks.map((talk) => (
                <TalkInfoCard
                  key={talk.id}
                  variant={talk.type}
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
