import { useMutation } from '@tanstack/react-query';
import { loginBroadcaster } from './onboarding.api';

export const useLoginBoradcaster = () => {
  const { mutate: handleLoginBroadcaster, ...rest } = useMutation({
    mutationKey: ['loginBroadcaster'],
    mutationFn: loginBroadcaster
  });
  return { handleLoginBroadcaster, ...rest };
};
