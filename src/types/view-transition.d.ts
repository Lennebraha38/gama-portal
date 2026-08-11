import type { ReactElement, ReactNode } from "react";

declare module "react" {
  export type ViewTransitionClass =
    | string
    | {
        default?: string;
        "nav-forward"?: string;
        "nav-back"?: string;
      };

  export interface ViewTransitionProps {
    name?: string;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    share?: ViewTransitionClass;
    default?: ViewTransitionClass;
    children?: ReactNode;
  }

  export function ViewTransition(props: ViewTransitionProps): ReactElement;
}
