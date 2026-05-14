import { IValidation } from "../types";

/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

/* Константа с набором правил валидации полей формы заказа и сбора данных пользователя */
export const ValidationRules: IValidation = {
  payment: (value) => value ? null : 'Не выбран тип оплаты',
  email: (value) => {
    if (!value) return 'Укажите e-mail';
    const regExp = /^\w+@\w+\.[a-zA-Z]{2,}$/;
    if (!regExp.test(value)) return 'Введите корректный e-mail';
    return null;
  },
  phone: value => {
    if (!value) return 'Укажите номер телефона';
    const regExp = /^\+7\d{10}$/;
    if (!regExp.test(value)) return 'Введите корректный номер телефона';
    return null;
  },
  address: (value) => value ? null : 'Укажите адрес доставки',
}
