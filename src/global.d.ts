export {};

declare global {
  interface Window {
    __initialTab?: string | null;
  }
}