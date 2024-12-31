import Man from "../view/Man.vue";
import Home from "../view/Home.vue";
import Login from "../view/Login.vue";
import Register from "../view/Register.vue";
import Women from "../view/Women.vue";
import ClassicPage from "../view/ClassicPage.vue";
import FuturePage from "../view/FuturePage.vue";
import ManPage from "../view/ManPage.vue";
import WomenPage from "../view/WomenPage.vue";
import favoritePage from "../view/favoritePage.vue";
import chartPage from "../view/chartPage.vue";
import OrderPage from "../view/OrderPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // Komponen utama
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/man",
    name: "Man",
    component: Man,
  },
  {
    path: "/women",
    name: "Women",
    component: Women,
  },
  {
    path: "/chart",
    name: "/chartPage",
    component: chartPage,
  },
  {
    path: "/favorite",
    name: "FavoritePage",
    component: favoritePage,
  },
  {
    path: "/order",
    name: "OrderPage",
    component: OrderPage,
  },
  {
    path: "/classic/:id",
    name: "ClassicDetail", // Sesuaikan dengan nama route yang digunakan
    component: ClassicPage,
    props: true,
  },
  {
    path: "/future/:id",
    name: "FutureDetail",
    component: FuturePage,
    props: true,
  },

  { path: "/product/:id", name: "manPage", component: ManPage, props: true },
  {
    path: "/product-women/:id", // Menangkap id produk dari URL
    name: "womenPage",
    component: WomenPage,
    props: true, // Mengirimkan id sebagai props
  },
];

export default routes;
