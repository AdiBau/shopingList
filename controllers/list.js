const userList = require('../db/models/userList')
const userKList = require('../db/models/userKontoList')
const shopingList = require('../db/models/shopingList')
const path = require('path');
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../authorization/secret');


// logout

const logout = async (req, res) => {
  console.log('logout');

  res.clearCookie('auth');
  res.clearCookie('user_ID');
  res.clearCookie('user_list_id');

  res.redirect('/');
  res.end()
}

// login

const login = async (req, res) => {
  res.sendFile('login.html', {
    root: path.join(__dirname, '..', 'public', 'login')
  })
}

// login POST

const loginPOST = async (req, res) => {
  let { pin, userName } = req.body;
  userName = userName.toUpperCase()

  const userFind = await userList.findOne({ userName: userName, userPIN: pin });
  if (!userFind) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Błędny login lub PIN", status: StatusCodes.UNAUTHORIZED, token: "" })
  }
  else {
    let user = {
      userPIN: pin,
      userName: userName,
    }
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
    res.cookie('auth', `Bearer ${token}`, { maxAge: 5 * 24 * 60 * 60 * 1000, secure: true });
    return res.status(StatusCodes.OK).json({ msg: "/ShopingcardList", status: StatusCodes.OK, token: token })
  }
}

// Register

const register = async (req, res) => {
  let { pin, userName } = req.body;
  userName = userName.toUpperCase()

  const checkUser = await userList.findOne({
    userName: userName,
    userPIN: Number(pin)
  })

  if (checkUser) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
      msg: `Nazwa: ${userName} i PIN: ${pin} już istnieją. Wprowadź inne`,
      status: StatusCodes.NOT_ACCEPTABLE
    })
  }

  try {
    const NewUser = await userList.create({
      userName: userName,
      userPIN: Number(pin),
    })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: error,
      status: StatusCodes.BAD_REQUEST
    })
  }

  return res.status(StatusCodes.OK).json({
    msg: 'User created',
    status: StatusCodes.OK
  })
}

// ShopingCardList

const shopingCardList = async (req, res) => {

  res.sendFile('index.html', {
    root: path.join(__dirname, '..', 'public', 'ShopingCardList')
  })

}

// shopingUserConto

const shopingUserKonto = async (req, res) => {
  console.log('userConto');

  let authCookie = req.cookies.auth;
  authCookie = authCookie.split(' ')[1];
  try {
    const werify = await jwt.verify(authCookie, JWT_SECRET)
    const userID = await userList.findOne({userName: werify.userName, userPIN: werify.userPIN})
    let user = await userKList.find({ userID: (userID._id).toString() })
    let obj = []
       await user.map(element => {
      obj.push({
        "NazwaListyID": element._id.toString(),
        "userID": element.userID,
        "userKontoListName": element.userKontoListName,
      })
    })
    return res.status(StatusCodes.OK).json({ user: obj, userName: werify.userName, status: StatusCodes.OK })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: error, status: StatusCodes.BAD_REQUEST })
  }
}


// ------------------------------------

const userKontoListAdd = async (req, res) => {
  console.log('');
  
  let authCookie = req.cookies.auth;
  authCookie = authCookie.split(' ')[1];

  const nowaLista = req.body;
  const werify = await jwt.verify(authCookie, JWT_SECRET)
  if (werify) {
    try {
      const userID = await userList.findOne({ 'userName': werify.userName, userPIN: werify.userPIN })
      const user = await userKList.create({ userID: (userID._id).toString(), userKontoListName: nowaLista.nazwaListy })

      return res.status(StatusCodes.OK).json({ user, status: StatusCodes.OK })
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ user: error, status: StatusCodes.NOT_FOUND })
    }
  }
}

// ----------------------------------

const userKontoListDelete = async (req, res) => {
console.log('deletelist');

  const { user_list_id, user_ID, user_list_name } = req.body
  try {
    await userKList.findOneAndDelete({
      _id: user_list_id,
      userID: user_ID,
      userKontoListName: user_list_name
    })
    res.status(StatusCodes.OK).json({ link: "/ShopingCardList" })
  } catch (error) {
    return res.redirect('/');
  }

}

// ------------------------------

const shoping = async (req, res) => {
  console.log('shoping');
  
  res.sendFile('index.html', {
    root: path.join(__dirname, '..' , 'public','AddToList')
  })
}
const userKontoListEntry = async (req, res) => {
  const { user_list_id, user_ID, user_list_name } = req.body
  res.cookie('user_ID', `${user_ID}`, { httpOnly: true });
  res.cookie('user_list_id', `${user_list_id}`, { httpOnly: 
true })

  res.status(StatusCodes.OK).json({ link: "/ShopingCardList/shoping" })

}
// -------------------------------------------------------
const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const lista = await shopingList.findOneAndRemove({ _id: id })
    res.json(lista)
  } catch (error) {
  }

}


// -------------------------------------------------------

const getList = async (req, res) => {

  const user_ID = req.cookies.user_ID;
  const user_list_id = req.cookies.user_list_id

  let token = req.cookies.auth;

  token = token.split(' ')[1];
  const werify = await jwt.verify(token, JWT_SECRET)

  try {
    const lista = await shopingList.find({
      userListNameID: user_list_id,
      userID: user_ID,
    }).sort({ "Name": 1 })
    const nazwaListy = await userKList.findById(user_list_id)
    res.status(200).json({
      lista,
      nazwaListy,
      userName: werify.userName,
    })
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: error })
  }
}

// -------------------------------------------------------


const addToList = async (req, res) => {
  let token = req.cookies.auth
  const user_ID = req.cookies.user_ID;
  const user_list_id = req.cookies.user_list_id
  const { zakup } = req.body;
  try {
    token = token.split(' ')[1]
    const werify = await jwt.verify(token, JWT_SECRET)

    if (zakup != "") {
      const lista = await shopingList.create({
        Name: zakup,
        Ilosc: 1,
        userListNameID: user_list_id,
        userID: user_ID,
      })
      return res.json({ lista })
    }
    else return res.status(StatusCodes.CONFLICT).json({
      msg: "Błędny login", status:
        StatusCodes.CONFLICT
    })
  } catch (err) {
  }
}


// ------------------------------------


const deleteKonto = async (req, res) => {
  const { user_ID_list, list_name, userID } = req.body;

  const user = await shopingList.deleteMany({ userListNameID: user_ID_list })
  const lista = await userKList.deleteOne({ userKontoListName: list_name, userID: userID })
  res.status(StatusCodes.OK).json({ link: '/ShopingList/shopingListAll' })

}

module.exports = {
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
}