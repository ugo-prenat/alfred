import {
  Broadcaster,
  IAPIBroadcaster,
  IBroadcaster,
  IRawBroadcaster
} from '@alfred/models';

export const getBroadcaster = (
  searchParams: Partial<IRawBroadcaster>
): Promise<IAPIBroadcaster> =>
  Broadcaster.findOne(searchParams)
    .then((broadcaster: IAPIBroadcaster | null) => {
      if (!broadcaster)
        throw new Error(
          `broadcaster not found for search params ${JSON.stringify(
            searchParams
          )}`
        );
      return broadcaster;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

export const makeAPIBroadcasterToBroadcaster = (
  apiBroadcaster: IAPIBroadcaster
): IBroadcaster => {
  const { _id, ...broadcaster } = apiBroadcaster.toObject();
  return { id: _id.toString(), ...broadcaster };
};
