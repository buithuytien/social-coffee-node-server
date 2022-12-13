
import https from 'https'

const options = {
    hostname: 'api.sampleapis.com',
    port: 443,
    path: '/coffee/hot',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}


export const findPublicCoffeeRecipes = async (req, res) => {
    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            res.json(JSON.parse(data));
        });
    });
    request.on('error', (error) => {
        console.error(error);
    });
    request.end();
}


export const findPublicCoffeeRecipesBySearchTerm = async (req, res) => {
    const searchTerm = req.params.searchTerm;
    const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        const recipes = JSON.parse(data);

        const filteredRecipes = recipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase())) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        });
        res.json(filteredRecipes);
    });

    });
    request.on('error', (error) => {
        console.error(error);
    });
    request.end();
}


export const findPublicCoffeeRecipeById = async (req, res) => {

    const id = req.params.rid;

    console.log('public dao req',req, 'id', id)
    const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;

    }
    );
    response.on('end', () => {
        const recipes = JSON.parse(data);

        console.log(recipes)
        console.log('id= ',id, typeof id)
        console.log('recipes[0].id = ',recipes[0].id, typeof recipes[0].id)

        console.log("furst id",recipes[0].id)
            console.log(recipes[0].id === id)

            const recipe = recipes.find(recipe => String(recipe.id) === id);
            console.log("public dao recipe",recipe)
        res.json(recipe);

    }
    );
});
request.on('error', (error) => {
    console.error(error);
});
request.end();


}


