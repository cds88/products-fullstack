import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";

const BeautifulDropdown = () => {
  const options = [
    { name: "Essence", id: 1 },
    { name: "Velvet Touch", id: 2 },
  ];

  const [selectedId, setSelectedId] = useState("");
  const theme = useTheme(); // Access the current theme

  const handleChange = (event: any) => {
    setSelectedId(event.target.value);
  };

  return (
    <Box sx={{width:'100%'}}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="select-label">Choose an Option</InputLabel>
        <Select
          labelId="select-label"
          value={selectedId}
          onChange={handleChange}
          label="Choose an Option"
          fullWidth
 
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
 
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BeautifulDropdown;
