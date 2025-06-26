import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Button from '../atoms/Button';
import { Plus, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface FormFieldArrayProps {
  name: string;
  renderItem: (index: number, remove: () => void) => React.ReactNode;
  addButtonText?: string;
  emptyValue?: any;
  maxItems?: number;
  minItems?: number;
  className?: string;
}

const FormFieldArray: React.FC<FormFieldArrayProps> = ({
  name,
  renderItem,
  addButtonText = 'Add Item',
  emptyValue = {},
  maxItems = Infinity,
  minItems = 0,
  className,
}) => {
  const { control } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={clsx('space-y-4', className)}>
      {fields.map((field, index) => (
        <div key={field.id} className="relative">
          {renderItem(index, () => {
            if (fields.length > minItems) {
              remove(index);
            }
          })}
          
          {fields.length > minItems && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 text-red-500"
              onClick={() => remove(index)}
            >
              <Minus className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
      
      {fields.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append(emptyValue)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          {addButtonText}
        </Button>
      )}
    </div>
  );
};

export default FormFieldArray;