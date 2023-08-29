import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  ListSubheader,
  Checkbox,
  InputLabel,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { db } from "./firebase";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { collection, addDoc, getDocs } from "firebase/firestore";
import useForm from "./hooks/useForm";

function App() {
  const {
    checked,
    name,
    selectedValue,
    editMode,
    data,
    options,
    formDataLoaded,
    handleChange,
    handleSelectChange,
    handleSubmit,
    changeEdit,
    handleDelete,
    setName,
  } = useForm();

  function renderOptions(options, level = 1) {
    const paddingLeft = 16 * level;

    return options?.map((option) => {
      const components = [
        <MenuItem
          key={option.value}
          value={option.label}
          style={{ paddingLeft: paddingLeft }}>
          {option.label}
        </MenuItem>,
      ];

      if (option.options) {
        components.push(...renderOptions(option.options, level + 1));
      }

      return components;
    });
  }

  return (
    formDataLoaded && (
      <form onSubmit={handleSubmit}>
        <Box m={10}>
          <Container maxWidth='md'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 3,
                  }}>
                  {editMode ? (
                    <>
                      <Typography variant='subtitle1'>Your Details:</Typography>
                      <Divider />
                      <Box>
                        <InputLabel htmlFor='grouped-select'>Name:</InputLabel>
                        <Typography variant='h6' sx={{ mt: 2, ml: 2 }}>
                          {name}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box>
                        <InputLabel htmlFor='grouped-select'>
                          Sector:
                        </InputLabel>
                        <Typography variant='h6' sx={{ mt: 2, ml: 2 }}>
                          {selectedValue}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box display='flex' gap={2} alignItems='center'>
                        <TaskAltIcon color='success' />
                        <Typography variant='h6'>
                          {checked && "Agreed to terms"}
                        </Typography>
                      </Box>
                      <Divider />
                      <Button
                        variant='contained'
                        color='success'
                        type='button'
                        onClick={() => changeEdit()}>
                        Edit
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => handleDelete()}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant='subtitle1'>
                        Please enter your name and pick the Sectors you are
                        currently involved in.
                      </Typography>
                      <Divider />
                      <TextField
                        id='outlined-basic'
                        label='name'
                        variant='outlined'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <InputLabel htmlFor='grouped-select'>Sectors</InputLabel>
                      <Select
                        id='grouped-select'
                        label='Grouping'
                        displayEmpty
                        value={selectedValue}
                        onChange={handleSelectChange}
                        required>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {options && renderOptions(options)}
                      </Select>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            required
                            onChange={handleChange}
                            inputProps={{ "aria-label": "Agree to terms" }}
                          />
                        }
                        label='Agree to terms'
                      />
                      <Button variant='contained' type='submit' color='primary'>
                        Save
                      </Button>
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </form>
    )
  );
}

export default App;

// const options2 = [
//   {
//     value: "1",
//     label: "Manufacturing",
//     options: [
//       { value: "19", label: "Construction materials" },
//       {
//         value: "18",
//         label: "Electronics and Optics",
//       },
//       {
//         value: "6",
//         label: "Food and Beverage",
//         options: [
//           { value: "342", label: "Bakery & confectionery products" },
//           { value: "43", label: "Beverages" },
//           { value: "42", label: "Fish & fish products" },
//           { value: "40", label: "Meat & meat products" },
//           { value: "39", label: "Milk & dairy products" },
//           { value: "437", label: "Other" },
//           { value: "378", label: "Sweets & snack food" },
//         ],
//       },
//       {
//         value: "13",
//         label: "Furniture",
//         options: [
//           { value: "13", label: "Furniture" },
//           { value: "389", label: "Bathroom/sauna" },
//           { value: "385", label: "Bedroom" },
//           { value: "390", label: "Children’s room" },
//           { value: "98", label: "Kitchen" },
//           { value: "101", label: "Living room" },
//           { value: "392", label: "Office" },
//           { value: "394", label: "Other (Furniture)" },
//           { value: "341", label: "Outdoor" },
//           { value: "99", label: "Project furniture" },
//         ],
//       },
//       {
//         value: "12",
//         label: "Machinery",
//         options: [
//           { value: "94", label: "Machinery components" },
//           { value: "91", label: "Machinery equipment/tools" },
//           {
//             value: "224",
//             label: "Manufacture of machinery",
//           },
//           {
//             value: "97",
//             label: "Maritime",
//             options: [
//               { value: "271", label: "Aluminium and steel workboats" },
//               { value: "269", label: "Boat/Yacht building" },
//               { value: "230", label: "Ship repair and conversion" },
//             ],
//           },
//           { value: "93", label: "Metal structures" },
//           { value: "508", label: "Other" },
//           { value: "227", label: "Repair and maintenance service" },
//           { value: "11", label: "Metalworking" },
//           { value: "67", label: "Construction of metal structures" },
//           { value: "263", label: "Houses and buildings" },
//           { value: "267", label: "Metal products" },
//           {
//             value: "542",
//             label: "Metal works",
//             options: [
//               { value: "75", label: "CNC-machining" },
//               { value: "62", label: "Forgings, Fasteners" },
//               { value: "69", label: "Gas, Plasma, Laser cutting" },
//               { value: "66", label: "MIG, TIG, Aluminum welding" },
//             ],
//           },
//           {
//             value: "9",
//             label: "Plastic and Rubber",
//             options: [
//               { value: "54", label: "Packaging" },
//               { value: "556", label: "Plastic goods" },
//               {
//                 value: "559",
//                 label: "Plastic processing technology",
//                 options: [
//                   { value: "55", label: "Blowing" },
//                   { value: "57", label: "Moulding" },
//                   { value: "53", label: "Plastics welding and processing" },
//                 ],
//               },
//               { value: "560", label: "Plastic profiles" },
//             ],
//           },

//           {
//             value: "5",
//             label: "Printing",
//             options: [
//               { value: "148", label: "Advertising" },
//               { value: "150", label: "Book/Periodicals printing" },
//               { value: "145", label: "Labelling and packaging printing" },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     value: "3",
//     label: "Other",
//     options: [
//       { value: "37", label: "Creative industries" },
//       { value: "29", label: "Energy technology" },
//       { value: "33", label: "Environment" },
//     ],
//   },
// ];
