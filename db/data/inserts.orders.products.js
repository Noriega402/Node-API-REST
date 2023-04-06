const ordersProducts = require('./orders_products.json');
const products = require('./products.json');

const insertOrdersProducts = () =>{
    const orderDetail = [];
    for(let order of ordersProducts){
        const id = order.id;
        const quantity = order.quantity;
        const product_id = order.product_id;
        const order_id = order.order_id;
        const created_at = order.created_at;
        let addItem = {};
        const isProduct = products.find(item => item.id === order.product_id);
        if(isProduct){
            const subtotal = order.quantity * isProduct.price;
            addItem = {
                id,
                quantity,
                product_id,
                order_id,
                subtotal,
                created_at
            }
            // console.log(addItem);
            orderDetail.push(addItem);
        }else{
            throw new Error('no exite el producto en la DB');
        }
    }
    // console.log(orderDetail);
    return orderDetail;
}

// insertOrdersProducts();
module.exports = insertOrdersProducts;