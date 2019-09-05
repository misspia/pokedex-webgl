const HOME_ROUTE = '/';
const LIST_ROUTE = '/list';
const ENTRY_ROUTE = '/entry/';

const routes = {
  home: HOME_ROUTE,
  list: LIST_ROUTE,
  entry: `${ENTRY_ROUTE}:nationalNo`,

  toHome: () => HOME_ROUTE,
  toList: () => LIST_ROUTE,
  toEntry: (index) => {
    return `${ENTRY_ROUTE}${index}`;
  }
}

export default routes;