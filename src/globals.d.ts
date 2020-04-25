declare module nearestColor {
    export type RGB = { r: number, b: number, g: number }
    export function from(colors: Record<string, string>): (color: string | RGB) => { name: string, rgb: RGB, value: string }
}
