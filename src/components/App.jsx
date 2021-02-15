import React from "react";
import SignUp from "./SignUp.jsx";
import { Router, Link, navigate } from "@reach/router";
import {
  EditOutlined,
  AppstoreOutlined,
  StopOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { userStore } from "./Store";
import AllMeetings from "./AllMeetings";
import { Menu, PageHeader, Spin } from "antd";
import { auth } from "../firebase";
import CreateMeeting from "./CreateMeeting";
import EditMeeting from "./EditMeeting.jsx";
import ActiveMeetings from "./AtiveMeetings.jsx";
import InActiveMeetings from "./InActiveMeetings.jsx";
import ViewRegistered from "./ViewRegistered.jsx";
import ReArrange from "./ReArrange.jsx";
import CreateAudio from "./CreateAudio.jsx";
import Audios from "./Audios.jsx";
import EditAudio from './EditAudio'

export default function App() {
  const user = userStore.useState((s) => s.user);
  console.log("user", user);
  const signOut = () => {
    auth.signOut().then(() => navigate("/signup"));
  };
  return (
    <div>
      {user == false ? (
        <center>
          <Spin />
        </center>
      ) : (
          <div>
            <PageHeader
              style={{ border: "1px solid rgb(235, 237, 240)" }}
              title="Meetings"
              subTitle="CBKM"
              extra="CBKM"
            />
            {user && (
              <Menu mode="horizontal">
                <Menu.Item key="1" icon={<AppstoreOutlined />}>
                  <Link to="/meetings">All Meetings</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ClockCircleOutlined />}>
                  <Link to="/meetings/active">Active Meetings</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<StopOutlined />}>
                  <Link to="/meetings/inactive">InActive Meetings</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<EditOutlined />}>
                  <Link to="/create_meeting">Create Meeting</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<EditOutlined />}>
                  <Link to="/create_audio">Create Recording</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<EditOutlined />}>
                  <Link to="/audio">All Recording </Link>
                </Menu.Item>
                <Menu.Item key="7" style={{ float: "right" }} onClick={signOut}>
                  <p>Sign Out</p>
                </Menu.Item>
              </Menu>
            )}

            <Router>
              {!user ? (
                <SignUp default path="/signup" />
              ) : (
                  <>
                    <AllMeetings default path="/meetings" />
                    <CreateMeeting path="/create_meeting" />
                    <EditAudio path="/edit_audio/:id" />
                    <EditMeeting path="/edit/:id" />
                    <ActiveMeetings path="/meetings/active" />
                    <InActiveMeetings path="/meetings/inactive" />
                    <ViewRegistered path="/view/:id/:lock" />
                    <ReArrange path="/rearrange" />
                    <CreateAudio path="/create_audio" />
                    <Audios path="/audio" />
                  </>
                )}
            </Router>
          </div>
        )}
    </div>
  );
}



