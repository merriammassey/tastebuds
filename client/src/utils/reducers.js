//import possible actions
import { UPDATE_SEARCHED_RESTAURANTS, UPDATE_EVENT } from "./actions";
import { useReducer } from "react";

//create function called reducer, passing value of action.type into a switch statement
export const reducer = (state, action) => {
  //compare action.type to possible actions
  switch (action.type) {
    //if action type value is the value of 'UPDATE_RPODUCTS', return a new state object with an updated products array
    //setting products key to new array with action.products value spread across it
    case UPDATE_SEARCHED_RESTAURANTS:
      return {
        ...state,
        currentRestaurants: [...action.currentRestaurants],
      };

    //if action type value is update_categories, return a new state object with an updated categories array
    case UPDATE_EVENT:
      return {
        ...state,
        event: [...action.event],
      };
    /* 
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    //add cart
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      //use filter to only keep items that don't match the _id property provided
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        //check array length to set cartOPen to false when array is empty
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
 */
    //if it's none of these actions, do not update state
    default:
      return state;
  }
};

//was ProductReducer .... create function to help initialize global state and update it with reducer function
export function useRestaurantReducer(initialState) {
  return useReducer(reducer, initialState);
}
