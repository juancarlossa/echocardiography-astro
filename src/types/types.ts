export type EchoField = {
  label: string;
  name: string;
  unit: string;
  type: 'input' | 'calculated' | 'select' | 'toggle';
  formula?: string;
  absoluteReferenceRange?: {
    male?: ReferenceRange;
    female?: ReferenceRange;
  };
  bsaIndexedReferenceRange?: {
    male?: ReferenceRange;
    female?: ReferenceRange;
  };
}

export type ReferenceRange = {
  lowerValue: number;
  higherValue: number;
};