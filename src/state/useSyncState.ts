import { useEffect, useRef } from "react";
import { ImmerHook, useImmer } from "use-immer";

export const useSyncState = <TState>(
  initialState: TState,
  syncCallback: (state: TState) => void
): ImmerHook<TState> => {
  const [state, setState] = useImmer(initialState);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state);
    }
    didMountRef.current = true;
  }, [state, setState]);

  return [state, setState];
};
