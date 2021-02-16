import React, { useEffect, useState } from 'react'
import db from '../firebase';
import AudioCard from './AudioCard';

export default function Audios() {
    console.log("audios");

    const [audios, setaudios] = useState([]);
    useEffect(() => {
        db.collection("audio")
            .orderBy("date", "desc")
            .onSnapshot(async (snap) => {
                let documents = await snap.docs.map((post) => {
                    let data = post.data();
                    return {
                        did: post.id,
                        ...data,
                    };
                });
                setaudios(documents);
            });
    }, []);
    return (
        <div>
            {audios.map((a) => (
                <AudioCard audio={a} />
            ))}
        </div>
    )
}
