/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@barba/core" {
  interface BarbaConfig {
    transitions?: Array<{
      name: string;
      once?: (data: any) => Promise<void>;
      leave?: (data: any) => Promise<void>;
      enter?: (data: any) => Promise<void>;
      afterEnter?: (data: any) => void;
    }>;
    debug?: boolean;
  }

  interface BarbaInstance {
    init: (config: BarbaConfig) => void;
    go: (href: string) => void;
  }

  const barba: BarbaInstance;
  export default barba;
  export { BarbaConfig };
}
