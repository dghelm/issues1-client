// import { useState, useEffect } from 'react';
// import { init, openAuthWindow, loginSuccess, logoutComplete } from 'libkernel';

// const useKernelAuth = () => {
//   const [userAuthStatus, setUserAuthStatus] = useState(false);
//   const [kernelLoadInProgress, setKernelLoadInProgress] = useState(true);

//   const onAppLoad = async () => {
//     setKernelLoadInProgress(true);
//     await init();
//     setKernelLoadInProgress(false);
//     setupLogin();
//     setupLogout();
//   };

//   const setupLogin = async () => {
//     setUserAuthStatus(false);
//     await loginSuccess();
//     setUserAuthStatus(true);
//   };

//   const setupLogout = async () => {
//     await logoutComplete();
//     setUserAuthStatus(false);
//   };

//   useEffect(() => {
//     onAppLoad();
//   }, []);

//   const login = async () => {
//     openAuthWindow();
//   };

//   return {
//     userAuthStatus,
//     login,
//     kernelLoadInProgress,
//   };
// };

// export default useKernelAuth;

import { useState, useEffect } from 'react';
import { init as kernelInit, openAuthWindow } from 'libkernel';

const useKernelAuth = () => {
  const [userAuthStatus, setUserAuthStatus] = useState(false);
  const [authInProgress, setAuthInProgress] = useState(false);

  // on first load, check authentication status of user
  // this also calls init()
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setAuthInProgress(true);
    const result = await kernelInit();
    result ? setUserAuthStatus(false) : setUserAuthStatus(true);
    setAuthInProgress(false);
  };

  const login = async () => {
    setAuthInProgress(true);
    await openAuthWindow();
    checkAuthStatus();
    setAuthInProgress(false);
  };

  return {
    userAuthStatus,
    login,
    authInProgress,
  };
};

export default useKernelAuth;
