import { useContext } from 'react';
import { AppContext} from '../contexts';

export default function useAppContext() {
  const context = useContext(AppContext);
  if(context === null) {
    throw new Error('Expected app context to be defined');
  }

  return context;
}
