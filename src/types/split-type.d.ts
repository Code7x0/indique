declare module "split-type" {
  export type SplitTypeOptions = {
    types?: string;
    tagName?: string;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
  };

  export default class SplitType {
    constructor(
      target: string | Element | Element[] | NodeListOf<Element>,
      options?: SplitTypeOptions,
    );
    chars: HTMLElement[] | null;
    words: HTMLElement[] | null;
    lines: HTMLElement[] | null;
    revert(): void;
  }
}
