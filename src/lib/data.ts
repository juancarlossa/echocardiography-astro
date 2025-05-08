import type { EchoField } from "@/types/types";

const measure = "mm";

export const patientData: EchoField[] = [
  {
    name: "height",
    label: "Height",
    type: "input",
    unit: measure,
  },
  {
    name: "weight",
    label: "Weight",
    type: "input",
    unit: "kg",
  },
  {
    name: "age",
    label: "Age",
    type: "input",
    unit: "",
  },
  {
    name: "gender",
    label: "Gender",
    type: "toggle",
    unit: "",
  },
  {
    name: "systole",
    label: "Systole",
    type: "input",
    unit: "mmHg",
  },
  {
    name: "diastole",
    label: "Diastole",
    type: "input",
    unit: "mmHg",
  },
  {
    name: "heart-rate",
    label: "Heart Rate",
    type: "input",
    unit: "/min",
  },
  {
    name: "bmi",
    label: "BMI",
    type: "calculated",
    formula: "weight / ((height / 100) ^ 2)",
    unit: "kg/m²",
  },
  {
    name: "bsa",
    label: "BSA",
    type: "calculated",
    formula: "0.007184 * (height ^ 0.725) * (weight ^ 0.425)",
    unit: "m²",
  },
  {
    name: "map",
    label: "MAP",
    type: "calculated",
    formula: "(systole + 2 * diastole) / 3",
    unit: "mmHg",
  },
  {
    name: "pressure-differential",
    label: "Pressure Differential",
    type: "calculated",
    formula: "systole - diastole",
    unit: "mmHg",
  },
]

export const plax: EchoField[] = [
  { label: "LVIDd", name: "lvidd", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 4.2, higherValue: 5.8 },
      female: { lowerValue: 3.8, higherValue: 5.2 }
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 2.2, higherValue: 3.0 },
      female: { lowerValue: 2.3, higherValue: 3.1 }
    }
  },
  { label: "LVIDs",name: "lvids",unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 2.5, higherValue: 4.0 },
      female: { lowerValue: 2.2, higherValue: 3.5 },
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 1.3, higherValue: 2.1 },
      female: { lowerValue: 1.3, higherValue: 2.1 },
    },
  },
  { label: "IVSd", name: "ivsd", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 0.6, higherValue: 1.0 },
      female: { lowerValue: 0.6, higherValue: 0.9 },
    },
  },
  { label: "PWd", name: "pwd", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 0.6, higherValue: 1.0 },
      female: { lowerValue: 0.6, higherValue: 0.9 },
    },
  },
  { label: "RVOTplax", name: "rvotplax", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 2, higherValue: 3 },
      female: { lowerValue: 2, higherValue: 3 },
    },
  },
  { label: "LAAP", name: "laap", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 3, higherValue: 4 },
      female: { lowerValue: 2.7, higherValue: 3.8 },
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 1.5, higherValue: 2.3 },
      female: { lowerValue: 1.5, higherValue: 2.3 },
    },
  },
  { label: "AoA", name: "aoa", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 2, higherValue: 3.1 },
      female: { lowerValue: 2.0, higherValue: 3.1 },
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 1.2, higherValue: 1.4 },
      female: { lowerValue: 1.2, higherValue: 1.4 },
    },
  },
  { label: "AoSV", name: "aosv", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 2.9, higherValue: 4.5 },
      female: { lowerValue: 2.9, higherValue: 4.5 },
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 1.8, higherValue: 2 },
      female: { lowerValue: 1.8, higherValue: 2 },
    },
  },
  { label: "AoPxA", name: "aopxa", unit: measure, type: "calculated", formula: "aoa + aosv",
    absoluteReferenceRange: {
      male: { lowerValue: 2.2, higherValue: 3.6 },
      female: { lowerValue: 2.2, higherValue: 3.6 },
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 1.3, higherValue: 1.7 },
      female: { lowerValue: 1.3, higherValue: 1.7 },
    },
  },
  { label: "LVmass", name: "lvmass", unit: "g", type: "calculated", formula: "0.8 * (1.04 * ((ivsd + lvidd + pwd)^3 - (lvidd^3))) + 0.6",
    absoluteReferenceRange: {
      male: { lowerValue: 52, higherValue: 72 },
      female: { lowerValue: 54, higherValue: 74 },
    },
  },
  { label: "LVmass index", name: "lvmi", unit: "%", type: "calculated", formula: "lvmass / bsa",
    absoluteReferenceRange: {
      male: { lowerValue: 52, higherValue: 72 },
      female: { lowerValue: 54, higherValue: 74 },
    },
  },
  { label: "RWT", name: "rwt",  unit: "%", type: "calculated", formula: "(ivsd + pwd) / lvidd",
    absoluteReferenceRange: {
      male: { lowerValue: 52, higherValue: 72 },
      female: { lowerValue: 54, higherValue: 74 },
    },
  },
]

export const psax: EchoField[] = [
  { label: "RVOTpsax", name: "rvotpsax", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 2.1, higherValue: 3.5 },
      female: { lowerValue: 2.1, higherValue: 3.5 }
    },
  },
  { label: "PA", name: "pa", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 1.5, higherValue: 2.5 },
      female: { lowerValue: 1.5, higherValue: 2.5 }
    },
  },
]

export const a4c: EchoField[] = [
  { label: "LVEDV", name: "lvedv", unit: "mL", type: "input", 
    absoluteReferenceRange: {
      male: { lowerValue: 62, higherValue: 150 },
      female: { lowerValue: 46, higherValue: 106 }
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 34, higherValue: 74 },
      female: { lowerValue: 29, higherValue: 61 }
    }
  },
  { label: "LVESV", name: "lvesv", unit: "mL", type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 21, higherValue: 61 },
      female: { lowerValue: 14, higherValue: 42 }
    },
    bsaIndexedReferenceRange: {
      male: { lowerValue: 11, higherValue: 31 },
      female: { lowerValue: 8, higherValue: 24 }
    }
  },
  { label: "LVEF", name: "lvef", unit: "%", type: "calculated", formula: "(lvedv - lvesv) / lvedv * 100",
    absoluteReferenceRange: {
      male: { lowerValue: 52, higherValue: 72 },
      female: { lowerValue: 54, higherValue: 74 }
    },
  },

  { label: "LA volume", name: "lav", unit: "mL", type: "input" },
  { label: "LA mayor", name: "la_major", unit: measure, type: "input" },
  { label: "LA menor", name: "la_minor", unit: measure, type: "input" },
  { label: "RA volume", name: "rav", unit: "mL", type: "input" },
  { label: "RA mayor", name: "ra_major", unit: measure, type: "input" },
  { label: "RA menor", name: "ra_minor", unit: measure, type: "input" },
  { label: "RV basal", name: "rv_basal", unit: measure, type: "input", 
    absoluteReferenceRange: {
      male: { lowerValue: 25, higherValue: 41 },
      female: { lowerValue: 25, higherValue: 41 }
    },
  },
  { label: "RV medio", name: "rv_medio", unit: measure, type: "input",
    absoluteReferenceRange: {
      male: { lowerValue: 19, higherValue: 35 },
      female: { lowerValue: 19, higherValue: 35 }
    },
  },
  { label: "RV longitudinal", name: "rv_longitudinal", unit: measure, type: "input", 
    absoluteReferenceRange: {
      male: { lowerValue: 59, higherValue: 83 },
      female: { lowerValue: 59, higherValue: 83 }
    },
  },
  { label: "TAPSE", name: "tapse", unit: measure, type: "input" },
  { label: "MAPSE", name: "mapse", unit: measure, type: "input" },
]

export const sc: EchoField[] = [
  { label: "IVC diameter", name: "ivc_diameter", unit: measure, type: "input" },
  { label: "IVC collapse", name: "ivc_collapse", unit: "%", type: "input" },
]

export const ssn: EchoField[] = [
  { label: "Aortic arch", name: "aortic_arch", unit: measure, type: "input" },
  { label: "Aorta descending", name: "aorta_descending", unit: measure, type: "input" },
]

export const mitralValve: EchoField[] = [
  { label: "Mitral E", name: "mitral_e", unit: "cm/s", type: "input" },
  { label: "Mitral A", name: "mitral_a", unit: "cm/s", type: "input" },
  {
    label: "Mitral E/A",
    name: "mitral_ea",
    unit: "",
    type: "calculated",
    formula: "mitral_e / mitral_a",
  },
  { label: "Mitral E′", name: "mitral_e_prime", unit: "cm/s", type: "input" },
  {
    label: "Mitral E/E′",
    name: "mitral_ee_prime",
    unit: "",
    type: "calculated",
    formula: "mitral_e / mitral_e_prime",
  },
]

export const aorticValve: EchoField[] = [
  { label: "Aortic Vmax", name: "aortic_vmax", unit: "m/s", type: "input" },
  { label: "Aortic PGmax", name: "aortic_pgmax", unit: "mmHg", type: "input" },
  { label: "Aortic PGmean", name: "aortic_pgmean", unit: "mmHg", type: "input" },
  { label: "Aortic VTI", name: "aortic_vti", unit: measure, type: "input" },
]

export const tricuspidValve: EchoField[] = [
  { label: "Tricuspid Vmax", name: "tricuspid_vmax", unit: "m/s", type: "input" },
  { label: "Tricuspid PGmax", name: "tricuspid_pgmax", unit: "mmHg", type: "input" },
  { label: "Tricuspid Regurgitation Vmax", name: "tr_regurg_vmax", unit: "m/s", type: "input" },
  { label: "Tricuspid Regurgitation PGmax", name: "tr_regurg_pgmax", unit: "mmHg", type: "input" },
]

export const pulmonaryValve: EchoField[] = [
  { label: "Pulmonary Vmax", name: "pulmonary_vmax", unit: "m/s", type: "input" },
  { label: "Pulmonary PGmax", name: "pulmonary_pgmax", unit: "mmHg", type: "input" },
]

export const lvot: EchoField[] = [
  { label: "LVOT diameter", name: "lvot_diameter", unit: measure, type: "input" },
  { label: "LVOT VTI", name: "lvot_vti", unit: measure, type: "input" },
]

export const rvot: EchoField[] = [
  { label: "RVOT diameter", name: "rvot_diameter", unit: measure, type: "input" },
  { label: "RVOT VTI", name: "rvot_vti", unit: measure, type: "input" },
]

export const dopplerValves: EchoField[] = [
  // Válvula mitral
  { label: "Mitral E", name: "mitral_e", unit: "cm/s", type: "input" },
  { label: "Mitral A", name: "mitral_a", unit: "cm/s", type: "input" },
  {
    label: "Mitral E/A",
    name: "mitral_ea",
    unit: "",
    type: "calculated",
    formula: "mitral_e / mitral_a",
  },
  { label: "Mitral E′", name: "mitral_e_prime", unit: "cm/s", type: "input" },
  {
    label: "Mitral E/E′",
    name: "mitral_ee_prime",
    unit: "",
    type: "calculated",
    formula: "mitral_e / mitral_e_prime",
  },

  // Válvula aórtica
  { label: "Aortic Vmax", name: "aortic_vmax", unit: "m/s", type: "input" },
  { label: "Aortic PGmax", name: "aortic_pgmax", unit: "mmHg", type: "input" },
  { label: "Aortic PGmean", name: "aortic_pgmean", unit: "mmHg", type: "input" },
  { label: "Aortic VTI", name: "aortic_vti", unit: measure, type: "input" },

  // Válvula tricúspide
  { label: "Tricuspid Vmax", name: "tricuspid_vmax", unit: "m/s", type: "input" },
  { label: "Tricuspid PGmax", name: "tricuspid_pgmax", unit: "mmHg", type: "input" },
  { label: "Tricuspid Regurgitation Vmax", name: "tr_regurg_vmax", unit: "m/s", type: "input" },
  { label: "Tricuspid Regurgitation PGmax", name: "tr_regurg_pgmax", unit: "mmHg", type: "input" },

  // Válvula pulmonar
  { label: "Pulmonary Vmax", name: "pulmonary_vmax", unit: "m/s", type: "input" },
  { label: "Pulmonary PGmax", name: "pulmonary_pgmax", unit: "mmHg", type: "input" },

  // LVOT
  { label: "LVOT diameter", name: "lvot_diameter", unit: measure, type: "input" },
  { label: "LVOT VTI", name: "lvot_vti", unit: measure, type: "input" },

  // RVOT
  { label: "RVOT diameter", name: "rvot_diameter", unit: measure, type: "input" },
  { label: "RVOT VTI", name: "rvot_vti", unit: measure, type: "input" },
]

