const orders = require('./orders.json');

const insertOrders = () => {
    const orderDetail = [];
    for (let order of orders) {
        const id = order.id;
        const customer_id = order.customer_id;
        if(typeof order.created_at === "string"){
            const dateTransform = new Date(order.created_at);
            var created_at = dateTransform.toISOString();
        }
        const addItem = {
            id,
            customer_id,
            created_at
        }
        // console.log(addItem);
        orderDetail.push(addItem);
    }
    // console.log(orderDetail);
    return orderDetail;
}
// insertOrders();
module.exports = insertOrders;