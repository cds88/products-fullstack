import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {styled} from "@mui/system"


const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});



interface TextFilterProps {
  handleFilterChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  label: string;
  name: string;
  placeholder: string;
 type?: React.HTMLInputTypeAttribute | undefined
 value: string;
}

const TextFilter = ({
  handleFilterChange,
  label,
  name,
  placeholder,
  type,
  value
}: TextFilterProps) => {
  return (
    <TextField
    value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      fullWidth
      label={label}
      variant="outlined"
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={function (e) {
                handleFilterChange?.({
                  target: { name, value: "" },
                } as unknown as React.ChangeEvent<HTMLInputElement>)
              }} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flexGrow: 1,
        padding: 0,
        height: "56px", // Set the desired height
        "& .MuiOutlinedInput-root": {
          "& .MuiInputBase-input": {
            padding: "16.5px 14px", // Adjust padding to center the text vertically
          },
        },
        "& .MuiInputBase-input": {
          lineHeight: "3.5", // Adjust line height as needed
        },
      }}
     
      onChange={handleFilterChange}
    />
  );
};

export default TextFilter;
