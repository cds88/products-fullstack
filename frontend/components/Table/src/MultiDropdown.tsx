import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const MultiSelectWithDeletableChips = () => {
  const options = [
    { name: "Essence", id: 1 },
    { name: "Velvet Touch", id: 2 },
    { name: "Silk Smooth", id: 3 },
    { name: "Cotton Soft", id: 4 },
  ];

  const [selectedIds, setSelectedIds] = useState([]);

  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event;
    setSelectedIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (idToDelete :any) => () => {
    setSelectedIds((prevSelected) =>
      prevSelected.filter((id) => id !== idToDelete)
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="multi-select-label">Choose Options</InputLabel>
        <Select
          labelId="multi-select-label"
          multiple
          value={selectedIds}
          onChange={handleChange}
          input={<OutlinedInput label="Choose Options" sx={{padding:0,   height: 56, }} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, maxHeight:'100%' }}>
              {selected.map((id) => {
                const option = options.find((opt) => opt.id === id);
                return (
                  <Chip
                    key={id}
                    label={option ? option.name : id}
                    
                    sx={{margin:0, height:26}}
                    onDelete={handleDelete(id)}
                    deleteIcon={
                      <ClearIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
                );
              })}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelectWithDeletableChips;
