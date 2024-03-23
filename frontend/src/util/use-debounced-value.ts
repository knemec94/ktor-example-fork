import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T = any>(value: T, wait: number) {
  const [_value, setValue] = useState(value);
  const timeoutRef = useRef<number | null>(null);

  const cancel = () => window.clearTimeout(timeoutRef.current!);

  useEffect(() => {
    cancel();
    timeoutRef.current = window.setTimeout(() => {
      setValue(value);
    }, wait);
    return () => cancel();
  }, [value, wait]);

  return _value;
}
