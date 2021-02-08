<h1 align="center">GraphQL Functionality</h1>

<h2>PRODUCT</h2>

<h3>createProduct</h3>
<p>When we create a product, the arguments such as name, description, fan favorite, and chef favorite are passed in, which all combine to become one product that we can reference later via the product's ID.</p>
<p align="center">
  <img src="/backend/images/createProduct.png">
</p>

<h3>updateProduct</h3>
<p>To update a product, we must first pass in a product name or product id. Then we pass one or more fields that we wish to change along with their updated value. If the operation succeeds, the mutation returns true.</p>
<p align="center">
  <img src="/backend/images/updateProduct.png">
</p>
<p align="center">
  <img src="/backend/images/updateProduct2.png">
</p>

<h3>deleteProduct</h3>
<p>Pass in the productId.</p>

<h3>deleteAllProducts</h3>
<p>No arguments needed. Proceed with caution.</p>

<hr>

<h2>ITEM</h2>

<h3>createItem</h3>
<p>When we create an item, we reference a product with its ObjectID, creating a relation between items and products. Items specify a quantity of products, which we will use later to create orders. Items also store price and ounces.</p>
<p align="center">
  <img src="/backend/images/createItem.png">
</p>

<h3>deleteItem</h3>
<p>Pass in the itemId.</p>

<h3>deleteAllItems</h3>
<p>No arguments needed. Proceed with caution.</p>

<hr>

<h2>USER</h2>

<h3>createUser</h3>
<p>To create a user, a name, email, phone, and password will be required. Using argon2, passwords will be hashed and and an empty orders array will be initialized, which will be allocated once users make their orders.</p>
<p align="center">
  <img src="/backend/images/createUser.png">
</p>

<h3>login</h3>
<p>When a user logs in, a cookie will be created using Express Session, which allows users to stay logged in and certifies that a user has been authenticated.</p>
<p align="center">
  <img src="/backend/images/login.png">
</p>

<h3>logout</h3>
<p>If a user decides to log out, the logout mutation will remove the cookie that acknowledged that the user was logged in. The mutation will then return true to signal that the user has officially been logged out.</p>
<p align="center">
  <img src="/backend/images/logout.png">
</p>

<h3>me query</h3>
<p>If a user is logged in, the me query will use the cookie that was created during their authentication to keep them logged in.</p>
<p align="center">
  <img src="/backend/images/me1.png">
</p>
<p>If a user is logged out, however, the me query will simply return null, signifying that the user currently has no cookie that can log them in.</p>
<p align="center">
  <img src="/backend/images/me2.png">
</p>

<hr>

<h2>ORDER</h2>

<h3>createOrder</h3>
<p>When creating an order, references to items, total price, and a user that created the order will be passed in. Orders are able to reference the items and the user who made the order, all of which will be used when carrying out orders. 
<p align="center">
  <img src="/backend/images/createOrder.png">
</p>
