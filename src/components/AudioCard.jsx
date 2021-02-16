import React from 'react'
import { Button, Card, message } from "antd";
import { Link } from '@reach/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function AudioCard(props) {
    console.log("card", props)
    const { title, date, did } = props.audio
    const txt = `*${title.trim()}* \n Recording of *${date && date.toDate().toString().substring(3, 15)}* 😄🙏🏼\nhttps://meetings.cbkm.in/audio/${did} `
    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <Card
                    title={`${title ?? "no title"} ww| ${date.toDate().toString().substring(0, 15) ?? "no title"} `}
                >
                    <p>
                        <Link to={`/edit_audio/${did}`}>Edit</Link>
                        &nbsp;
                        <CopyToClipboard text={txt} onCopy={() => message.success("coppied")}>
                            <Button>copy </Button>
                        </CopyToClipboard>
                    </p>
                </Card>

            </div>
        </div>
    )
}
