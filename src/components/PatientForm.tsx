import { useState } from "react";
import { evaluate } from "mathjs";

const formulas = [
  {
    label: "BMI",
    formula: "weight / ((height / 100) ^ 2)",
    unit: "kg/m²",
  },
  {
    label: "BSA",
    formula: "0.007184 * (height ^ 0.725) * (weight ^ 0.425)",
    unit: "m²",
  },
  {
    label: "MAP",
    formula: "(systole + 2 * diastole) / 3",
    unit: "mmHg",
  },
  {
    label: "Pressure differential",
    formula: "systole - diastole",
    unit: "mmHg",
  },
];

function PatientField ({
  name,
  text,
  value,
  onChange,
}: {
  name: string;
  text?: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {text ? text : name}
      </label>
      <input
        type="number"
        id={name}
        className="bg-slate-800 mt-1 block w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SystoleDiastoleField ({
  systole,
  diastole,
  onChangeSystole,
  onChangeDiastole,
}: {
  systole: number | string;
  diastole: number | string;
  onChangeSystole: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDiastole: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <label htmlFor="systole" className="block text-sm font-medium">
        BP:
      </label>
      <input
        type="number"
        id="systole"
        className="w-1/2 p-2 rounded-md shadow-sm focus:outline-none bg-slate-800 focus:ring-1 focus:ring-indigo-500"
        value={systole}
        onChange={onChangeSystole}
      />
      <span className="text-gray-700">/</span>
      <input
        type="number"
        id="diastole"
        className="w-1/2 p-2 rounded-md shadow-sm focus:outline-none bg-slate-800 focus:ring-1 focus:ring-indigo-500"
        value={diastole}
        onChange={onChangeDiastole}
      />
    </div>
  );
}

export function PatientForm () {
  const [values, setValues] = useState<Record<string, number | string>>({
    height: "",
    weight: "",
    age: "",
    gender: "",
    systole: "",
    diastole: "",
    heartRate: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : "",
    }));
  };

  const evaluateFormula = (formula: string) => {
    try {
      return evaluate(formula, values);
    } catch {
      return "—";
    }
  }

  return (
    <section className="flex justify-center p-5 items-center">
      <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg bg-slate-900 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Data Calculator</h1>

        <PatientField
          name="Height"
          text="Height (cm)"
          value={values.height ?? ""}
          onChange={handleChange}
        />
        <PatientField
          name="Weight"
          text="Weight (kg)"
          value={values.weight}
          onChange={handleChange}
        />
        <PatientField
          name="Age"
          value={values.age}
          onChange={handleChange}
        />
        <PatientField
          name="Gender"
          value={values.gender}
          onChange={handleChange}
        />

        <SystoleDiastoleField
          systole={values.systole}
          diastole={values.diastole}
          onChangeSystole={handleChange}
          onChangeDiastole={handleChange}
        />
        <PatientField
          name="Heart Rate"
          text="Heart Rate (/min)"
          value={values.heartRate}
          onChange={handleChange}
        />

        <div className="mt-6 p-4 border border-gray-200 rounded-md">
          {formulas.map(({ label, formula, unit }) => (
            <div key={label} className="mb-2">
              {label}: <span className="font-bold">{evaluateFormula(formula)}</span> {unit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
