import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect warns during SSR because there is no layout to read.
 * Client components still render on the server, so alias to useEffect there
 * and use the real thing in the browser.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
