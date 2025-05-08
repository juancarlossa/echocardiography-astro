import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BsaState {
  bsa: number;
  setBsa: (bsa: number) => void;
}

export const useBsaStore = create<BsaState>()(
  persist(
    (set) => ({
      bsa: 0,
      setBsa: (bsa) => set({ bsa }),
    }),
    {
      name: "bsa", // clave en localStorage
      partialize: (state) => ({ bsa: state.bsa }), // solo guardamos bsa
    }
  )
);