import { useEffect } from 'react';

export default function useMobileCheck(callback) {
  useEffect(() => {
    const onResize = () => {
      callback(checkIsMobile());
    }
    window.addEventListener('resize', onResize);
    onResize();

    return () => (
      window.removeEventListener('resize', onResize)
    );
  }, []);
}

function checkIsMobile() {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if(isMobileDevice) {
    return true;
  }
  const isMobileWidth = window.innerWidth < 600;
  if(isMobileWidth) {
    return true;
  }
  return false;
}
