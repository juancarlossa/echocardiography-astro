import { useEffect, useMemo, useState } from "react";
import type { EchoFormType } from "./EchoForm";
import type { EchoField } from "@/types/types";

type EchoValues = Record<string, Record<string, number | "man" | "woman">>;

type TabsLayoutProps = {
  forms: Record<string, EchoFormType[]>
};

export function EchoValues ({ forms }: TabsLayoutProps) {
  const [echoValues, setEchoValues] = useState<EchoValues>({});

  const titleMap: Record<string, EchoField[]> = {};
  Object.values(forms).forEach((formArray) => {
    formArray.forEach((formType) => {
      if (formType.title) titleMap[formType.title] = formType.data;
    });
  })

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("echoValues");
      if (stored) {
        setEchoValues(JSON.parse(stored));
      }
    } catch {
      console.warn("Error parsing echoValues from localStorage");
    }
  }, []);

  const globalGender = useMemo<"man" | "woman" | undefined>(() => {
    const patient = echoValues["Patient Data"];
    if (!patient) return undefined;
    const g = patient.gender;
    return g === "man" || g === "woman" ? g : undefined;
  }, [echoValues]);

  const genderStyle = globalGender === "man" ? "text-blue-400" : "text-pink-400"

  if (!Object.keys(echoValues).length) {
    return <p className="text-sm text-muted-foreground">No hay valores guardados.</p>;
  }

  return (
    <div className="space-y-5 grid grid-cols-4 space-x-5">

      {Object.entries(echoValues).map(([formTitle, values]) => {
        console.log(echoValues, formTitle);
        const definitions: EchoField[] = titleMap[formTitle] || [];

        return (
          <section key={formTitle} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex flex-row items-center justify-between">
              <h3 className={`text-lg font-semibold ${genderStyle}`}>{formTitle}</h3>
              {formTitle === "Patient Data" && globalGender && (
                <span className={`${genderStyle} font-medium`}>
                  {globalGender[0].toUpperCase() + globalGender.slice(1)}
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-1">Campo</th>
                    <th className="text-right py-1">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(values).map(([fieldName, val]) => {
                    if (fieldName === "gender") return null; // ya lo mostramos arriba

                    const def = titleMap[formTitle].find((f) => f.name === fieldName);
                    const label = def?.label ?? "";
                    const unit = def?.unit ? ` (${def.unit})` : "";

                    return (
                      <tr key={fieldName} className="border-t">
                        <td className="py-1">{label}{unit}</td>
                        <td className="py-1 text-right">{val}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </div>
  );
}