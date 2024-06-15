/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";

interface CardRadioProps extends React.HTMLAttributes<HTMLInputElement> {
  icon: string;
  label: string;
  value: string;
  checked: boolean;
  fullOpacity?: boolean;
  type?: "radio" | "checkbox";
}

export const CardRadio = React.forwardRef<HTMLInputElement, CardRadioProps>(
  ({ icon, label, value, checked, type = "radio", fullOpacity, ...props }: CardRadioProps, ref) => {
    return (
      <label
        className={clsx(
          "hover:border-brand-500 hover:bg-brand-50 flex w-full cursor-pointer flex-col items-center rounded-[8px] border-2 bg-white py-16 transition-all hover:bg-opacity-10 hover:opacity-100",
          {
            "border-brand-500 bg-[#f5f9ff]": checked,
            "border-gray-100": !checked,
            // "opacity-50": !checked && !fullOpacity,
            "opacity-100": fullOpacity
          }
        )}
      >
        <div className="mb-2 flex h-[80px] w-[160px] items-center justify-center">
          <img src={icon} alt={label} />
        </div>
        <input
          type={type}
          value={value}
          ref={ref}
          checked={checked}
          className="h-0 w-0 opacity-0"
          {...props}
        />
        <p className="text-secondary font-medium">{label}</p>
      </label>
    );
  }
);

CardRadio.displayName = "CardRadio";
