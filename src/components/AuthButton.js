import { Button } from '@chakra-ui/react';

const AuthButton = ({ userAuthStatus, kernelLoadInProgress, login }) => {
  return (
    <Button disabled={userAuthStatus || kernelLoadInProgress} onClick={login}>
      {userAuthStatus && 'User Authenticated'}
      {kernelLoadInProgress && 'Loading Kernel...'}
      {!userAuthStatus && !kernelLoadInProgress && 'Autheticate with Kernel'}
    </Button>
  );
};

export default AuthButton;
