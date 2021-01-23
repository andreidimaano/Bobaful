<h1 align="center">GraphQL Relations</h1>

<p>When we create a product, arguments such as name, price, description, ounces, fan favorite, and chef favorite are passed in, which all combine to become one product that we can reference later.</p>
<p>
  <img src="/backend/images/createProduct.png">
</p>

<hr>

<p>When we create an item, we reference a product with its ObjectID, creating a relation between items and products. Items specify a quantity of products, which we will use later to create orders.</p>
<p align="center">
  <img src="/backend/images/createItem.png">
</p>

<hr>

<p>To create a user, a name, email, phone, and password will be required. Using argon2, passwords will be hashed and and an empty orders array will be initialized, which will be allocated once users make their orders.</p>
<p align="center">
  <img src="/backend/images/createUser.png">
</p>

<hr>

<p>When creating an order, references to items, total price, and a user that created the order will be passed in. Orders are able to reference the items and the user who made the order, all of which will be used when carrying out orders. 
<p align="center">
  <img src="/backend/images/createOrder.png">
</p>
