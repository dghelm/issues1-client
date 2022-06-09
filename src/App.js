import { Box, Heading, HStack, VStack, Center, Button } from '@chakra-ui/react';
import ItemsView from './components/ItemsView';
import AddItem from './components/AddItem';
import AuthButton from './components/AuthButton';
import useKernelAuth from './hooks/useKernelAuth';
import useTodoModule from './hooks/useTodoModule';

function App() {
  const { userAuthStatus, kernelLoadInProgress, login } = useKernelAuth();
  const {
    todoList,
    addItem,
    removeItem,
    updateItemLabel,
    toggleCompleteItem,
    saveToSkynet,
  } = useTodoModule(userAuthStatus);

  return (
    <Center>
      <Box
        width="md"
        paddingY="12"
        marginTop="12"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <VStack spacing="48px">
          <Heading>Skynet Todo Client</Heading>
          <AuthButton {...{ userAuthStatus, kernelLoadInProgress, login }} />
          <ItemsView
            {...{ todoList, removeItem, updateItemLabel, toggleCompleteItem }}
          />
          <HStack spacing="12px">
            <AddItem addItem={addItem} />
          </HStack>
          <Button onClick={saveToSkynet}>Persist To Skynet</Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default App;
