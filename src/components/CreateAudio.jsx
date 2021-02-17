import React, { useState, useEffect } from "react";
import { Input, Button, DatePicker } from "antd";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'

import ReactMarkdown from 'react-markdown'
import firebase from 'firebase'
import db from "../firebase";
import { navigate } from "@reach/router";
import { userStore } from "./Store";
import TextArea from "antd/lib/input/TextArea";

export default function CreateAudio() {
    const user = userStore.useState((s) => s.user);


    const [id, setid] = useState('')
    const onidChange = (e) => setid(event.target.value);

    const [title, settitle] = useState('')
    const ontitleChange = (e) => settitle(event.target.value);

    const [desc, setdesc] = useState('')
    const ondescChange = (e) => setdesc(event.target.value);

    const [date, setdate] = useState('')
    const ondateChange = (_, datestring) => {
        setdate(firebase.firestore.Timestamp.fromDate(new Date(datestring)))
    }

    const onSubmit = () => {
        console.log(id, title, desc, date)
        let data = {
            date,
            description: desc.replaceAll("\n", "\\n"),
            id,
            title,
            liked: 0,
            views: 0,
            timestamp: firebase.firestore.Timestamp.now(),
            mul: `gsg
            sdgdsg
            sdgsdg
            sdgsg`
        };
        console.log(data)
        db.collection("audio")
            .add(data)
            .then(() => {
                navigate("/audio");
            });
    }
    return (
        <div>
            <div className="post_inputs_container" style={{ marginTop: 20 }}>
                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Id</h2>
                    </div>
                    <div className="post_input_value">
                        <Input placeholder="ID" value={id} onChange={onidChange} />
                    </div>
                    <AudioPlayer
                        customAdditionalControls={[]}
                        src={`https://docs.google.com/uc?export=download&id=${id}`}
                        onCanPlay={e => { console.log("onCanPlay") }}
                    />
                </div>

                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Title</h2>
                    </div>
                    <div className="post_input_value">
                        <Input placeholder="Title" value={title} onChange={ontitleChange} />
                    </div>
                </div>

                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Description</h2>
                    </div>
                    <div className="post_input_value">
                        <TextArea placeholder="Description"
                            id="desc"
                            rows="3" cols="10"
                            style={{ whiteSpace: "pre-wrap" }}
                            onChange={ondescChange}
                            allowClear={true}

                        />
                    </div>
                    <ReactMarkdown>{desc}</ReactMarkdown>

                </div>

                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Date</h2>
                    </div>
                    <DatePicker onChange={ondateChange} />
                </div>

                <div
                    className="post_input_button"
                    style={{ float: "right", margin: 20 }}
                >
                    {user.email == "sanhita@cbkm.in" ? (
                        <Button size="large" type="primary" onClick={onSubmit}>
                            Create Audio
                        </Button>
                    ) : (
                            `${user.displayName} You are not authorized to do this `
                        )}
                        <br/><br/>
                        <br/><br/>

                </div>
            </div>
        </div>
    )
}
