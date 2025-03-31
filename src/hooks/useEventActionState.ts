import { ServerActionResult } from "@/api/types";
import { useActionState, useEffect } from "react";

type UseEventActionStateOptions<Payload> = {
  serverAction: (
    state: Awaited<ServerActionResult | null>,
    payload: Payload
  ) => Promise<ServerActionResult | null>;
  onSuccess?: (result: ServerActionResult) => void;
  onError?: (result: ServerActionResult) => void;
};

export const useEventActionState = <Payload>({
  serverAction,
  onSuccess,
  onError,
}: UseEventActionStateOptions<Payload>): [
  state: Awaited<ServerActionResult | null>,
  dispatch: (payload: Payload) => void,
  isPending: boolean
] => {
  const [result, formAction, pending] = useActionState<
    ServerActionResult | null,
    Payload
  >(serverAction, null);

  useEffect(() => {
    if (result) {
      if (result.isSuccess ) {
        if(onSuccess) onSuccess(result);
      } else {
        if(onError) onError(result);
      }
    }
  }, [result]);

  return [result, formAction, pending];
};
