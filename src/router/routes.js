const HOME_ROUTE = '/';
const LIST_ROUTE = '/list';
const ENTRY_ROUTE = '/entry/';
const ERROR_ROUTE = '/error';


export const home = HOME_ROUTE;
export const list = LIST_ROUTE;
export const entry = `${ENTRY_ROUTE}:nationalNo`;
export const error = ERROR_ROUTE;

export const toHome = () => HOME_ROUTE;
export const toList = () => LIST_ROUTE;
export const toEntry = (nationalNo) => {
  return `${ENTRY_ROUTE}${nationalNo}`;
}
