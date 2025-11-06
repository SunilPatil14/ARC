declare module "ethereum-blockies-base64" {
  export function createDataURL(options: { seed: string; size?: number; scale?: number }): string;
}
