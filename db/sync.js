const sequelize = require("./sequelize");

const category = require("../models/category");
const comments = require("../models/comments");
const customer = require("../models/customer");
const favorite_restaurants = require("../models/favorite_restaurants");
const menu_item_category = require("../models/menu_item_category");
const menu_item = require("../models/menu_item");
const OAuth2_register = require("../models/OAuth2_register");
const phone_registered_users = require("../models/phone_registered_users");
const reservations_menu_item = require("../models/reservations_menu_item");
const reservations = require("../models/reservations");
const restaurant_admin_user = require("../models/restaurant_admin_user");
const restaurant = require("../models/restaurant");

async function syncModels() {
  await sequelize.sync();
  console.log("Tüm modeller senkronize edildi.");
}

module.exports = syncModels;
