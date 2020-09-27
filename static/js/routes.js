import GenresPage from "./pages/genresPage.js";
import HomePage from "./pages/homePage.js";
import PlaylistPage from "./pages/playlistPage.js";
import RegisterPage from "./pages/registerPage.js";
import LoginPage from "./pages/loginPage.js";


const routes = {
    '/': HomePage,
    '/genres': GenresPage,
    '/playlist/:id': PlaylistPage,
    '/register': RegisterPage,
    '/login': LoginPage
}

export default routes;