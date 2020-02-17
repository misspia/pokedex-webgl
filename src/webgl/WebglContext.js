import { createContext } from 'react';

const WebglContext = createContext({});

export const WebglProvider = WebglContext.Provider;
export const WebglConsumer = WebglContext.Consumer;
export default WebglContext;
