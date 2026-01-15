import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import Stack from "@mui/material/Stack"
import { fontWeight } from "@root/app-style"

const InputComponent = ({
  isRequired,
  fieldName,
  label,
  labelIcon,
  stateValue,
  disabled,
  error,
  endAdornment,
  type,
  messageError
}) => {
  const [value, setValue] = stateValue

  const isValueObject = typeof value === "object"

  const globalValue = isValueObject ? value[fieldName] : value

  const handleChange = (e) => {
    setValue( isValueObject
      ? data => ({ ...data, [fieldName]: e.target.value })
      : e.target.value
    )
  }

  return (
    <FormControl
      variant="standard"
      required={isRequired}
      disabled={disabled}
      error={error}
      size="small"
      fullWidth
    >
      <InputLabel
        htmlFor={fieldName} 
        shrink
        required={false}
        sx={{
          top: -5,
          color: "onBackground.main",
          "&.Mui-focused": {
            color: "onBackground.main",
          },
          "&.MuiInputLabel-shrink": {
            typography: "h6",
            fontWeight: fontWeight.medium
          }
        }}
      >
        <Stack direction="row"
          sx={{
            alignItems: "center",
            gap: 0.5
          }}
        >
          { labelIcon }
          { label + (!isRequired ? " * " : "") }
        </Stack>
      </InputLabel>
      <Input
        id={fieldName}
        name={fieldName}
        value={globalValue}
        type={type}
        endAdornment={endAdornment}
        onChange={handleChange}
        disableUnderline
        sx={{
          border: 1.5,
          borderRadius: 1.5,
          borderColor: "border.main",
          color: "onBackground.main",
          paddingLeft: 1,
          typography: "body2",
          fontWeight: fontWeight.regular
        }}
      />
      <FormHelperText id={`helper-${fieldName}`}>
        { error ? messageError : "" }
      </FormHelperText>
    </FormControl>
  )
}

export default InputComponent