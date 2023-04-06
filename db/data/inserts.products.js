const faker = require('faker');
const products = require('./products.json');

const insertProducts = () => {
    const items = [];

    for(const item of products){
        const name = item.name;
        const price = item.price;
        let description;
        if(item.description.length >= 255){
            description = item.description.slice(0,254);
            // console.log(`mas de 255: ${item.description}\n`);
            // console.log(`Nuevo: ${item.description.slice(0,250)}`);
        }else{
            description = item.description;
            // console.log(`menos de 255: ${item.description}\n`);
        }
        const image = item.image;
        const created_at = faker.date.between('2019-01-03', new Date());
        const category_id = item.category_id;

        const product = {
            name,
            price,
            description,
            image,
            created_at,
            category_id
        };
        items.push(product);
    }
    // console.log(items);
    return items;
}

// insertProducts();
module.exports = insertProducts;