var NewApiRootUrl = 'http://127.0.0.1:8360/admin';

module.export = {
  adminAdd: NewApiRootUrl + 'admin/add',
  adminUpdate: NewApiRootUrl + 'admin/update',
  adminDelete: NewApiRootUrl + 'admin/delete',
  adminList: NewApiRootUrl + 'admin/select',

  categoryAdd: NewApiRootUrl + 'category/add',
  categoryUpdate: NewApiRootUrl + 'category/update',
  categoryDelete: NewApiRootUrl + 'category/delete',
  categoryList: NewApiRootUrl + 'category/select',

  foodAdd: NewApiRootUrl + 'food/add',
  foodUpdate: NewApiRootUrl + 'food/update',
  foodDelete: NewApiRootUrl + 'food/delete',

  login: NewApiRootUrl + 'login/login',

  orderAction: NewApiRootUrl + 'order/order',

  restaurantAdd: NewApiRootUrl + 'restaurant/add',
  restaurantUpdate: NewApiRootUrl + 'restaurant/update',
  restaurantDelete: NewApiRootUrl + 'restaurant/delete'

};
