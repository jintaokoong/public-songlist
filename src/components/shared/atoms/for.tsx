import { ReactNode } from "react";
import Show from "./show";

interface Props<T> {
  data: T[];
  children: (item: T, index: number) => ReactNode;
  fallback?: ReactNode;
}

const For = <T,>(p: Props<T>) => {
  return (
    <Show when={p.data.length > 0} fallback={p.fallback}>
      {p.data.map(p.children)}
    </Show>
  );
};

export default For;
