import React, { useState, useEffect } from "react";
import { Input, Button, DatePicker } from "antd";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'

import ReactMarkdown from 'react-markdown'
import firebase from 'firebase'
import db from "../firebase";

import TextArea from "antd/lib/input/TextArea";
import { userStore } from "./Store";
import { navigate } from "@reach/router";

export default function EditAudio(props) {
      const user = userStore.useState((s) => s.user);

    const [id, setid] = useState('')
    const onidChange = (e) => setid(event.target.value);

    const [title, settitle] = useState('')
    const ontitleChange = (e) => settitle(event.target.value);

    const [desc, setdesc] = useState('')
    const ondescChange = (e) => setdesc(event.target.value);

    const [date, setdate] = useState(firebase.firestore.Timestamp.now())
    const ondateChange = (_, datestring) => {
        setdate(firebase.firestore.Timestamp.fromDate(new Date(datestring)))
    }

    useEffect(() => {
        db.collection("audio")
            .doc(props.id)
            .get()
            .then((snap) => {
                console.log(snap.data());
                let {
                    id, title, description, date
                } = snap.data();
                setid(id),
                    settitle(title),
                    setdate(date),
                    setdesc(description.replaceAll('\\n', '\n'))
            });
    }, []);

    const onSubmit = () => {
        console.log(id, title, desc, date)
        let data = {
            date,
            description: desc.replaceAll("\n", "\\n"),
            id,
            title,
            timestamp: firebase.firestore.Timestamp.now(),
        };
        console.log(data)
        db.collection("audio")
            .doc(props.id)
            .update(data)
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
                            value={desc}
                        />
                    </div>
                    <ReactMarkdown>{desc}</ReactMarkdown>

                </div>

                <div className="post_input_container">
                    <div className="post_input_title">
                        <h2>Date</h2>
                    </div>
                    <DatePicker onChange={ondateChange} />
                    {date.toDate().toString().substring(0, 15)}
                </div>
                <br />
               
                <div
                    className="post_input_button"
                    style={{ float: "right", margin: 20 }}
                >
                    {user.email == "sanhita@cbkm.in" ? (
                        <Button size="large" type="primary" onClick={onSubmit}>
                            Update Audio
                        </Button>
                    ) : (
                            `${user.displayName} You are not authorized to do this `
                        )}
                </div>
            </div>
        </div>
    )
}
