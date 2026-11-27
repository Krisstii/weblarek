import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { Api } from "./components/base/Api";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { Communication } from "./components/Models/communication";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Basket } from "./components/View/Basket";
import { CardBasket } from "./components/View/CardBasket";
import { CardCatalog } from "./components/View/CardCatalog";
import { CardFull } from "./components/View/CardFull";
import { Contact } from "./components/View/Contact";
import { Gallery } from "./components/View/Gallery";
import { Header } from "./components/View/Header";
import { Modal } from "./components/View/Modal";
import { Payment } from "./components/View/Payment";
import { Success } from "./components/View/Success";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { IBuyer, IOrder, IProductsResponse } from "./types";

const api = new Communication(new Api(API_URL));
const events = new EventEmitter();
const products = new ProductCatalog(events);
const gallery = new Gallery(ensureElement(".gallery"));
const modal = new Modal(ensureElement("#modal-container"), events);
const cart = new Cart(events);
const header = new Header(ensureElement(".header"), events);
const basketShop = new Basket(cloneTemplate("#basket"), events);
const buyer = new Buyer(events);
const orderForm = new Payment(cloneTemplate("#order"), events);
const contactFrom = new Contact(cloneTemplate("#contacts"), events);
const success = new Success(cloneTemplate("#success"), events);
const preview = new CardFull(cloneTemplate("#card-preview"), events);

api
  .getProductList()
  .then((result: IProductsResponse) => {
    console.log("Данные получены");
    products.setProduct(result.items);
  })
  .catch((error) => {
    console.error(error);
  });

events.on("catalog:change", () => {
  const items = products.getProduct().map((item) => {
    const cardCatalog = new CardCatalog(cloneTemplate("#card-catalog"), events);
    return cardCatalog.render(item);
  });
  gallery.render({ catalog: items });
});

events.on("card:click", (event: { id: string }) => {
  const product = products.getProductById(event.id);
  if (product) {
    products.setSelectProduct(product);
  }
});

events.on("card:open", () => {
  const product = products.getSelectedProduct();

  if (!product) {
    return;
  }

  let textButton = "";
  if (product.price === null) {
    textButton = "Недоступно";
  } else {
    textButton = cart.hasProductInCart(product.id)
      ? "Удалить из корзины"
      : "Купить";
  }
  preview.button = textButton;

  modal.openModal();
  modal.render({ content: preview.render(product) });
});

events.on("buy:products", () => {
  const product = products.getSelectedProduct();

  if (!product) {
    return;
  }

  if (cart.hasProductInCart(product.id)) {
    cart.removeProduct(product);
  } else {
    cart.addProduct(product);
  }

  modal.closeModal();
});

events.on("basket:open", () => {
  header.counter = cart.getCountProduct();
  const basketShopItems = cart.getItems().map((item, index) => {
    const productBasket = new CardBasket(cloneTemplate("#card-basket"), events);

    productBasket.index = index + 1;
    productBasket.title = item.title;
    productBasket.price = item.price;

    return productBasket.render(item);
  });

  basketShop.basket = basketShopItems;
  basketShop.total = cart.getTotalPrice();

  modal.openModal();
  modal.render({ content: basketShop.render() });
});

events.on("basket:remove", (event: { id: string }) => {
  const product = products.getProductById(event.id);

  if (!product) {
    return;
  }

  cart.removeProduct(product);
});

events.on("basket:change", () => {
  header.counter = cart.getCountProduct();
  const basketShopItems = cart.getItems().map((item, index) => {
    const productBasket = new CardBasket(cloneTemplate("#card-basket"), events);

    productBasket.index = index + 1;
    productBasket.title = item.title;
    productBasket.price = item.price;

    return productBasket.render(item);
  });

  basketShop.basket = basketShopItems;
  basketShop.total = cart.getTotalPrice();
});

events.on("basket:success", () => {
  orderForm.error = "";

  modal.render({ content: orderForm.render() });
});

events.on("form:change", (event: { field: keyof IBuyer; value: string }) => {
  buyer.saveBuyerData({ [event.field]: event.value });
});

events.on("buyer:change", () => {
  const errors = buyer.isValidData();

  const data = buyer.getBuyerData();
  if (data) {
    orderForm.payment = data.payment;
    orderForm.address = data.address || "";
    contactFrom.email = data.email || "";
    contactFrom.phone = data.phone || "";
  }

  const orderErrors = [];
  if (errors.payment) orderErrors.push(errors.payment);
  if (errors.address) orderErrors.push(errors.address);
  orderForm.error = orderErrors.join(", ");
  orderForm.buttonStatus = orderErrors.length > 0;

  const contactErrors = [];
  if (errors.email) contactErrors.push(errors.email);
  if (errors.phone) contactErrors.push(errors.phone);
  contactFrom.error = contactErrors.join(", ");
  contactFrom.buttonStatus = contactErrors.length > 0;
});

events.on("order:submit", () => {
  contactFrom.error = "";
  modal.render({ content: contactFrom.render() });
});

events.on("contacts:submit", () => {
  const buyerData = buyer.getBuyerData();
  const details: IOrder = {
    ...buyerData,
    total: cart.getTotalPrice(),
    items: cart.getItems().map((item) => item.id),
  };

  api
    .postProduct(details)
    .then(() => {
      cart.clearCart();
      success.total = details.total;
    })
    .catch((error) => console.log("Error", error));

  modal.render({ content: success.render() });
});

events.on("success:close", () => {
  modal.closeModal();
});
