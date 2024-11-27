import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Draggable from 'react-draggable';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Delete, RotateRight } from '@mui/icons-material';

const DroppableCanvas = ({ tables, onDeleteTable }) => {
    const [droppedTables, setDroppedTables] = useState([]);

    const [{ isOver }, dropRef] = useDrop({
        accept: 'table',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const newTable = {
                ...item,
                x: offset.x,
                y: offset.y,
            };
            console.log("offset.x ====>", offset.x)
            setDroppedTables((prev) => [...prev, newTable]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const controlledPosition = (e) => {
        console.log("position ====> ", e.pageX)
    }

    useEffect(() => {
        // console.log("positionX =====?", positionX)
    })


    return (
        <Box
            ref={dropRef}
            p={2}
            border={isOver ? '2px dashed green' : '2px dashed gray'}
            borderRadius="8px"
            height="75vh"
            bgcolor="transparent"
            position="relative"
        >
            {/* Display Dropped Tables */}
            {droppedTables.map((table, index) => (
                <Draggable
                defaultPosition={{x: 100, y: 0}}
                onMouseDown={(event) => controlledPosition(event)}
                >
                <Box
                    key={`${table.id}-${index}`}
                    position="absolute"
                    left={table.x}
                    top={table.y}
                    //   border="1px solid gray"
                    borderRadius="4px"
                    bgcolor="white"
                    p={1}
                    textAlign="center"
                    draggable="false"
                >
                    <Typography>{table.id}</Typography>
                    <img src={table.image}></img>
                    <Box mt={1}>
                        <IconButton onClick={() => onDeleteTable(table.id)}>
                            <Delete />
                        </IconButton>
                        <IconButton>
                            <RotateRight />
                        </IconButton>
                    </Box>
                </Box>
                </Draggable>
            ))}
        </Box>
    );
};

export default DroppableCanvas;
