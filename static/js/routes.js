import GenresPage from "./pages/genresPage.js";
import HomePage from "./pages/homePage.js";
import PlaylistPage from "./pages/playlistPage.js";


const routes = {
    '/': HomePage,
    '/genres': GenresPage,
    '/playlist/:id': PlaylistPage
}

export default routes;