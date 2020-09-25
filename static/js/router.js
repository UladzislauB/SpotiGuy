import routes from "./routes.js";

import Error404Page from "./pages/error404.js";

import Utils from "./services/utils.js";

export const router = async () => {
    const main = document.querySelector('main');

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(parsedURL);
    let page = routes[parsedURL] ? routes[parsedURL] : Error404Page;
    main.innerHTML = await page.render();
    await page.after_render();
}