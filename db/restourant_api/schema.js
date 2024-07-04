const { buildSchema } = require("graphql");

const restaurantAuth = buildSchema(`
  type User {
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    restaurantUuid: String!
  }

  type Comment {
    comment: String!
    rating: Float!
    createdAt: String!
  }
  
  type MenuItem {
    itemUuid: String!
    name: String!
    description: String!
    isAvailable: Boolean!
    price: Float!
    image: String
  }

  type Category {
    categoryUuid: String!
    categoryName: String!
    categoryDescription: String!
  }
  
  type Reservation {
    reservation_uuid: String!
    personCount: String!
    total: String!
    state: String!
    date: String!
    customerUuid: String!
  }
  
  type Customer {
    email: String!
    phone_number: String!
    first_name: String!
    last_name: String!
  }
  
  type MenuItemUuid {
    menu_item_uuid: String!
  }

  type ReservationItem {
    name: String!
    description: String!
    is_available: Boolean!
    Image: String!
    price: Float!
  }

  type DeletedCategory {
    categoryUuid: String!
    categoryName: String!
  }
  type deletedItem {
        itemUuid: String!
        itemName: String!
  }

  type Query {
    getUserByEmail(email: String!, password: String!): User
    getComments(restaurant_uuid: String!): [Comment]
    getMenuItems(restaurant_uuid: String!): [MenuItem]
    getCategories(restaurant_uuid: String!): [Category]
    getRezervationsForRestaurant(restaurant_uuid: String!): [Reservation]
    getCustomerInfo(customer_uuid: String!): Customer
    getReservationMenuItemUuids(reservation_uuid: String!): [MenuItemUuid]
    getReservationItem(item_uuid: String!): ReservationItem
  }

  type Mutation {
    addCategory(categoryName: String!, categoryDescription: String!, restaurant_uuid: String!): Category
    addMenuItem(name: String!, description: String!, isAvailable: Boolean!, image: String, price: Float!, restaurant_uuid: String!, category_uuid: String!): MenuItem
    deleteCategory(category_uuid: String!): DeletedCategory
    deleteItem(item_uuid: String!): deletedItem
  }
`);

module.exports = restaurantAuth;
