import InputBase from "@mui/material/InputBase"
import { fontWeight } from "@root/app-style"
import Search from '@mui/icons-material/Search';
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Cancel from '@mui/icons-material/Cancel';
import { useState } from "react";

const SearchComponent = ({
  onChange = () => {}
}) => {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange(e)
  }

  const handleReset = () => setValue("")

  return (
    <InputBase 
      value={value}
      startAdornment={
        <Search color="onSurface" sx={{ mx: 1 }} />
      }
      endAdornment={ value && 
        <IconButton size="small"
          onClick={handleReset}  
          sx={{ mx: 0.5, p: 0.5 }}
        >
          <Cancel fontSize="small" color="onSurface" />
        </IconButton>
      }  
      fullWidth
      placeholder="Buscar..."
      onChange={handleChange}
      sx={(theme) => ({
        borderRadius: 5,
        color: "onSurface.main",
        bgcolor: "surface.main",
        typography: "body2",
        boxShadow: `0px 1px 4px ${alpha(theme.palette.onBackground.main, 0.5)}`,
        "&.MuiInputBase-root": {
          fontWeight: fontWeight.semibold,
        }
      })}
    />
  )
}

export default SearchComponent