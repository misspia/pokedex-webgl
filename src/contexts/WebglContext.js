import { createContext } from 'react';

const defaultValue = {
  webgl: null,
};

export const WebglContext = createContext(defaultValue);
export const WebglProvider = WebglContext.Provider;
export const WebglConsumer = WebglContext.Consumer;
