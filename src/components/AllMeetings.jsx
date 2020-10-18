import React, { useState, useEffect } from "react";
import db from "../firebase";
import MeetingCard from "./MeetingCard";

export default function AllMeetings() {
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    db.collection("meetings")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snap) => {
        let documents = await snap.docs.map((post) => {
          let data = post.data();
          return {
            id: post.id,
            ...data,
          };
        });
        setMeetings(documents);
      });
  }, []);
  console.log(meetings);
  return (
    <div>
      {meetings.map((m) => (
        <MeetingCard meeting={m} />
      ))}
    </div>
  );
}
