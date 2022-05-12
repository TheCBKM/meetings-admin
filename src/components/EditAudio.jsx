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
      const playerRef = React.useRef(null)

    const [id, setid] = useState('')
    const onidChange = (e) => setid(event.target.value);

    const [title, settitle] = useState('')
    const ontitleChange = (e) => settitle(event.target.value);

    const [desc, setdesc] = useState('')
    const ondescChange = (e) => setdesc(event.target.value);

    const [date, setdate] = useState(firebase.firestore.Timestamp.now())

    const [timestamp, settimestamp] = useState('')
    const ontimestampChange = (e) => settimestamp(event.target.value);

    const [timeStamps, settimeStamps] = useState([])

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
                    id, title, description, date,ts
                } = snap.data();
                setid(id),
                    settitle(title),
                    setdate(date),
                    setdesc(description.replaceAll('\\n', '\n'))
                    settimeStamps(ts||[])
                    let str=''
                    ts && ts.map(t=>{
                        str+=`${t.title} @T ${t.time}\n`
                    })
                    settimestamp(str)
            });
    }, []);

    const onSubmit = () => {
        console.log(id, title, desc, date)
        let data = {
            date,
            description: desc.replaceAll("\n", "\\n"),
            id,
            title,
            ts:timeStamps,
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
                    ref={playerRef}
                        customAdditionalControls={[]}
                        src={id.includes('http')?id:`https://docs.google.com/uc?export=download&id=${id}`}
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
                        <h2>Time Stamps</h2>
                    </div>
                    <div className="post_input_value">
                        <TextArea required={true}
                            placeholder="Title @T hh:mm:ss"
                            rows="3" cols="10"
                            style={{ whiteSpace: "pre-wrap" }}
                            onChange={ontimestampChange}
                            allowClear={true}
                            value={timestamp}

                        />
                        <Button onClick={() => {

                            let ts = []
                            let stamps = timestamp.trim().split("\n")
                            stamps.map(s => {
                                let x = s.split('@T')
                                if (x.length == 2 && x[0].trim().length > 0 && x[1].trim().length == 8) {
                                    ts.push({ title: x[0].trim(), time: x[1].trim() })
                                }
                            })
                            settimeStamps(ts)
                            console.log(ts)
                        }}>Show</Button>
                    </div>
                    {timeStamps.map(ts => <div>
                        {ts.title}&nbsp;&nbsp;{
                            ts.time.split(':').map((t,i)=><span>{Number(t)>0?`${t}${i==2?"":":"}`:""}</span>) 
                            }&nbsp;&nbsp;
                        <Button onClick={() => {
                            var hms = ts.time;
                            var a = hms.split(':');
                            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            playerRef.current.audio.current.currentTime = seconds
                        }}>Play</Button>

                        <br />

                    </div>)}
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
                        <br/><br/>
                        <br/><br/>

                </div>
            </div>
        </div>
    )
}
