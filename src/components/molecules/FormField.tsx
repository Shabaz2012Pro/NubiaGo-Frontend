import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Input from '../atoms/Input';
import Select, { SelectOption } from '../atoms/Select';
import Checkbox from '../atoms/Checkbox';
import RadioGroup, { RadioOption } from '../atoms/RadioGroup';
import FileUpload from '../atoms/FileUpload';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'search' | 'select' | 'checkbox' | 'radio' | 'file';

interface BaseFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type: 'text' | 'email' | 'password' | 'number' | 'search';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface SelectFieldProps extends BaseFieldProps {
  type: 'select';
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
}

interface CheckboxFieldProps extends BaseFieldProps {
  type: 'checkbox';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}

interface RadioFieldProps extends BaseFieldProps {
  type: 'radio';
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
}

interface FileFieldProps extends BaseFieldProps {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
}

type FormFieldProps = TextFieldProps | SelectFieldProps | CheckboxFieldProps | RadioFieldProps | FileFieldProps;

const FormField: React.FC<FormFieldProps> = (props) => {
  const { name, className, error } = props;

  const fieldVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    error: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={fieldVariants}
      initial="initial"
      animate={error ? "error" : "animate"}
      className={clsx('w-full', className)}
    >
      {props.type === 'text' || props.type === 'email' || props.type === 'password' || props.type === 'number' || props.type === 'search' ? (
        <Input
          type={props.type}
          label={props.label}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          disabled={props.disabled}
          status={error ? 'error' : 'default'}
          helperText={error}
          leftIcon={props.leftIcon}
          rightIcon={props.rightIcon}
        />
      ) : props.type === 'select' ? (
        <Select
          label={props.label}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          options={props.options}
          searchable={props.searchable}
          required={props.required}
          disabled={props.disabled}
          error={error}
        />
      ) : props.type === 'checkbox' ? (
        <Checkbox
          label={props.label}
          checked={props.checked}
          onChange={props.onChange}
          indeterminate={props.indeterminate}
          disabled={props.disabled}
          error={error}
        />
      ) : props.type === 'radio' ? (
        <RadioGroup
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          options={props.options}
          orientation={props.orientation}
          disabled={props.disabled}
          error={error}
        />
      ) : props.type === 'file' ? (
        <FileUpload
          label={props.label}
          accept={props.accept}
          multiple={props.multiple}
          maxSize={props.maxSize}
          maxFiles={props.maxFiles}
          onFilesChange={props.onFilesChange}
          disabled={props.disabled}
          error={error}
        />
      ) : null}
    </motion.div>
  );
};

export default FormField;