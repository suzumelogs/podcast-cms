import {
  FormControlLabel,
  FormControlProps,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { AddControlProps, InputControl } from '../Input/InputControl'

type SelectOption = {
  label: string
  value: unknown
}

export type RadioProps<T extends FieldValues> = UseControllerProps<T> &
  MuiRadioGroupProps &
  AddControlProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    fullWidth?: boolean
    labelLeft?: boolean
    width?: string
  }

export type RadioOptions = {
  label: string
  value: unknown
}

function RadioGroup<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  options = [],
  helperText,
  controlProps,
  labelLeft,
  width,
  fullWidth,
  ...props
}: RadioProps<T>) {
  const {
    field: { ref, value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value

    onChange(Number(radioValue))
  }

  return (
    <InputControl
      fieldError={error}
      label={label}
      helperText={helperText}
      labelLeft={labelLeft}
      fullWidth={fullWidth}
      {...controlProps}
    >
      <MuiRadioGroup
        {...props}
        ref={ref}
        value={value}
        onChange={onRadioChange}
        sx={{
          gap: 2,
          flexWrap: 'wrap',
          flexDirection: 'row',
          height: 40,
          width: width,
        }}
      >
        {options.map((option, index) => (
          <FormControlLabel
            value={option.value}
            control={<MuiRadio sx={{ padding: '4px' }} />}
            label={option.label}
            key={index}
            sx={{
              '& .MuiTypography-root': { fontSize: 14, lineHeight: '20px', fontWeight: 400 },
              marginLeft: 0,
            }}
          />
        ))}
      </MuiRadioGroup>
    </InputControl>
  )
}

export { RadioGroup }
