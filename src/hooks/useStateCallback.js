import { useState, useRef, useCallback, useEffect } from "react";

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);

  // we need this flag for 2 reasons:
  // 1. To prevent the call on mount (first useEffect call)
  // 2. To force the effect to run when the state wasn't really updated
  // i.e next-state === previous-state.
  const [shouldRunCBs, setRunCBs] = useState(false);

  // tracking a queue because we may have more than 1 callback per update?
  const cbQRef = useRef([]);

  function customSetState(value, cb) {
    if (typeof cb === "function") {
      cbQRef.current.push(cb);
      // we force the effect to run even if the state wasn't really updated
      // i.e next-state === previous-state.
      // this is how the callback in classes work as well
      // we can opt-out from this behaviour though
      setRunCBs(true);
    }
    setState(value);
  }

  useEffect(() => {
    if (shouldRunCBs) {
      // we must pass back the new value
      //because the consumers can't get it via the closure of thier component
      // and they don't have an instance like in classes.
      cbQRef.current.forEach((cb) => cb(state));
      cbQRef.current = [];
      setRunCBs(false);
    }
  }, [state, shouldRunCBs]);

  return [state, useCallback(customSetState, [])];
}
