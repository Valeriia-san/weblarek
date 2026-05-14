import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { ValidationRules } from './utils/constants';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Customer } from './components/Models/Customer';

/* Тестируем работу модели данных Customer*/
const user1 = {
  email: 'testya.ru', 
  phone: '+9109999999',
  address: 'Москва, Вокзальная площадь, д. 1'
}

const customer = new Customer(user1);
console.log('Данные покупателя 1: ', customer.getInfo());

customer.setNewValue('payment', 'cash');
console.log('Данные обновлены: ', customer.getInfo());

console.log('Результат проверки данных: ', customer.validate(ValidationRules));

customer.clearInfo();
console.log('Данные удалены: ', customer.getInfo());

/* Тестируем работу модели данных Cart*/
const shoppingCart = new Cart();

const product1 = {
  "id": "b06cde61-912f-4663-9751-09956c0eed67",
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "image": "/Asterisk_2.svg",
  "title": "Мамка-таймер",
  "category": "софт-скил",
  "price": null
};

const product2 = {
  "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
  "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
  "image": "/Soft_Flower.svg",
  "title": "Фреймворк куки судьбы",
  "category": "дополнительное",
  "price": 2500
};

console.log('Товары из корзины: ', shoppingCart.getItems());
console.log('всего в корзине товаров: ', shoppingCart.getItemsCount());
console.log('Общая сумма: ', shoppingCart.getTotalPrice());

shoppingCart.addItem(product1);

console.log('Товары из корзины: ', shoppingCart.getItems());
console.log('всего в корзине товаров: ', shoppingCart.getItemsCount());
console.log('Общая сумма: ', shoppingCart.getTotalPrice());

shoppingCart.addItem(product2);

console.log('Товары из корзины: ', shoppingCart.getItems());
console.log('всего в корзине товаров: ', shoppingCart.getItemsCount());
console.log('Общая сумма: ', shoppingCart.getTotalPrice());

shoppingCart.addItem(product1);

console.log('Товары из корзины: ', shoppingCart.getItems());
console.log('всего в корзине товаров: ', shoppingCart.getItemsCount());
console.log('Общая сумма: ', shoppingCart.getTotalPrice());

const itemId = '854cef69-976d-4c2a-a18c-2aa45046c39';
console.log('Проверяю наличие товара по id "412bcf81-7e75-4e70-bdb9-d3c73c9803b7": ', shoppingCart.checkItem(itemId));

shoppingCart.clearCart();

console.log('Товары из корзины: ', shoppingCart.getItems());
console.log('всего в корзине товаров: ', shoppingCart.getItemsCount());
console.log('Общая сумма: ', shoppingCart.getTotalPrice());

/* Тестируем работу модели данных Catalog*/
const catalog = new Catalog();

catalog.products = apiProducts.items;

console.log('Массив товаров из каталога: ', catalog.products);
console.log('Товар с id: c101ab44-ed99-4a54-990d-47aa2bb4e ', catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e"));

catalog.selectedProduct = {
  id: "b06cde61-912f-4663-9751-09956c0eed67",
  description: "Будет стоять над душой и не давать прокрастинировать.",
  image: "/Asterisk_2.svg",
  title: "Мамка-таймер",
  category: "софт-скил",
  price: null
}

console.log('Покупатель выбрал следующий товар: ', catalog.selectedProduct);
