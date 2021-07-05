//createContext to instantiate a new Context object
import React, { createContext, useContext } from "react";
import { useRestaurantReducer } from "./reducers";

//instantiate global state object
const StoreContext = createContext();
//pull provider out of context
const { Provider } = StoreContext;

//create provider function to manage and update state using reducer, bundling it all
const StoreProvider = ({ value = [], ...props }) => {
  //state is up to date version of global state; dispatch is method used to update state...looks for action object as argument
  const [state, dispatch] = useRestaurantReducer({
    restaurants: [],
    event: [],
    currentRestaurants: [],
    //cartOpen: false,
    //categories: [],
    //currentCategory: "",
  });
  //confirm it works
  console.log(state);
  //value prop allows us to pass in more data if needed
  //...props allows props.children since this component wraps all other components. without it nothing would render
  return <Provider value={[state, dispatch]} {...props} />;
};

//function or custom hook to use useContext hook for components that need data from StoreProvider
//when executed within a component, receive [state, dispatch] data from StoreProvider, allowing all components to access data from global state container or update it using dispatch function
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
