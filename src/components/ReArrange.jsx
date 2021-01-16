import { Button, message, Switch } from 'antd';
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { redataStore } from './Store';
import { post } from "axios";



function DragTrComponent(props, sortable) {
    const { children = null, rowInfo } = props;
    if (rowInfo) {
        const { original, index } = rowInfo;
        const { id } = original;
        return (
            <Draggable isDragDisabled={sortable} key={id} index={index} draggableId={id}>
                {(draggableProvided, draggableSnapshot) => (
                    <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                    >
                        <ReactTable.defaultProps.TrComponent style={{ width: '100%' }}>
                            {children}
                        </ReactTable.defaultProps.TrComponent>
                    </div>
                )}
            </Draggable>
        );
    } else
        return (
            <ReactTable.defaultProps.TrComponent  >
                {children}
            </ReactTable.defaultProps.TrComponent>
        );

}

function DropTbodyComponent(props) {

    const { children = null } = props;

    return (
        <Droppable droppableId="droppable">
            {(droppableProvided, droppableSnapshot) => (
                <div ref={droppableProvided.innerRef}>
                    <ReactTable.defaultProps.TbodyComponent  >
                        {children}
                    </ReactTable.defaultProps.TbodyComponent>
                </div>
            )}
        </Droppable>
    );

}


export default function ReArrange() {
    const data = redataStore.useState((s) => s.data);

    const [sortable, setsortable] = useState(true);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const handleDragEnd = result => {
        console.log('handleDragEnd')
        if (!result.destination) {
            return;
        }

        const redata = reorder(
            data,
            result.source.index,
            result.destination.index
        );
        redataStore.update((s) => {
            s.data = [...redata]
        });
    };

    const getTrProps = (state, rowInfo) => {
        //  console.log(rowInfo);
        console.log('getTrProps')

        return { rowInfo };
    };


    return (
        <div>
            <Switch defaultChecked={!sortable} onChange={(x) => setsortable(!x)} />    DRAG
            <DragDropContext onDragEnd={handleDragEnd} >
                <ReactTable

                    TrComponent={(props) => DragTrComponent(props, sortable)}
                    TbodyComponent={DropTbodyComponent}
                    getTrProps={getTrProps}
                    data={data}
                    sortable={sortable}
                    onSortedChange={(x) =>
                        redataStore.update((s) => {
                            s.data = (
                                x[0].desc ? [...data]
                                    .sort((a, b) =>
                                        a[x[0].id] - b[x[0].id]
                                    ).reverse() :
                                    [...data]
                                        .sort((a, b) =>
                                            a[x[0].id] - b[x[0].id]
                                        )
                            )
                        })

                    }
                    // onSortedChange={console.log}
                    showPaginationBottom={false}
                    defaultPageSize={data.length}
                    columns={[
                        {
                            Header: "Zoom Name",
                            accessor: "Zoom Name",
                        },
                        {
                            Header: "Attendee",
                            accessor: "Attendee",
                        },
                        {
                            Header: "Questions",
                            accessor: "Question",
                        },
                        {
                            Header: "UK",
                            accessor: "Upasna Kendra",
                        },
                        {
                            Header: "WP",
                            accessor: "Mobile",
                        },
                        {
                            Header: "City",
                            accessor: "City",
                        },
                        {
                            Header: "id",
                            accessor: "id",
                        },

                    ]}
                    className="-striped -highlight"
                />
            </DragDropContext>
            <br />
            <Button onClick={() => {

                const newArray = data.map(({ id, timestamp, ...keepAttrs }) => keepAttrs)
                console.log(newArray)
                const key = "updatable";
                message.loading({
                    content: "Collecting data and converting to excel may take a while...",
                    duration: 10000,
                    key,
                });

                post("https://xlxlxlxl.herokuapp.com/xl", { data: newArray }).then((res) => {
                    if (res.data.success) {
                        message.success({ content: "Done!", key, duration: 2 });

                        window.open(
                            "https://xlxlxlxl.herokuapp.com/filename.xls",
                            "_blank"
                        );
                    }
                });
            }}>Download</Button>
        </div >
    )
}
