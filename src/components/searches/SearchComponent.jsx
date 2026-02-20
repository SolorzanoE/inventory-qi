import InputBase from "@mui/material/InputBase"
import { fontWeight } from "@root/appStyle"
import Search from '@mui/icons-material/Search';
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Cancel from '@mui/icons-material/Cancel';

const SearchComponent = ({
  stateValue,
  onChange = () => {},
  onEnter = (value) => {}
}) => {
  const [value, setValue] = stateValue

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange(e)
  }

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return
    e.target.blur()
    onEnter(e.target.value.trim())
  }

  const handleReset = () => setValue("")

  return (
    <InputBase 
      inputMode="search"
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
      onKeyDown={handleKeyDown}
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