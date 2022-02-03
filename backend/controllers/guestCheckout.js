import cartUtils from '../utils/cartUtils.js';

export default async function guestCheckout(req, res) {
  const { localCart } = req.body;

  try {
    await cartUtils.processArrayCartOrders(localCart);
  } catch (error) {
    console.log(error);
    return res.json('Something went wrong when processing your orders');
  }

  res.json('Orders Submitted');
}
