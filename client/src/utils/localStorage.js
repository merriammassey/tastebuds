export const getSavedRestaurantIds = () => {
  const savedRestaurantIds = localStorage.getItem("saved_restaurants")
    ? JSON.parse(localStorage.getItem("saved_restaurants"))
    : [];

  return savedRestaurantIds;
};

export const saveRestaurantIds = (restaurantIdArr) => {
  if (restaurantIdArr.length) {
    localStorage.setItem("saved_restaurants", JSON.stringify(restaurantIdArr));
  } else {
    localStorage.removeItem("saved_restaurants");
  }
};

export const removeRestaurantId = (id) => {
  const savedRestaurantIds = localStorage.getItem("saved_restaurants")
    ? JSON.parse(localStorage.getItem("saved_restaurants"))
    : null;

  if (!savedRestaurantIds) {
    return false;
  }

  const updatedSavedRestaurantIds = savedRestaurantIds?.filter(
    (savedRestaurantId) => savedRestaurantId !== id
  );
  localStorage.setItem(
    "saved_restaurants",
    JSON.stringify(updatedSavedRestaurantIds)
  );

  return true;
};
