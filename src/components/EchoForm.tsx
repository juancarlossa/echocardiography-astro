import type { EchoField } from "@/types/types";
import { evaluate } from "mathjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Switch } from "./ui/switch";

export type EchoFormType = {
  data: EchoField[];
  title?: string;
  isVertical?: boolean;
};

type Gender = "man" | "woman";

export function EchoForm ({ data, title, isVertical = false }: EchoFormType) {
  const [values, setValues] = useState<Record<string, number>>({});
  const [gender, setGender] = useState<Gender>("man");
  const allFormsRef = useRef<Record<string, Record<string, number | Gender>>>({});

  // Carga inicial de valores y género
  useEffect(() => {
    if (!title) return;
    try {
      const raw = localStorage.getItem("echoValues") || "{}";
      allFormsRef.current = JSON.parse(raw);
      const saved = allFormsRef.current[title];
      if (saved) {
        // Inputs numéricos
        const nums: Record<string, number> = {};
        Object.entries(saved).forEach(([k, v]) => {
          if (typeof v === "number") nums[k] = v;
        });
        setValues(nums);
        // Género
        if (saved.gender === "man" || saved.gender === "woman") {
          setGender(saved.gender);
        }
      }
    } catch {
      allFormsRef.current = {};
    }
  }, [title]);

  // Persistencia genérica: inputs y género
  function persist (obj: Record<string, number | Gender>) {
    if (!title) return;
    allFormsRef.current[title] = obj;
    localStorage.setItem("echoValues", JSON.stringify(allFormsRef.current));
  }

  // Manejo de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = parseFloat(value);
    const newValues = { ...values, [name]: isNaN(num) ? 0 : num };
    setValues(newValues);
    persist({ ...newValues, gender });
  };

  // Toggle de género
  const handleGenderToggle = (checked: boolean) => {
    const g: Gender = checked ? "man" : "woman";
    setGender(g);
    persist({ ...values, gender: g });
  };

  // Cálculo de campos calculados
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

  // Persistir valores calculados
  useEffect(() => {
    if (!title) return;
    const nums: Record<string, number | Gender> = {};
    Object.entries(calculatedValues).forEach(([k, v]) => {
      if (typeof v === "number") nums[k] = v;
    });
    if (Object.keys(nums).length) {
      const updated = { ...allFormsRef.current[title], ...nums };
      allFormsRef.current[title] = updated;
      localStorage.setItem("echoValues", JSON.stringify(allFormsRef.current));
    }
  }, [calculatedValues, title]);

  // Determina la clave de género para lookup
  const genderKey = gender === "man" ? "male" : "female";

  // Estilo según rango
  const calculateValueStyle = (value: number, field: EchoField) => {
    const range = field.absoluteReferenceRange?.[genderKey];
    if (range) {
      return value >= range.lowerValue && value <= range.higherValue
        ? "text-green-500"
        : "text-red-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="dark:bg-slate-900 bg-slate-200 text-slate-900 dark:text-white w-full h-full flex flex-col items-center rounded-lg px-3 py-3 gap-y-2">
      {title && <h2 className="font-bold text-lg pb-3">{title}</h2>}
      {data.map((field) => (
        <div
          key={field.name}
          className={
            isVertical
              ? "flex flex-col items-start w-full gap-y-1"
              : "grid grid-cols-2 gap-x-4 items-center w-full"
          }
        >
          <p className="text-start text-xs">
            {field.label}
            {field.unit && ` (${field.unit})`}
          </p>
          <div className="w-full flex flex-row items-end justify-end gap-x-2">
            {field.type === "input" ? (
              <input
                className={`${isVertical ? "w-full" : "w-16"
                  } bg-slate-300 dark:bg-slate-800 rounded-md p-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                type="number"
                name={field.name}
                onChange={handleChange}
                value={values[field.name] ?? ""}
              />
            ) : field.type === "calculated" ? (
              <span className={calculateValueStyle(calculatedValues[field.name] as number, field)}>
                {calculatedValues[field.name]}
              </span>
            ) : field.type === "toggle" ? (
              <div className="flex items-center justify-center w-full gap-x-2 text-sm">
                <p>Woman</p>
                <Switch checked={gender === "man"} onCheckedChange={handleGenderToggle} />
                <p>Man</p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
