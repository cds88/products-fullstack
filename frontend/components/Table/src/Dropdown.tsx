import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  useTheme,
  OutlinedInput,
  InputAdornment,
  IconButton,
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
          input={
            <OutlinedInput
              label="Choose an Option"
              endAdornment={
                true && (
                  <InputAdornment position="end" sx={{marginRight:"30px"}}>
                    <IconButton
                      aria-label="clear selection"
                      onClick={function(){}}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            />            
          }
 
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
