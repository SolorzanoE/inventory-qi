import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
import { fontWeight } from "@root/app-style"

const SelectComponent = ({
  isRequired,
  fieldName,
  label,
  stateValue,
  disabled,
  error,
  type,
  messageError,
  options = [{ id: 0, nombre: "" }]
}) => {
  const [value, setValue] = stateValue

  const isValueObject = typeof value === "object"

  const globalValue = isValueObject ? value[fieldName] : value

  const handleChange = (e) => {
    setValue(isValueObject
      ? { ...value, [fieldName]: e.target.value }
      : e.target.value
    )
  }

  return (
    <FormControl
      variant="standard"
      required={isRequired}
      disabled={disabled}
      error={error}
      fullWidth 
      sx={{
        ".MuiInputBase-root": {
          marginTop: 0
        }
      }}
    >
      <InputLabel
        required={false}
        shrink={false}
        sx={{
          paddingX: 1,
          typography: "body2",
          fontWeight: fontWeight.medium,
          color: "onBackground.main",
          transform: "translateY(5px)",
          display: globalValue ? "none" : "inherit",
          "&.Mui-focused": {
            color: "onBackground.main"
          },
          
        }}
      >
        <Stack direction="row"
          sx={{
            alignItems: "center",
            gap: 0.5
          }}
        >
          { label + (!isRequired ? " * " : "") }
        </Stack>
      </InputLabel>
      <Select
        id={fieldName}
        name={fieldName}
        value={globalValue}
        type={type}
        onChange={handleChange}
        disableUnderline
        sx={(theme) => ({
          borderRadius: 1.5,
          borderColor: "border.main",
          color: "onBackground.main",
          paddingLeft: 1,
          typography: "body2",
          fontWeight: fontWeight.medium,
          boxShadow: `0px 1px 4px ${alpha(theme.palette.onBackground.main, 0.5)}`,
          ".MuiSelect-icon": {
            color: "onBackground.main"
          }
        })}
      >
        { options.map(element => (
          <MenuItem 
            sx={{
              color: "onBackground.main",
              fontWeight: fontWeight.medium,
              textTransform: "capitalize"
            }}
            key={element.id}
            value={element.id}
          >
            { element.nombre }
          </MenuItem>
        )) }
      </Select>
      <FormHelperText 
        id={`helper-${fieldName}`}
        sx={{ display: error ? "inherit" : "none" }}
      >
        { error ? messageError : "" }
      </FormHelperText>
    </FormControl>
  )
}

export default SelectComponent