import { FC, PropsWithChildren, ReactNode } from "react";

interface Props {
  when?: boolean;
  fallback?: ReactNode;
}

const Show: FC<PropsWithChildren<Props>> = (p) => {
  return <>{p.when ? p.children : p.fallback}</>;
};

export default Show;
