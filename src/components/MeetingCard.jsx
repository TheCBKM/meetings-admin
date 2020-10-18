import React from "react";
import { Card } from "antd";
import { Link } from "@reach/router";

export default function MeetingCard(props) {
  const { title, mid, id, show, lock } = props.meeting;
  console.log("show", show);
  return (
    <div style={{ marginTop: 20 }}>
      <Card
        title={`${title ?? "no title"} | ${mid ?? "no title"} `}
        extra={show ? "A" : "I"}
      >
        <p>
          <Link to={`/edit/${id}`}>Edit</Link>
        </p>
        <p>
          <Link to={`/view/${id}/${lock ? "t" : "f"}`}>View Registered</Link>
        </p>
      </Card>
    </div>
  );
}
