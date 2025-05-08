import { create } from "zustand";
import { persist } from "zustand/middleware";

type Gender = "male" | "female";

interface GenderState {
  gender: Gender;
  setGender: (g: Gender) => void;
}

export const useGenderStore = create<GenderState>()(
  persist(
    (set) => ({
      gender: "male",
      setGender: (g: Gender) => set({ gender: g }),
    }),
    {
      name: "gender",    // clave en localStorage
      partialize: (state) => ({  // solo persistimos el campo `gender`
        gender: state.gender,
      }),
    }
  )
);