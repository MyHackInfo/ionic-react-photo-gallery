import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IGetData {
  data: {
    name: string;
    code: string;
    fullName: string;
    message?: string;
  } | null;
  banksIds: string[];
  error: { message: string } | null;
  getData: (url: string) => void;
  getBanks: (url: string) => void;
  geDatatById: (url: string, id: number) => void;
}

const useStore = create<IGetData>()(
  devtools(
    persist(
      (set) => ({
        data: null,
        banksIds: [],
        error: null,
        getBanks: async (url: string) => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            const banksIds = data
              ?.map((item: any) => item.code)
              .filter((code: number) => code !== null);

            set({ banksIds, error: null });
          } catch (error: any) {
            set({ data: null, error: error.message });
          }
        },
        getData: async (url: string) => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            set({ data, error: null });
          } catch (error: any) {
            set({ data: null, error: error.message });
          }
        },
        geDatatById: async (url: string, id: number) => {
          try {
            const response = await fetch(`${url}/${id}`);
            const updatedData = await response.json();
            set({ data: updatedData, error: null });
          } catch (error: any) {
            set({ error: error.message });
          }
        },
      }),
      {
        name: "get-data",
      }
    )
  )
);

export default useStore;
