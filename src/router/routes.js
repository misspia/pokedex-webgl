const HOME_ROUTE = '/';
const ENTRY_ROUTE = '/entry/';

const routes = {
  home: HOME_ROUTE,
  entry: `${ENTRY_ROUTE}:nationalNo`,

  toEntry: (index) => {
    return `${ENTRY_ROUTE}${index}`;
  }
}

export default routes;