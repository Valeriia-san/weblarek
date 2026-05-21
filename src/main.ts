import "./scss/styles.scss";

import { ValidationRules } from "./utils/constants";
import { API_URL } from "./utils/constants";

import { Catalog } from "./components/Models/Catalog";
import { Cart } from "./components/Models/Cart";
import { Customer } from "./components/Models/Customer";

import { Api } from "./components/base/Api";
import { ApiClient } from "./components/ApiClient";

import { IOrder } from "./types";

/* Тестируем работу с сервером */
const realApi = new Api(API_URL);
const service = new ApiClient(realApi);

const order: IOrder = {
  payment: "card",
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
};

const result = await service.postData("/order/", order);
console.log("Результат публикации заказа", result);

const data = await service.getData("/product/");

/* Тестируем работу модели данных Catalog*/
const catalog = new Catalog();

catalog.products = data.items;
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
const testUser = {
  email: "testya.ru",
  phone: "+9109999999",
  address: "Москва, Вокзальная площадь, д. 1",
};

const customer = new Customer(testUser);
console.log("Данные покупателя 1: ", customer.getInfo());

customer.setNewValue("payment", "cash");
console.log("Данные обновлены: ", customer.getInfo());

console.log("Результат проверки данных: ", customer.validate(ValidationRules));

customer.clearInfo();
console.log("Данные удалены: ", customer.getInfo());
