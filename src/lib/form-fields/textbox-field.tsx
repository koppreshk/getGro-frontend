import { ErrorMessage } from '@hookform/error-message';
import { HelpOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { CustomIconButton, FlexBox, IFlexBoxProps } from 'lib/ui-ux';
import React from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  get,
  useFormContext,
} from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

type ITextboxFieldProps = Omit<TextFieldProps, 'error' | 'required'> & {
  name: string;
  width?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  readOnly?: boolean;
};

const StyledErrorMessage = styled.div`
  && {
    color: #d32f2f;
    font-size: 13px;
  }
`;

export const TextboxField = (props: ITextboxFieldProps) => {
  const { name, rules, readOnly, ...rest } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const hasError = get(errors, name) !== undefined;

  return (
    <FlexBox flexDirection="column">
      <Controller
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            error={hasError}
            inputProps={{
              min: rules?.min?.toString(),
              max: rules?.max?.toString(),
              readOnly: readOnly,
            }}
            required={
              typeof rules?.required == 'string'
                ? rules?.required?.length > 0
                : false
            }
          />
        )}
        control={control}
        name={name}
        rules={rules}
      />
      <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
    </FlexBox>
  );
};

const HelperActions = (props: {
  label: React.ReactNode;
  helperText?: string;
  link?: string;
  linkLabel?: string;
}) => {
  const { pallete } = useTheme();
  const { label, helperText, link, linkLabel } = props;

  return (
    <FlexBox alignItems="center" gap={'8px'} justifyContent="space-between">
      <FlexBox gap={'8px'}>
        <Typography variant="h6">{label}</Typography>
        {helperText ? (
          <CustomIconButton
            iconComponent={
              <HelpOutline sx={{ width: '16px', height: '16px' }} />
            }
            tooltipProps={{ title: helperText }}
            style={{ padding: 0 }}
          />
        ) : null}
      </FlexBox>
      {link ? (
        <Link
          to={link}
          target="_blank"
          style={{
            textDecoration: 'unset',
            color: pallete.primaryPurple,
            fontWeight: 500,
            fontSize: '12px',
          }}
        >
          {linkLabel}
        </Link>
      ) : null}
    </FlexBox>
  );
};

export const TextboxFieldWithLabel = (
  props: ITextboxFieldProps &
    IFlexBoxProps & { helperText?: string; link?: string; linkLabel?: string }
) => {
  const {
    flexDirection = 'column',
    gap = '5px',
    label,
    helperText,
    link,
    linkLabel,
    ...rest
  } = props;

  const {
    formState: { errors },
  } = useFormContext();
  const hasError = get(errors, props.name) !== undefined;

  return (
    <FlexBox flexDirection={flexDirection} gap={gap}>
      {helperText || link ? (
        <HelperActions
          label={label}
          helperText={helperText}
          link={link}
          linkLabel={linkLabel}
        />
      ) : (
        <Typography
          variant="h6"
          sx={{ color: hasError ? '#d32f2f' : '#3b4455' }}
        >
          {label}
        </Typography>
      )}
      <TextboxField {...rest} />
    </FlexBox>
  );
};

export const PasswordField = (props: ITextboxFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextboxField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const PasswordFieldWithLabel = (
  props: ITextboxFieldProps &
    IFlexBoxProps & { helperText?: string; link?: string; linkLabel?: string }
) => {
  const {
    flexDirection = 'column',
    gap = '5px',
    label,
    helperText,
    link,
    linkLabel,
    ...rest
  } = props;
  return (
    <FlexBox flexDirection={flexDirection} gap={gap}>
      {helperText || link ? (
        <HelperActions
          label={label}
          helperText={helperText}
          link={link}
          linkLabel={linkLabel}
        />
      ) : (
        <Typography variant="h6">{label}</Typography>
      )}
      <PasswordField {...rest} />
    </FlexBox>
  );
};
