import React, { useState, useEffect } from 'react';
import { Form, useForm } from 'react-hook-form';
import { Box, TextField, FormLabel, Button, Typography, Switch, FormControlLabel, FormGroup, Checkbox, selectedTableAdvanced } from '@mui/material';
import { CheckBox, Label } from '@mui/icons-material';
import { useTableContext } from '../context/tableContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateTable } from '../redux/tableSlice';

const TableDetailsForm = ({ roomId, tableId, onSubmit, selectedTable, positionX, positionY }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { selectedTableAdvanced } = useTableContext();
  const [xAxis, setXAxis] = useState(selectedTableAdvanced?.x || '0');
  const [yAxis, setYAxis] = useState(selectedTableAdvanced?.y || '0');
  const dispatch = useDispatch();

  console.log("selectedTableAdvanced form page ====>>>>>>", selectedTableAdvanced);
  console.log("selectedTableAdvanced?.x ====>>>>>>", xAxis);
  console.log("selectedTableAdvanced?.y ====>>>>>>", yAxis);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const handleFormSubmit = (data) => {
    const tableData = {
      id: tableId,
      ...data,
      online: data.online || false,
      image: selectedTable.image,
      shape: selectedTable.shape,
    };
    onSubmit(roomId, tableData);
    reset(); // resert form inputs values
  };

  const { control } = useForm({
    progressive: true
  });

  const handleCheckboxChange = (event) => {
    setShowAdvanced(event.target.checked);
  }

  useEffect(() => {
    if (selectedTableAdvanced) {
      setXAxis(selectedTableAdvanced.x);
      setYAxis(selectedTableAdvanced.y);
    }
  }, [selectedTableAdvanced]);

  const handleXAxisChange = (e) => {
    setXAxis(e.target.value);
  };

  const handleYAxisChange = (e) => {
    setYAxis(e.target.value);
  };

  const handlePositionSubmit = () => {
    const updatedX = xAxis; // Use the current state
    const updatedY = yAxis; // Use the current state

    console.log("handlePositionSubmit roomId ===================>>>>>>>", roomId);
    console.log("handlePositionSubmit tableId ===================>>>>>>>", tableId);
    console.log("handlePositionSubmit x ===================>>>>>>>", updatedX);
    console.log("handlePositionSubmit y ===================>>>>>>>", updatedY);

    // dispatch(updateTable({ roomId, tableId, x: xAxis, y: yAxis }));
    // dispatch(updateTable({roomId, tableId, x: xAxis, y: yAxis} ))

    if (selectedTableAdvanced) {
      const { id, x, y, ...updatedData } = selectedTableAdvanced;
      console.log("selectedTableAdvanced handlePositionSubmit===================>>>>>>>", id, x, y,);

      dispatch(
        updateTable({
          roomId,
          tableId: id,
          x: updatedX,
          y: updatedY,
          ...updatedData,
        })
      );
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h6" mt={2}>Table Details</Typography>
        {/* <Form onSubmit={onSubmit}  method="post" control={control}> */}
        <FormGroup>
          <TextField
            label="Table Name"
            fullWidth
            margin="dense"
            {...register('name', { required: 'Table Name is required' })}
            error={!!errors.tableName}
            helperText={errors.tableName?.message}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Min Covers"
            type="number"
            fullWidth
            margin="dense"
            {...register('minCovers', {
              required: 'Min Covers is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Min Covers must be at least 1' },
            })}
            error={!!errors.minCovers}
            helperText={errors.minCovers?.message}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            label="Max Covers"
            type="number"
            fullWidth
            margin="dense"
            {...register('maxCovers', {
              required: 'Max Covers is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Max Covers must be at least 1' },
            })}
            error={!!errors.maxCovers}
            helperText={errors.maxCovers?.message}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Switch {...register('online')} />}
            label="Online"
          />
        </FormGroup>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
        {/* </Form> */}

        <FormGroup style={{ marginTop: '50px' }}>
          <FormControlLabel
            control={<Checkbox
              checked={showAdvanced}
              onChange={handleCheckboxChange}
            />} label="Advanced Settings" />
        </FormGroup>
      </Box>
      {showAdvanced && selectedTableAdvanced && (
        <Box component="form">
          <>
            <FormGroup style={{ marginTop: '10px' }}>
              <TextField
                id="x-axis"
                label="X-Axis"
                value={xAxis}
                onChange={handleXAxisChange}
                type="number"
                fullWidth
                margin="dense"
              />
            </FormGroup>
            <FormGroup style={{ marginTop: '10px' }}>
              <TextField
                id="y-axis"
                label="Y-Axis"
                value={yAxis}
                onChange={handleYAxisChange}
                type="number"
                fullWidth
                margin="dense"
              />
            </FormGroup>
            <Button onClick={handlePositionSubmit} variant="contained" sx={{ mt: 2 }}>Update Position</Button>
          </>
        </Box>
      )}
    </Box>
  );
};

export default TableDetailsForm;
