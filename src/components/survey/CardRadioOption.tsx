import clsx from "clsx";
import { CircleCheck } from "lucide-react";
import React from "react";

/* eslint-disable @next/next/no-img-element */
interface CardRadioProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  checked: boolean;
  type?: "radio" | "checkbox";
}

export const CardRadioOption = React.forwardRef<HTMLInputElement, CardRadioProps>(
  ({ label, value, checked, type = "radio", ...props }: CardRadioProps, ref) => {
    return (
      <label
        className={clsx(
          "hover:border-brand-500 hover:bg-brand-50 group flex w-full cursor-pointer flex-col items-end rounded-[8px] border-2 bg-white pb-4 pl-4 pr-3 pt-3 transition-all hover:opacity-100",
          {
            "border-brand-500 bg-[#f5f9ff]": checked,
            "border-gray-100": !checked
          }
        )}
      >
        <input
          type={type}
          value={value}
          ref={ref}
          checked={checked}
          className="absolute h-0 w-0 opacity-0"
          {...props}
        />
        <CircleCheck
          className={clsx("group-hover:text-brand-500 mb-2 w-5 transition-all", {
            "text-brand-500": checked,
            "text-gray-400": !checked
          })}
        />
        <div className="w-full">
          <p className="l-1 text-body-md text-secondary font-medium">{label}</p>
        </div>
      </label>
    );
  }
);

CardRadioOption.displayName = "CardRadioOption";
