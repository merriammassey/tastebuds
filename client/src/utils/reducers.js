//import possible actions
import {
  UPDATE_YELP_RESTAURANTS,
  UPDATE_SEARCHED_RESTAURANTS,
  UPDATE_EVENT_NOTES,
  UPDATE_EVENT_TITLE,
  UPDATE_EVENT_ID,
  UPDATE_EVENTDATA,
  UPDATE_NAV,
  SAVE_USERDATA,
} from "./actions";
import { useReducer } from "react";

//create function called reducer, passing value of action.type into a switch statement
export const reducer = (state, action) => {
  //compare action.type to possible actions
  switch (action.type) {
    //if action type value is the value of 'UPDATE_RPODUCTS', return a new state object with an updated products array
    //setting products key to new array with action.products value spread across it
    case UPDATE_YELP_RESTAURANTS:
      return {
        ...state,
        yelpRestaurants: [...state.yelpRestaurants, ...action.yelpRestaurants],
      };
    case UPDATE_SEARCHED_RESTAURANTS:
      return {
        ...state,
        currentRestaurants: [
          ...state.currentRestaurants,
          ...action.currentRestaurants,
        ],
      };
    case UPDATE_EVENT_NOTES:
      return {
        ...state,
        eventNote: action.eventNote,
      };

    case UPDATE_EVENT_TITLE:
      return {
        ...state,
        eventTitle: action.eventTitle,
      };
    //if action type value is update_categories, return a new state object with an updated categories array
    case UPDATE_EVENTDATA:
      return {
        ...state,
        currentEvent: action.currentEvent,
      };
    case SAVE_USERDATA:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case UPDATE_EVENT_ID:
      return {
        ...state,
        eventId: action.eventId,
      };
    case UPDATE_NAV:
      return {
        ...state,
        token: action.token,
      };
    //if it's none of these actions, do not update state
    default:
      return state;
  }
};

//was ProductReducer .... create function to help initialize global state and update it with reducer function
export function useRestaurantReducer(initialState) {
  return useReducer(reducer, initialState);
}
