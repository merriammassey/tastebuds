export const getSavedRestaurantIds = () => {
    const savedRestaurantIds = localStorage.getItem('saved_restaurants')
      ? JSON.parse(localStorage.getItem('saved_restaurants'))
      : [];
  
    return savedRestaurantIds;
  };
  
  export const saveRestaurantIds = (restaurantIdArr) => {
    if (restaurantIdArr.length) {
      localStorage.setItem('saved_restaurants', JSON.stringify(restaurantIdArr));
    } else {
      localStorage.removeItem('saved_restaurants');
    }
  };
  
  export const removeRestaurantId = (restaurantId) => {
    const savedRestaurantIds = localStorage.getItem('saved_restaurants')
      ? JSON.parse(localStorage.getItem('saved_restaurants'))
      : null;
  
    if (!savedRestaurantIds) {
      return false;
    }
  
    const updatedSavedRestaurantIds = savedRestaurantIds?.filter((savedRestaurantId) => savedRestaurantId !== RestaurantId);
    localStorage.setItem('saved_restaurants', JSON.stringify(updatedSavedRestaurantIds));
  
    return true;
  };
  