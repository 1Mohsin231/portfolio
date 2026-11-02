import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React 19 / Next.js App Router hydration-safe mounted hook using useSyncExternalStore.
 * Returns false during SSR and true immediately upon client hydration with zero tearing.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

