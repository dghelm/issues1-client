import {
  Editable,
  EditablePreview,
  EditableInput,
  Text,
  Checkbox,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

// Rendering a single Todo iteim
const ItemView = ({
  itemId,
  label,
  isComplete,
  toggleCompleteItem,
  updateItemLabel,
  removeItem,
}) => {
  return (
    <HStack spacing="12px">
      <Checkbox
        size="lg"
        isChecked={isComplete}
        onChange={(e) => toggleCompleteItem(itemId)}
      />
      {isComplete && <Text decoration="line-through">{label}</Text>}
      {!isComplete && (
        <Editable
          defaultValue={label}
          onSubmit={(newLabel) => {
            updateItemLabel(itemId, newLabel);
          }}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      )}
      <IconButton
        size="xs"
        isRound={true}
        variant="outline"
        aria-label="Remove Item"
        icon={<DeleteIcon />}
        onClick={() => {
          removeItem(itemId);
        }}
      />
    </HStack>
  );
};

// iterates through Todo List, creating an ItemView for each element
const ItemsView = (props) => {
  return (
    <VStack spacing="16px">
      {props.todoList.map((item) => (
        <ItemView key={item.itemId} {...item} {...props} />
      ))}
    </VStack>
  );
};

export default ItemsView;
