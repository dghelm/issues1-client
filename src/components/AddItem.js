import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';

const AddItem = ({ addItem }) => {
  const [inputVal, setInputVal] = useState('');

  return (
    <>
      <Input
        placeholder="Item Label"
        value={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          addItem(inputVal);
          setInputVal('');
        }}
      >
        Add Item
      </Button>
    </>
  );
};

export default AddItem;
