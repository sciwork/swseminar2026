import { RoomTalkMapType, TalkType } from "@/models/Schedule";
import dayjs from "@/utils/day";

const duration = 10;

const floorByDuration = (time: dayjs.Dayjs, d: number) => {
  return time.subtract(time.minute() % d, "minute");
};

export const getAggregatedTalksByTimeSlot = (roomTalks: RoomTalkMapType) => {
  const roomNames = Object.keys(roomTalks);

  const aggregatedDateTalksMap: {
    [key: string]: TalkType[];
  } = {};
  Object.keys(roomTalks).forEach((roomName) => {
    roomTalks[roomName].forEach((talk) => {
      // align the room session date time
      const alignedDate = floorByDuration(talk.date, duration);
      const key = alignedDate.format();
      if (aggregatedDateTalksMap[key]) {
        aggregatedDateTalksMap[key].push(talk);
      } else {
        aggregatedDateTalksMap[key] = [talk];
      }
    });
  });

  // to array
  const aggregatedTalks = Object.keys(aggregatedDateTalksMap).map((key) => {
    const talks = aggregatedDateTalksMap[key].toSorted((a, b) =>
      a.date.isBefore(b.date) ? -1 : 1,
    );

    const aggregatedRoomTalksMap: {
      [key: string]: TalkType[];
    } = {};

    roomNames.forEach((roomName) => {
      aggregatedRoomTalksMap[roomName] = [];
    });

    talks.forEach((talk) => {
      aggregatedRoomTalksMap[talk.room].push(talk);
    });

    return {
      date: talks[0].date,
      roomTalks: aggregatedRoomTalksMap,
    };
  });
  // sort by date asc
  return aggregatedTalks.sort((a, b) => {
    return a.date.isBefore(b.date) ? -1 : 1;
  });
};
