import { useMemo, useState } from "react";
import { EventType } from "../@types";
import "./Event.scss";

const Event = (props: { event: EventType }) => {
  const timeClasses = useMemo(() => {
    if (props.event.day_time_sentence.includes("HAPPENING NOW")) {
      return "time active";
    }
    return "time";
  }, []);
  return (
    <div className="event">
      <img src={props.event.cover_photo.photo.image.uri} alt="" />
      <div className="event-info">
        <p className={timeClasses}>{props.event.day_time_sentence}</p>
        <a href={props.event.eventUrl} className="name">
          {props.event.name}
        </a>
        <p className="attending">
          {props.event.interested} interested {props.event.going} going
        </p>
      </div>
    </div>
  );
};

export default Event;
