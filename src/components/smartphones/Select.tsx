import clsx from "clsx";
import { ArrowDown, ChevronDown } from "lucide-react";
import { forwardRef, useId } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import ReactSelect, { ActionMeta, components, type DropdownIndicatorProps } from "react-select";

interface SelectProps
  extends Omit<Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange">, "defaultValue"> {
  options: unknown[];
  value?: unknown;
  label?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void) | undefined;
  containerClassName?: string;
  fullWidth?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    <ChevronDown
      className={clsx("w-4", {
        "text-[#8899A8] opacity-50": props.isDisabled,
        "rotate-180 transform": props.selectProps.menuIsOpen
      })}
    />
  </components.DropdownIndicator>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      defaultValue,
      onChange,
      containerClassName,
      placeholder,
      value,
      disabled,
      id,
      fullWidth,
      error
    }: SelectProps,
    ref
  ) => {
    return (
      <fieldset className={containerClassName}>
        <ReactSelect
          options={options}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          components={{ DropdownIndicator }}
          ref={ref as any}
          id={id}
          placeholder={placeholder}
          instanceId={useId()}
          classNames={{
            container: (_) =>
              clsx("flex flex-col items-end min-w-max text-secondary", {
                "w-full": fullWidth
              }),
            control: (state) =>
              clsx(
                "border rounded-[12px] px-5 font-medium h-[42px] space-x-[10px] text-body-md focus:border-secondary focus:ring-0 !cursor-pointer",
                {
                  "border-stroke hover:border-secondary": !state.isFocused && !disabled && !error,
                  "border-secondary": state.isFocused && !disabled && !error,
                  "border-red-warning": error,
                  "bg-[#EEE] text-text-primary": disabled,
                  "w-full": fullWidth,
                  "w-max": !fullWidth
                }
              ),
            menu: (_) =>
              "shadow-xs bg-white py-2.5 border-stroke absolute !w-fit inline-block min-w-full right-0 mt-1 border border-stroke rounded-[12px]",
            menuList: (_) => "space-y-[5px] flex flex-col select-scrollbar",
            option: (state) =>
              clsx(
                "py-2 px-4 text-body-md whitespace-pre block whitespace-nowrap w-full flex transition-colors hover:bg-brand-800 hover:text-white !cursor-pointer",
                { "bg-brand-800 text-white": state.isSelected }
              ),
            groupHeading: (_) => "py-2 px-4",
            placeholder: (_) => "text-text-primary font-normal"
          }}
          unstyled
          isSearchable={false}
          isDisabled={disabled}
          aria-label="Select"
        />
      </fieldset>
    );
  }
);

Select.displayName = "Select";
