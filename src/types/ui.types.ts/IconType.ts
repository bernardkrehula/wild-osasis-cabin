export type IconType = {
    name: "user" | 'black$theme' | 'white$theme' | 'logout';
    variation?: string;
    onClick: () => void;
}