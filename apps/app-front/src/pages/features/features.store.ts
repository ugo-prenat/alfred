import { IFrontFeature } from '@alfred/models';
import { devtools } from 'zustand/middleware';
import { create } from 'zustand';

interface IFeaturesStore {
  features: IFrontFeature[];
  setFeatures: (features: IFrontFeature[]) => void;
  setFeature: (feature: IFrontFeature) => void;
}

export const useFeaturesStore = create<IFeaturesStore>()(
  devtools((set) => ({
    features: [],
    setFeatures: (features) => set({ features }),
    setFeature: (newFeature) =>
      set((state) => ({
        features: state.features.map((feature) =>
          feature.name === newFeature.name ? newFeature : feature
        )
      }))
  }))
);
