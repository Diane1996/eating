var NewApiRootUrl = 'http://127.0.0.1:8360/api';

module.export = {
	cartAdd: NewApiRootUrl + 'cart/add',
	cartUpdate: NewApiRootUrl + 'cart/update',
	cartDelete: NewApiRootUrl + 'cart/delete',
	cartList: NewApiRootUrl + 'cart/getCart',

	login: NewApiRootUrl + 'login/login',

	orderCreate: NewApiRootUrl + 'order/create',
	orderPayment: NewApiRootUrl + 'order/payment',
	orderCancel: NewApiRootUrl + 'order/cancel',

}