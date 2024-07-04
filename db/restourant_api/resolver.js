const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const restaurant_admin_user = require("../../models/restaurant_admin_user");
const Comments = require("../../models/comments");
const MenuItems = require("../../models/menu_item");
const Category = require("../../models/category");
const Reservations = require("../../models/reservations");
const Customer = require("../../models/customer");
const Reservation_MenuItems = require("../../models/reservations_menu_item");
const MenuItem = require("../../models/menu_item");
const MenuItemArchive = require("../../models/menu_item_archive");
const Resolver = {
  getUserByEmail: async (args) => {
    try {
      const { email, password } = args;

      if (!email || !password) {
        throw new Error("Email or password parameter is missing or invalid.");
      }

      const user = await restaurant_admin_user.findOne({
        where: { email: email, password: password },
      });

      if (!user) {
        throw new Error("User with this email and password does not exist.");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "your-secret-key",
        { expiresIn: "1h" }
      );
      return {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        token: token,
        restaurantUuid: user.restaurant_uuid,
      };
    } catch (error) {
      console.error("Error in getUserByEmail resolver:", error);
      throw new Error(error.message);
    }
  },
  getComments: async (args) => {
    try {
      const { restaurant_uuid } = args;
      const comments = await Comments.findAll({
        where: { restaurant_uuid: restaurant_uuid },
      });

      return comments.map((comment) => ({
        comment: comment.comment,
        rating: comment.rating,
        createdAt: comment.created_at.toISOString(),
      }));
    } catch (error) {
      console.error("Error in getComments resolver:", error);
      throw new Error(error.message);
    }
  },
  getMenuItems: async (args) => {
    try {
      const { restaurant_uuid } = args;
      const menuItems = await MenuItems.findAll({
        where: { restaurant_uuid: restaurant_uuid },
      });
      return menuItems.map((menuItem) => ({
        itemUuid: menuItem.item_uuid,
        name: menuItem.name,
        description: menuItem.description,
        isAvailable: menuItem.is_available,
        price: menuItem.price,
        image: menuItem.image,
      }));
    } catch (error) {
      console.error("Error in getMenuItems resolver:", error);
      throw new Error(error.message);
    }
  },
  getCategories: async (args) => {
    try {
      const { restaurant_uuid } = args;
      const categories = await Category.findAll({
        where: { restaurant_uuid: restaurant_uuid },
      });
      return categories.map((category) => ({
        categoryUuid: category.category_uuid,
        categoryName: category.category_name,
        categoryDescription: category.category_description,
      }));
    } catch (error) {
      console.error("Error in getCategories resolver:", error);
      throw new Error(error.message);
    }
  },
  addCategory: async (args) => {
    const { categoryName, categoryDescription, restaurant_uuid } = args;
    const newCategory = await Category.create({
      category_name: categoryName,
      category_description: categoryDescription,
      restaurant_uuid: restaurant_uuid,
    });
    return {
      categoryUuid: newCategory.category_uuid,
      categoryName: newCategory.category_name,
      categoryDescription: newCategory.category_description,
    };
  },

  addMenuItem: async (args) => {
    try {
      const {
        name,
        description,
        isAvailable,
        image,
        price,
        restaurant_uuid,
        category_uuid,
      } = args;
      console.log("cat uuid ", category_uuid);
      let imagePath = null;
      if (
        !image ||
        !name ||
        !description ||
        !price ||
        !restaurant_uuid ||
        !category_uuid
      ) {
        throw new Error(
          "Every menu item must have an image, name, description, price, category and it must be sent by a restaurant owner."
        );
      }

      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");
      const imageName = `${Date.now()}-${name.replace(/\s/g, "-")}.jpg`;
      imagePath = path.join(__dirname, "uploads", imageName);
      const uuid = uuidv4();
      fs.writeFileSync(imagePath, imageBuffer, "base64");
      const newMenuItem = await MenuItems.create({
        item_uuid: uuid,
        name: name,
        description: description,
        is_available: isAvailable,
        image: imagePath,
        price: price,
        restaurant_uuid: restaurant_uuid,
        category_uuid: category_uuid,
      });
      await MenuItemArchive.create({
        item_uuid: uuid,
        name: name,
        description: description,
        is_available: isAvailable,
        image: imagePath,
        price: price,
        restaurant_uuid: restaurant_uuid,
      });

      return {
        itemUuid: newMenuItem.item_uuid,
        name: newMenuItem.name,
        description: newMenuItem.description,
        isAvailable: newMenuItem.is_available,
        price: newMenuItem.price,
        image: newMenuItem.image,
      };
    } catch (error) {
      console.error("Error in addMenuItem resolver:", error);
      throw new Error(error.message);
    }
  },
  deleteCategory: async (args) => {
    try {
      const { category_uuid } = args;
      console.log(`Deleting category with UUID: ${category_uuid}`);
      const category = await Category.findOne({
        where: { category_uuid: category_uuid },
      });

      if (!category) {
        console.log("Category not found.");
        throw new Error("Category not found.");
      }

      const deletedCategory = {
        categoryUuid: category.category_uuid,
        categoryName: category.category_name,
      };

      await category.destroy();

      console.log("Category deleted successfully.");
      return deletedCategory;
    } catch (error) {
      console.error("Error in deleteCategory resolver:", error);
      throw new Error(error.message);
    }
  },

  deleteItem: async (args) => {
    try {
      const { item_uuid } = args;
      console.log(`Deleting item with UUID: ${item_uuid}`);
      const item = await MenuItem.findOne({
        where: { item_uuid: item_uuid },
      });

      if (!item) {
        console.log("Item not found.");
        throw new Error("Item not found.");
      }

      const deletedItem = {
        itemUuid: item.item_uuid,
        itemName: item.name,
      };

      await item.destroy();

      console.log("Item deleted successfully.");
      return deletedItem;
    } catch (error) {
      console.error("Error in deleteItem resolver:", error);
      throw new Error(error.message);
    }
  },

  getRezervationsForRestaurant: async (args) => {
    const { restaurant_uuid } = args;
    const reservations = await Reservations.findAll({
      where: { restaurant_uuid: restaurant_uuid },
    });
    return reservations.map((reservation) => ({
      reservation_uuid: reservation.reservation_uuid,
      personCount: reservation.person_count,
      total: reservation.total,
      state: reservation.state,
      date: reservation.date,
      customerUuid: reservation.customer_uuid,
    }));
  },
  getCustomerInfo: async (args) => {
    const { customer_uuid } = args;
    const customer = await Customer.findOne({
      where: { customer_uuid: customer_uuid },
    });
    return {
      email: customer.email,
      phone_number: customer.phone_number,
      first_name: customer.first_name,
      last_name: customer.last_name,
    };
  },
  getReservationMenuItemUuids: async (args) => {
    const { reservation_uuid } = args;
    const menuItemUuids = await Reservation_MenuItems.findAll({
      where: { reservation_uuid: reservation_uuid },
    });
    return menuItemUuids.map((menuItemUuid) => ({
      menu_item_uuid: menuItemUuid.menu_item_uuid,
    }));
  },
  getReservationItem: async (args) => {
    const { item_uuid } = args;
    const item = await MenuItemArchive.findOne({
      where: { item_uuid: item_uuid },
    });
    return {
      name: item.name,
      description: item.description,
      is_available: item.is_available,
      Image: item.image,
      price: item.price,
    };
  },
};

module.exports = Resolver;
