import * as publicDao from './public-dao.js';

const PublicController = (app) => {
    app.get('/api/public', publicDao.findPublicCoffeeRecipes);
    app.get('/api/public/search/:searchTerm', publicDao.findPublicCoffeeRecipesBySearchTerm);

}
export default PublicController