import React, { useState, useEffect } from "react";
import { Input, Button, Switch, Checkbox } from "antd";
import db from "../firebase";
import { navigate } from "@reach/router";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { userStore } from "./Store";

export default function EditMeeting(props) {
  const user = userStore.useState((s) => s.user);

  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("");
  const [zid, setZid] = useState("");
  const [desc, setDesc] = useState("");
  const [pass, setPass] = useState("");
  const [link, setLink] = useState("");
  const [available, setAvailable] = useState(false);
  const [lock, setLock] = useState(true);
  const [show, setShow] = useState(false);

  const onTitleChange = (e) => setTitle(event.target.value);
  const onMidChange = (e) => setMid(event.target.value);
  const onZidChange = (e) => setZid(event.target.value);
  const onDescChange = (e) => setDesc(event.target.value);
  const onPassChange = (e) => setPass(event.target.value);
  const onLinkChange = (e) => setLink(event.target.value);
  const onLockChange = (e) => setLock(e);
  const onAvailableChange = (e) => setAvailable(e);
  const onShowChange = (e) => setShow(e);
  useEffect(() => {
    db.collection("meetings")
      .doc(props.id)
      .get()
      .then((snap) => {
        console.log(snap.data());
        let {
          title,
          zid,
          mid,
          pass,
          desc,
          link,
          available,
          lock,
          show,
        } = snap.data();
        setTitle(title);
        setMid(mid);
        setZid(zid);
        setDesc(desc);
        setAvailable(available);
        setLink(link);
        setLock(lock);
        setPass(pass);
        setShow(show);
      });
  }, []);

  const onSubmit = () => {
    let data = {
      mid,
      zid,
      title,
      desc,
      pass,
      link,
      available,
      lock,
      show,
    };
    console.log(data);
    db.collection("meetings")
      .doc(props.id)
      .update(data)
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
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Available</h2>
          </div>
          <div className="post_input_value">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={available}
              onChange={onAvailableChange}
            />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Lock</h2>
          </div>
          <div className="post_input_value">
            <Switch
              checked={lock}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={onLockChange}
            />
          </div>
        </div>
        <div className="post_input_container">
          <div className="post_input_title">
            <h2>Show</h2>
          </div>
          <div className="post_input_value">
            <Switch
              checked={show}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={onShowChange}
            />
          </div>
        </div>
        <div
          className="post_input_button"
          style={{ float: "right", margin: 20 }}
        >
          {user.email == "rugved@cbkm.in" ? (
            <Button size="large" type="primary" onClick={onSubmit}>
              Update Meeting
            </Button>
          ) : (
            `${user.displayName} You are not authorized to do this `
          )}
        </div>
      </div>
    </div>
  );
}
