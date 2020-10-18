import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import db from "../firebase";
import { navigate } from "@reach/router";
import { userStore } from "./Store";

export default function CreateMeeting() {
  const user = userStore.useState((s) => s.user);

  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("");
  const [zid, setZid] = useState("");
  const [desc, setDesc] = useState("");
  const [pass, setPass] = useState("");
  const [link, setLink] = useState("");
  const onTitleChange = (e) => setTitle(event.target.value);
  const onMidChange = (e) => setMid(event.target.value);
  const onZidChange = (e) => setZid(event.target.value);
  const onDescChange = (e) => setDesc(event.target.value);
  const onPassChange = (e) => setPass(event.target.value);
  const onLinkChange = (e) => setLink(event.target.value);

  const onSubmit = () => {
    let data = {
      mid,
      zid,
      title,
      desc,
      pass,
      link,
      available: false,
      show: false,
      lock: true,
      timestamp: Date.now(),
    };
    db.collection("meetings")
      .add(data)
      .then(() => {
        navigate("/meetings");
      });
  };
  return (
    <div>
      <div className="post_inputs_container" style={{ marginTop: 20 }}>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Title</h2>
          </div>
          <div className="post_input_value">
            <Input placeholder="title" value={title} onChange={onTitleChange} />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Meeting ID</h2>
          </div>
          <div className="post_input_value">
            <Input
              placeholder="m-10-07-2020"
              value={mid}
              onChange={onMidChange}
            />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Description</h2>
          </div>
          <div className="post_input_value">
            <Input
              placeholder="Scheduled on 16-08-2020 at 5 pm"
              value={desc}
              onChange={onDescChange}
            />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Zoom Id</h2>
          </div>
          <div className="post_input_value">
            <Input placeholder="zoom id" value={zid} onChange={onZidChange} />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Zoom Password</h2>
          </div>
          <div className="post_input_value">
            <Input
              placeholder="zoom password"
              value={pass}
              onChange={onPassChange}
            />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Zoom Link</h2>
          </div>
          <div className="post_input_value">
            <Input
              placeholder="zoom link"
              value={link}
              onChange={onLinkChange}
            />
          </div>
        </div>
        <div
          className="post_input_button"
          style={{ float: "right", margin: 20 }}
        >
          {user.email == "rugved@cbkm.in" ? (
            <Button size="large" type="primary" onClick={onSubmit}>
              Create Meeting
            </Button>
          ) : (
            `${user.displayName} You are not authorized to do this `
          )}
        </div>
      </div>
    </div>
  );
}
