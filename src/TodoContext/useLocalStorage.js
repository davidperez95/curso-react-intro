import React from "react";

function useLocalStorage (itemName, initialState) {

  const [item, setItem] = React.useState(initialState);

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState(false);

  
  React.useEffect(() => {

    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
    
        let parsedItems;
  
        if (!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialState));
          parsedItems = initialState
        } else {
          parsedItems = JSON.parse(localStorageItem);
          setItem(parsedItems);
        }
  
        setLoading(false);
  
      } catch (error) {
        setLoading(false);
        setError(true);
      };
    }, 3000);

    console.log('Inside the use Effect');

  }, [loading]);
  
  /* const [item, setItem] = React.useState(() => {
      const itemFromStorage = window.localStorage.getItem(itemName)
      if (!itemFromStorage) {
        localStorage.setItem(itemName, JSON.stringify(initialState));
        return initialState
      }
      return JSON.parse(itemFromStorage)
    }); */
  
    const saveItem = (newItem) => {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setItem(newItem);
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  
};

export { useLocalStorage };