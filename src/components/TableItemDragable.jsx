import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { addTable } from "../redux/tableSlice";

const TableItemDraggable = ({ table , roomId}) => {
    const dispatch = useDispatch();
    
    const [, dragRef] = useDrag({
        type: 'table',
        item: table,
        end: (item) => {
            if (item) {
              dispatch(
                addTable({
                  roomId,
                  table: { ...item, id: `table-${Date.now()}`, x: 0, y: 0 },
                })
              );
            }
          },
    });
    // console.log("table =============>>>", table)

    return (
        <Box
            ref={dragRef}
            sx={{
                border: '1px solid red',
                borderRadius: '4px',
                padding: 2,
                textAlign: 'center',
                cursor: 'grab',
                width: '120px', // Set a consistent width for items
                bgcolor: '#f9f9f9',
            }}
        >
            <img
                src={table.image}
                alt={`${table.shape} Table`}
                style={{ width: '100%', height: '80%', marginBottom: '8px', bgcolor:'transparent'}}
            />
            <Typography variant="body1">{table.id}</Typography>
            {/*<Typography variant="body2" color="textSecondary">
                Shape: {table.shape}
            </Typography> */}
            {/* <Typography variant="body2">
                Covers: {table.minCovers}-{table.maxCovers}
            </Typography> */}
        </Box>
    );
};

export default TableItemDraggable;
