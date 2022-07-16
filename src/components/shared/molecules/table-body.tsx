import { ReactNode } from "react";
import For from "../atoms/for";
import Show from "../atoms/show";
import Repeat from "./repeat";

interface Props<T> {
  data: T[];
  loading?: boolean;
  fallback?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}

const TableBody = <T,>(p: Props<T>) => {
  return (
    <tbody>
      <Show
        when={!p.loading}
        fallback={<Repeat occurrence={5}>{p.fallback}</Repeat>}
      >
        <For
          data={p.data}
          fallback={
            <tr>
              <td colSpan={999} style={{ textAlign: "center" }}>
                無法顯示任何數據
              </td>
            </tr>
          }
        >
          {p.children}
        </For>
      </Show>
    </tbody>
  );
};

export default TableBody;
