import React from 'react'
import { Card } from "antd";
import { Link } from '@reach/router';

export default function AudioCard(props) {
    console.log("card", props)
    const { title, date, did } = props.audio
    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <Card
                    title={`${title ?? "no title"} | ${date.toDate().toString().substring(0, 15) ?? "no title"} `}
                >
                    <p>
                        <Link to={`/edit_audio/${did}`}>Edit</Link>
                    </p>
                </Card>
            </div>
        </div>
    )
}
