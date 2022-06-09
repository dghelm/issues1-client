import { useState, useEffect } from 'react';
import { callModule, connectModule } from 'libkernel';

// Define location of our module
const todoModule = 'AQCughuxE6cateC2rHsgbClMH6-JOqOl8L65Od5r7_rfPg';

const useTodoModule = (userAuthStatus) => {
  const [todoList, setTodoList] = useState([]);

  // on first load and each time userAuthStatus changes
  // get items list from module
  useEffect(() => {
    // if our user logs in, get items
    // if our user logs out, clear local state
    userAuthStatus ? subscribeItems() : setTodoList([]);
  }, [userAuthStatus]);

  const receiveSubscriptionUpdate = (data) => {
    setTodoList(data?.items);
  };

  const subscribeItems = async () => {
    //we won't handle sending updates to module, or dealing with closing response
    connectModule(todoModule, 'subscribeItems', {}, receiveSubscriptionUpdate);
  };

  const getItems = async () => {
    const [result, err] = await callModule(todoModule, 'getItems');

    // if no error, update state of list
    err ? console.error({ err }) : setTodoList(result.items);
  };

  const addItem = async (label) => {
    const [_, err] = await callModule(todoModule, 'addItem', { label });
    err && console.error({ err });
  };

  const removeItem = async (itemId) => {
    const [_, err] = await callModule(todoModule, 'removeItem', { itemId });
    err && console.error({ err });
  };

  const updateItemLabel = async (itemId, label) => {
    const [_, err] = await callModule(todoModule, 'updateItemLabel', {
      itemId,
      label,
    });
    err && console.error({ err });
  };

  const toggleCompleteItem = async (itemId) => {
    const [_, err] = await callModule(todoModule, 'toggleCompleteItem', {
      itemId,
    });
    err && console.error({ err });
  };

  const saveToSkynet = async () => {
    const [_, err] = await callModule(todoModule, 'saveToSkynet', {});
    err && console.error({ err });
  };

  return {
    todoList,
    addItem,
    removeItem,
    updateItemLabel,
    toggleCompleteItem,
    saveToSkynet,
  };
};

export default useTodoModule;
