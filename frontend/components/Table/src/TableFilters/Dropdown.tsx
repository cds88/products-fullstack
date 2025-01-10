import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

type BeautifulDropdownProps<T extends Record<string, any>> = {
  onChange: (args: any) => void;
  value: string;
  name: string;
  data: T[];
  label: string;
};

const ProductsDropdown = <T extends Record<string, any>>({
  onChange,
  value,
  name,
  data,
  label,
}: BeautifulDropdownProps<T>) => {
  if (!data) return;

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          onChange={onChange}
          name={name}
          label={label}
          input={
            <OutlinedInput
              label={label}
              endAdornment={
                value && (
                  <InputAdornment position="end" sx={{ marginRight: "30px" }}>
                    <IconButton
                      aria-label="clear selection"
                      onClick={function () {
                        onChange({
                          target: {
                            name: name,
                            value: "",
                          },
                        });
                      }}
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

export default ProductsDropdown;
