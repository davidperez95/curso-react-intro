import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider ({ children }) {

    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
      } = useLocalStorage('TODOS_V1', []);
      const [searchValue, setSearchValue] = React.useState('');

      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      const searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLocaleLowerCase();
        return todoText.includes(searchText);
      });

      const addTodo = (text) => {
        const newItem = [...todos];
        newItem.push({
          text,
          completed: false,
        })
        saveTodos(newItem);
      };
    
      const completeTodo = (text) => {
        const newItem = [...todos];
        const todoIndex = newItem.findIndex(
          (todo) => todo.text === text
        );
        newItem[todoIndex].completed = true;
        saveTodos(newItem);
      };
    
      const deleteTodo = (text) => {
        const newItem = [...todos];
        const todoIndex = newItem.findIndex(
          (todo) => todo.text === text
        );
        if (newItem[todoIndex].completed === false) {
          alert('The todo is not completed');
        } else {
          newItem.splice(todoIndex, 1);
          saveTodos(newItem);
        };
      };
    
    return (
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo,
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider };


/* const defaultTodos = [
  {text: 'Pensar a mi movia la mas hermosa', completed: true},
  {text: 'Amar a mi movia la mas hermosa', completed: true},
  {text: 'Preocuparme por el trabajo', completed: false},
  {text: 'Tomar el curso de intro a React', completed: false},
  {text: 'LALALALALA', completed: false},
]; */

// localStorage.setItem(itemName, JSON.stringify(defaultTodos));
// localStorage.removeItem(itemName);

// Custom Hook for the useState with localStorage