import "./scss/styles.scss";

import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

import { Catalog } from "./components/Models/Catalog";
import { Cart } from "./components/Models/Cart";
import { Customer } from "./components/Models/Customer";

import { Api } from "./components/base/Api";
import { ApiClient } from "./components/ApiClient";

import { IOrder } from "./types";

/* Тестируем работу модели данных Catalog*/
const catalog = new Catalog();

catalog.products = apiProducts.items;
console.log("Массив товаров из каталога: ", catalog.products);

const productId = "c101ab44-ed99-4a54-990d-47aa2bb4e7d9";
console.log("Товар с id: c101ab44-ed99-4a54-990d-47aa2bb4e7d9 ", catalog.getProductById(productId));

catalog.selectedProduct = {
  id: "b06cde61-912f-4663-9751-09956c0eed67",
  description: "Будет стоять над душой и не давать прокрастинировать.",
  image: "/Asterisk_2.svg",
  title: "Мамка-таймер",
  category: "софт-скил",
  price: null,
};

console.log("Покупатель выбрал следующий товар: ", catalog.selectedProduct);

/* Тестируем работу модели данных Cart*/
const shoppingCart = new Cart();

console.log("Пока в корзине нет товаров: ", shoppingCart.getItems());
console.log("Количество: ", shoppingCart.getItemsCount());
console.log("Общая сумма: ", shoppingCart.getTotalPrice());

const timerProduct = {
  id: "b06cde61-912f-4663-9751-09956c0eed67",
  description: "Будет стоять над душой и не давать прокрастинировать.",
  image: "/Asterisk_2.svg",
  title: "Мамка-таймер",
  category: "софт-скил",
  price: null,
};

const frameworkProduct = {
  id: "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
  description:
    "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
  image: "/Soft_Flower.svg",
  title: "Фреймворк куки судьбы",
  category: "дополнительное",
  price: 2500,
};

shoppingCart.addItem(timerProduct);
shoppingCart.addItem(frameworkProduct);
shoppingCart.addItem(timerProduct);

console.log("Товары в корзине: ", shoppingCart.getItems());
console.log("Количество: ", shoppingCart.getItemsCount());
console.log("Общая сумма: ", shoppingCart.getTotalPrice());

const itemId = "854cef69-976d-4c2a-a18c-2aa45046c39";
console.log('Проверяю наличие товара с id "412bcf81-7e75-4e70-bdb9-d3c73c9803b7": ', shoppingCart.checkItem(itemId));

shoppingCart.clearCart();

console.log("Корзина очищена: ", shoppingCart.getItems());
console.log("Количество: ", shoppingCart.getItemsCount());
console.log("Общая сумма: ", shoppingCart.getTotalPrice());

/* Тестируем работу модели данных Customer*/
const customerWithEmptyFields = new Customer();

customerWithEmptyFields.setNewValue("payment", "cash");
customerWithEmptyFields.setNewValue("phone", "+79997773366");
console.log("Данные покупателя 1: ", customerWithEmptyFields.getInfo());

console.log("Результат проверки данных покупателя 1: ", customerWithEmptyFields.validate());

customerWithEmptyFields.clearInfo();
console.log("Данные покупателя 1 удалены: ", customerWithEmptyFields.getInfo());

const customerWithFilledFields = new Customer();

customerWithFilledFields.setNewValue("payment", "card");
customerWithFilledFields.setNewValue("email", "test@test.ru");
customerWithFilledFields.setNewValue("phone", "+74952001155");
customerWithFilledFields.setNewValue("address", "г. Москва, ул. Охотный ряд, д. 1");

console.log("Данные покупателя 2: ", customerWithFilledFields.getInfo());

console.log("Результат проверки данных покупателя 2: ", customerWithFilledFields.validate());

/* Тестируем работу с сервером */
const realApi = new Api(API_URL);
const service = new ApiClient(realApi);

const catalogFromServer = new Catalog();

service.getProducts()
.then(data => {
  catalogFromServer.products = data.items;
  console.log("Массив товаров, полученных от сервера: ", catalogFromServer.products);
})
.catch(error => {
  console.error("Возникла ошибка: ", error);
})

const order: IOrder = {
  payment: "card",
  email: "",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
};

service.postOrder(order)
.then(data => {
  console.log(`Заказ оформлен - id заказа: ${data.id}, общая стоимость заказа: ${data.total}`);
})
.catch(error => {
  console.error("Ошибка при оформлении заказа: ", error);
})
