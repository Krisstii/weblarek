import "./scss/styles.scss";
import { ProductCatalog } from "./components/base/Models/ProductCatalog";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { Communication } from "./components/Models/communication";
import { Api } from "./components/base/Api";
import { IProductsResponse } from "./types/index";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

console.log("тестирование ProductCatalog");

const productsModel = new ProductCatalog();

productsModel.setProduct(apiProducts.items);
console.log("всего товаров:", productsModel.getProduct().length);
console.log("массив товаров из каталога: ", productsModel.getProduct());

const firstProductId = apiProducts.items[0].id;
const foundProduct = productsModel.getProductById(firstProductId);
console.log(`Поиск товара по id ${firstProductId}:`, foundProduct);

productsModel.setSelectProduct(foundProduct || null);
console.log(
  "Выбранный товар для подробного просмотра:",
  productsModel.getSelectedProduct(),
);

console.log("тестирование Cart");

const CartModel = new Cart();
const item1 = productsModel.getProduct()[0];
const item2 = productsModel.getProduct()[1];

CartModel.addProduct(item1);
CartModel.addProduct(item2);

console.log("общая стоимость корзины:", CartModel.getTotalPrice());

console.log("тестирование Buyer");

const buyerModel = new Buyer();

buyerModel.saveBuyerData({ email: "tfghd@gmail.com" });
console.log("сохранён только имейл");
console.log("что сохранено:", buyerModel.getBuyerData());

console.log("Метод isValidDat:", buyerModel.isValidData());

buyerModel.saveBuyerData({ payment: "card" });
console.log("способ оплаты добавлен");
console.log("Метод isValidDat:", buyerModel.isValidData());

const api = new Api(API_URL);

const larekApi = new Communication(api);

larekApi
  .getProductList()
  .then((result: IProductsResponse) => {
    console.log("Всего товаров:", result.total);

    productsModel.setProduct(result.items);

    console.log("Товары сохранены:", productsModel.getProduct());
  })
  .catch((error) => {
    console.error("Ошибка при загрузке товаров:", error);
  });

const cart = new Cart();
console.log("\nколичество:", cart.getCountProduct());

const buyer = new Buyer();
console.log("Валидация:", buyer.isValidData());
