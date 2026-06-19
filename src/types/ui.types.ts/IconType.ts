import type { ActiveIconType } from "../header.types.ts/ActiveIconType";

export type IconType = {
    name: "user" | 'black$theme' | 'white$theme' | 'logout';
    variation?: string;
    onClick?: () => void;
    activeIcon?: ActiveIconType;
}