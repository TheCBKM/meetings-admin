import React, { useState, useEffect } from "react";
import db from "../firebase";
import { Table, Button, Card, message } from "antd";
import { Link, navigate } from "@reach/router";
import { post } from "axios";
import { redataStore } from "./Store";

export default function ViewRegistered(props) {
  const redata = redataStore.useState((s) => s.data);
  console.log("redata", redata)

  console.log(props.lock);
  const [data, setdata] = useState([]);
  const [logsAttendeeCount, setLogsAttendeeCount] = useState(0);
  const [logsQuestionsCount, setLogsQuestionsCount] = useState(0);
  const [logsRegisterCount, setLogsRegisterCount] = useState(0);
  const columns = [
    {
      title: "Zoom Name",
      dataIndex: "Zoom Name",
      key: "Zoom Name",
    },
    {
      title: "Attendee",
      dataIndex: "Attendee",
      key: "Attendee",
    },
    {
      title: "Questions",
      dataIndex: "Question",
      key: "Question",
    },
    {
      title: "UK",
      dataIndex: "Upasna Kendra",
      key: "Upasna Kendra",
    },
    {
      title: "WP",
      dataIndex: "Mobile",
      key: "Mobile",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
  ];

  useEffect(() => {
    db.collection("meetings")
      .doc(props.id)
      .collection("attendee")
      .orderBy("timestamp", "desc")
      .onSnapshot(async (snap) => {
        console.log(snap.docs[0].data());
        let c1 = 0,
          c2 = 0,
          c3 = 0;
        let documents = await snap.docs.map((post) => {
          let data = post.data();
          c1 += 1;
          c2 += data.question ? Number(data.question) : 0;
          c3 += data.atendee ? Number(data.atendee) : 0;
          return {
            "Zoom Name": data.zoomname,
            Attendee: Number(data.atendee),
            Question: Number(data.question),
            City: data.city,
            Mobile: Number(data.whatsapp),
            "Upasna Kendra": data.uk,
            autUser: data.autUser,
            id: data.autUser.uid,
            timestamp: data.timestamp,
          };
        });
        console.log("documents", documents);
        redataStore.update((s) => {
          documents.forEach((elm) => delete elm.autUser);
          console.log('redataStore')
          s.data = [...documents]
        });
        setdata(documents);
        setLogsRegisterCount(c1);
        setLogsQuestionsCount(c2);
        setLogsAttendeeCount(c3);
      });

  }, []);

  return (
    <div>
      <Card style={{ marginBottom: 10 }} title="Analytics">
        <p>Total Registered :{logsRegisterCount}</p>
        <p>Total Attendee :{logsAttendeeCount}</p>
        <p>Total Questions :{logsQuestionsCount}</p>
        <Button
          disabled={props.lock == "f" ? true : false}
          onClick={() => {
            data.forEach((elm) => delete elm.autUser);
            const key = "updatable";

            console.log(data);
            message.loading({
              content: "Collecting data and converting to excel may take a while...",
              key,
            });

            message;
            post("https://xlxlxlxl.herokuapp.com/xl", { data }).then((res) => {
              if (res.data.success) {
                message.success({ content: "Done!", key, duration: 2 });

                window.open(
                  "https://xlxlxlxl.herokuapp.com/filename.xls",
                  "_blank"
                );
              }
            });
          }}
        >
          {props.lock == "f"
            ? "Cannot Export meeting is not locked by admin"
            : "Export"}
        </Button>
        <Link to="/rearrange"><Button>Arrange</Button></Link>
      </Card>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
