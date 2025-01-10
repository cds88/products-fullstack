import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface TextFilterProps {
  handleFilterChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  label: string;
  name: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  value: string;
}

const TextFilter = ({
  handleFilterChange,
  label,
  name,
  placeholder,
  type,
  value,
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
              <IconButton
                onClick={function (e) {
                  handleFilterChange?.({
                    target: { name, value: "" },
                  } as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flexGrow: 1,
        padding: 0,
        height: "56px",
        "& .MuiOutlinedInput-root": {
          "& .MuiInputBase-input": {
            padding: "16.5px 14px",
          },
        },
        "& .MuiInputBase-input": {
          lineHeight: "3.5",
        },
        "& input[type=number]": {
          MozAppearance: "textfield",  
        },
        "& input[type=number]::-webkit-outer-spin-button": {
          WebkitAppearance: "none", 
          margin: 0,
        },
        "& input[type=number]::-webkit-inner-spin-button": {
          WebkitAppearance: "none", 
          margin: 0,
        },      
      }}
      onChange={handleFilterChange}
    />
  );
};

export default TextFilter;
