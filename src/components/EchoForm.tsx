import type { EchoField } from "@/types/types";
import { evaluate } from "mathjs";
import { useMemo, useState } from "react";
import { Switch } from "./ui/switch";

export type EchoFormType = {
  data: EchoField[];
  title?: string;
  isVertical?: boolean
};

export function EchoForm ({ data, title, isVertical = false }: EchoFormType) {
  const [values, setValues] = useState<Record<string, number>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = parseFloat(value);
    setValues((prev) => ({
      ...prev,
      [name]: isNaN(num) ? 0 : num,
    }));
  };

  const calculateValueStyle = (value: number, referenceRange?: { lowerValue: number; higherValue: number }) => {
    if (referenceRange) {
      const { lowerValue, higherValue } = referenceRange;
      return value >= lowerValue && value <= higherValue ? "text-green-500" : "text-red-500";
    }
    return "text-gray-500"; // Default if no range is provided
  };

  const calculatedValues = useMemo(() => {
    const result: Record<string, number | string> = {};

    data.forEach((field) => {
      if (field.type === "calculated" && field.formula) {
        try {
          const val = evaluate(field.formula, { ...values, ...result });
          result[field.name] = typeof val === "number" ? Number(val.toFixed(2)) : val;
        } catch {
          result[field.name] = "—";
        }
      }
    });

    return result;
  }, [data, values]);

  return (
    <div className="dark:bg-slate-900 bg-slate-200 text-slate-900 dark:text-white w-full h-full flex flex-col items-center rounded-lg px-3 py-3 gap-y-2">
      {title && <h2 className="font-bold text-lg pb-3">{title}</h2>}
      {data.map((field) => (
        <div
          key={field.name}
          className={isVertical ? "flex flex-col items-start w-full gap-y-1" : "grid grid-cols-2 gap-x-4 items-center w-full"}
        >
          <p className="text-start text-xs">
            {field.label} {field.unit && `(${field.unit})`}
          </p>
          <div className="w-full flex flex-row items-end justify-end gap-x-2">

            {field.type === "input" ? (
              <input
                className={`${isVertical ? "w-full" : 'w-16'} bg-slate-300 dark:bg-slate-800 rounded-md p-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                type="number"
                name={field.name}
                onChange={handleChange}
                value={values[field.name] ?? ""}
              />
            ) : field.type === "calculated" ? (
              <span
                className={calculateValueStyle(
                  calculatedValues[field.name] as number,
                  field.absoluteReferenceRange?.male || field.absoluteReferenceRange?.female
                )}
              >
                {calculatedValues[field.name]}
              </span>

            ) : field.type === "toggle" ? (
              <div className="flex items-center justify-center w-full gap-x-2 text-sm">
                <p>Man</p>
                <Switch className="flex items-end" />
                {
                  //<Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} className="rotate-90" />
                }
                <p>Woman</p>
              </div>
            ) : null}

          </div>
        </div>
      ))}
    </div>
  );
}
