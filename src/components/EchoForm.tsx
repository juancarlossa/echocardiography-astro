import type { EchoField } from "@/types/types";
import { evaluate } from "mathjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Switch } from "./ui/switch";
import { useGenderStore } from "@/store/genderStore";
import { useBsaStore } from "@/store/bsaStore";

export type EchoFormType = {
  data: EchoField[];
  title?: string;
  isVertical?: boolean;
};

type Gender = "male" | "female";

export function EchoForm ({ data, title, isVertical = false }: EchoFormType) {
  const [values, setValues] = useState<Record<string, number>>({});

  const gender = useGenderStore((state) => state.gender);
  const setGender = useGenderStore((state) => state.setGender);

  const bsa = useBsaStore((state) => state.bsa);
  const setBsa = useBsaStore((state) => state.setBsa);

  const allFormsRef = useRef<Record<string, Record<string, number | Gender>>>({});

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
        if (saved.gender === "male" || saved.gender === "female") {
          setGender(saved.gender);
        }
      }
    } catch {
      allFormsRef.current = {};
    }
  }, [title]);


  function persist (obj: Record<string, number | Gender>) {
    if (!title) return;

    // Clona el objeto actual de ese formulario
    const current = { ...allFormsRef.current[title] };

    // Si este formulario es "Patient Data", añade gender
    if (title === "Patient Data") {
      allFormsRef.current[title] = obj;

    } else {
      // Para los demás, borra cualquier propiedad "gender" y guarda solo los valores numéricos
      const { gender: _, ...rest } = obj;
      allFormsRef.current[title] = rest;
    }

    localStorage.setItem("echoValues", JSON.stringify(allFormsRef.current));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name)
    const num = parseFloat(value);
    const newValues = { ...values, [name]: isNaN(num) ? 0 : num };
    setValues(newValues);
    persist({ ...newValues, gender });
  };

  // Toggle de género
  const handleGenderToggle = (checked: boolean) => {
    const g: Gender = checked ? "male" : "female";
    setGender(g)
    persist({ ...values, gender: g });
  };

  const calculatedValues = useMemo(() => {
    const result: Record<string, number | string> = {};
    data.forEach((field) => {
      if (field.type === "calculated" && field.formula) {
        try {
          const val = evaluate(field.formula, { ...values, ...result });
          result[field.name] = typeof val === "number" ? Number(val.toFixed(2)) : val;
        } catch {
          result[field.name] = "";
        }
      }
    });
    return result;
  }, [data, values]);

  useEffect(() => {
    const raw = calculatedValues["bsa"];
    if (typeof raw === "number" && !isNaN(raw)) {
      setBsa(raw);
    }
  }, [calculatedValues["bsa"], setBsa]);
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
  const genderKey = gender === "male" ? "male" : "female";

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
              : "grid grid-cols-3 gap-x-4 items-center w-full"
          }
        >
          <p className="text-start text-xs">
            {field.label}
            {field.unit && ` (${field.unit})`}
          </p>
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            {field.type === "input" ? (
              <>
                <input
                  className="w-[50px] bg-slate-300 dark:bg-slate-800 rounded-md p-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  type="number"
                  name={field.name}
                  onChange={handleChange}
                  value={isNaN(values[field.name]!) ? "" : values[field.name] ?? ""}
                />

              </>
            ) : field.type === "calculated" ? (

              <span className={calculateValueStyle(calculatedValues[field.name] as number, field)}>
                {isNaN(calculatedValues[field.name] as number) ? "" : calculatedValues[field.name]}
              </span>

            ) : field.type === "toggle" ? (
              <div className="flex items-center justify-center w-full gap-x-2 text-sm">
                <p>Woman</p>
                <Switch checked={gender === "male" ? true : false} onCheckedChange={handleGenderToggle} />
                <p>Man</p>
              </div>
            ) : null}
          </div>

          {typeof values[field.name] === "number" && !isNaN(values[field.name]) && (
            <div className="flex flex-row items-end justify-between gap-x-2">
              <div className="flex flex-col items-start justify-start gap-x-2">
                {/* Valor ingresado con estilo según rango absoluto */}
                <span className={calculateValueStyle(values[field.name]!, field)}>
                  {values[field.name]} {field.unit}
                </span>

                {/* Rango absoluto */}
                {field.absoluteReferenceRange?.[genderKey] && (
                  <span className="text-xs text-muted-foreground">
                    {`${field.absoluteReferenceRange[genderKey].lowerValue} - ${field.absoluteReferenceRange[genderKey].higherValue} ${field.unit ?? ""}`}
                  </span>
                )}
              </div>

              {/* Rango indexado por BSA (si existe) */}
              <div className="flex flex-col items-end justify-center gap-x-2">
                {field.bsaIndexedReferenceRange?.[genderKey] &&
                  typeof values[field.name] === "number" &&
                  bsa > 0 && (
                    (() => {
                      const raw = values[field.name]!;
                      const indexed = raw / bsa;
                      // formateo para mostrar dos decimales o guión si NaN/infinito
                      function formatNumber (n: number): string {
                        // formatea con 2 decimales y luego quita .00 o ceros finales
                        return n
                          .toFixed(2)            // "3.00" | "3.50" | "3.25"
                          .replace(/\.?0+$/, ""); // => "3"    | "3.5"  | "3.25"
                      }

                      const display = Number.isFinite(indexed) ? formatNumber(indexed) : "—";
                      // calcula estilo según rango indexado
                      const range = field.bsaIndexedReferenceRange![genderKey];
                      const inRange = Number.isFinite(indexed)
                        ? indexed >= range.lowerValue && indexed <= range.higherValue
                        : false;
                      const colorClass = inRange ? "text-green-500" : "text-red-500";

                      return (
                        <span className={colorClass}>
                          {display} {field.unit}
                        </span>
                      );
                    })()
                  )}
                {/* Rango indexado por BSA (si existe) */}
                {field.bsaIndexedReferenceRange?.[genderKey] && (
                  <span className="text-xs text-muted-foreground italic">
                    {field.bsaIndexedReferenceRange[genderKey].lowerValue} - {field.bsaIndexedReferenceRange[genderKey].higherValue} {field.unit ?? ""}
                  </span>
                )}
              </div>
            </div>


          )}
        </div>
      ))}
    </div>
  );
}
