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

type MultiSelectWithDeletableChipsProps<T extends Record<string, any>> = {
  name: string;
  value: string
  handleFilterChange: (args: any) => void;

  data: T[];
  label: string


}

const MultiSelectWithDeletableChips = <T extends Record<string, any>,> ({
  data,
  label,
  handleFilterChange,
  name,
  value
} : MultiSelectWithDeletableChipsProps<T>) => {
 
 
 

  const values =value===""? [] :  value?.split(",") 
  
 
  const handleDelete = (idToDelete :any) => () => {
 
    handleFilterChange({
      target:{
        name, value: values.filter(val=>val!==idToDelete)
      }
    })
  };

  if(!data) return 

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="multi-select-label">Choose Options</InputLabel>
        <Select
          labelId="multi-select-label"
          multiple
          name={name}
          value={values}
          onChange={handleFilterChange}
          input={<OutlinedInput label={label} sx={{padding:0, 
 
             }} 
             endAdornment={
              value && (
                <InputAdornment position="end" sx={{marginRight:"30px"}}>
                  <IconButton
                    aria-label="clear selection"
                    onClick={function(){
                      handleFilterChange({
                        target:{
                          name: name, value: []
                        }
                      })
                    }}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          
        
             
             />}
          renderValue={(selected) => {
 
            return             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, maxHeight:'100%' }}>
            {selected.map((id) => {
              const option = data.find((opt) => opt.name === name);
              
              return (
                <Chip
                  key={id}
                  label={option ? option.name : id}
                  
                  sx={{margin:0, height:23}}
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
          }}
        >
          {data.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelectWithDeletableChips;
