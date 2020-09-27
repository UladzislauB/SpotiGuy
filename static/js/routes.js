import GenresPage from "./pages/genresPage.js";
import HomePage from "./pages/homePage.js";
import PlaylistPage from "./pages/playlistPage.js";
import RegisterPage from "./pages/registerPage.js";


const routes = {
    '/': HomePage,
    '/genres': GenresPage,
    '/playlist/:id': PlaylistPage,
    '/register': RegisterPage
}

export default routes;