import { Feature, IAPIFeature, IRawFeature } from '@alfred/models';

export const getFeature = (searchParams: Partial<IRawFeature>) =>
  Feature.findOne(searchParams)
    .then((feature: IAPIFeature | null) => {
      if (!feature)
        throw new Error(
          `Feature not found for params ${JSON.stringify(searchParams)}}`
        );
      return feature;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
