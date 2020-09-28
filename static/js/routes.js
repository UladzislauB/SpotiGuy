import GenresPage from "./pages/genresPage.js";
import HomePage from "./pages/homePage.js";
import PlaylistPage from "./pages/playlistPage.js";
import RegisterPage from "./pages/registerPage.js";
import LoginPage from "./pages/loginPage.js";
import LogoutPage from "./pages/logoutPage.js";


const routes = {
    '/': HomePage,
    '/genres': GenresPage,
    '/playlist/:id': PlaylistPage,
    '/register': RegisterPage,
    '/login': LoginPage,
    '/logout': LogoutPage
}

export default routes;