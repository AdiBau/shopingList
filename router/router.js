const express = require('express')
const router = express.Router();

const  {
  login,
  loginPOST,
  shopingCardList,
  register,
  logout,
  shopingUserKonto,
  userKontoListAdd,
  userKontoListDelete,
  shoping,
  userKontoListEntry,
  getList,
  addToList,
  deleteItem
} = require('../controllers/list')

const { authorization } = require('../authorization/authorization');


router.route('/').get(login).post(loginPOST);
router.route('/register').post(register);
router.route('/logout').get(logout);
router.route('/shopingCard/userKonto').get(authorization,shopingUserKonto).post(authorization, userKontoListAdd).delete(authorization, userKontoListDelete);
router.route('/ShopingCardList/shoping').post(authorization, userKontoListEntry).get(authorization, shoping);
router.route('/ShopingCardList/getList').get(authorization, getList).post(authorization, addToList)
router.route('/ShopingCardList/getList/:id').delete(authorization, deleteItem)
router.route('/ShopingCardList').get(authorization, shopingCardList)


module.exports = router