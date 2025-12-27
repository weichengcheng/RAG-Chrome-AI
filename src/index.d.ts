interface Window {
  // chrome扩展程序
  chrome: T;
  LanguageDetector: T;
  LanguageModel: T;
  Translator: T;
  Summarizer: T;
}

declare const window: Window;

// declare namespace $ {

// }

declare const $: JQueryStatic;

interface JQueryStatic {
  (selector: string, context?: Element | JQuery): JQuery;
}

interface JQuery {
  append(content: string | JQuery | Element | Array<Element>): this;
}