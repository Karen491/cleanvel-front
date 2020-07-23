![Image](https://res.cloudinary.com/karen491/image/upload/c_scale,h_80,w_300/v1594786117/cleanvel/App%20pictures/cleanvel-logo_vep7s6.png)

Cleanvel App   
=========	

Frontend Repository: React
---------

About the app
---------

Cleanvel is a company based in Puebla, Mexico dedicated to selling cleaning products and supplies. There are currently two branches in Puebla and they manage an avarege of 500 products. 

Cleanvel App is an inventory manager, it's goal is to provide the necessary tools to keep track of products' ins and outs and to keep track of inventory value to keep inventory KPI's (key performance indicator) as healthy as possible.


App Features
---------

__Graphs__

There are three graphs incuded in the app:
- Bar graph: this graph shows the 10 products with the highest inventory values
- Pie graph: this graph shows the 4 categories with the highest inventory value
- Doughnut chart: represents inventory value per store 


__Inventory__

The following tools are included in this route:
- table with shortage products
- detail per product
- registering a purchase (adding to stock). If the purchase price changes, the app will calculate the average from the old and new price and set that new value as the new purchase price.
- product transfer

For each product movement, our app will recalculate inventory values (for stores and categories) if needed. 

__Products__

In this section we can view all current products and also filter them per category. 

Tool included: (only for Admin users)
- adding a new product
- deleting a product
- editing a product 

__Sales__

We can register a sale from an specified store to be able to subtract the number of items sold and recalculate inventory values. 

Features:
- accesing inventory per store
- saving a purchase

At this stage, we can't see a sales report since the app is focused on inventory only. Future stages will focus on sales. 

__Stores__

Stores' section gives us general information about current stores. 

The only tool available here is the option to _edit_ the information. Stores can't be added or deleted since they are directly connected with product's availability and values. Changes in stores will require a major update in our code.


__Users__

This section is only available for Admin users. In this section we can:
- update user's role
- register a new user
- edit user's information
- delete a user

__Libraries used__

- Chart.js
- React Hook Form

Deployment
---------

Current deployment via Heroku: [Cleanvel Puebla](https://cleanvel.herokuapp.com/)

Author
---------

Ana Karen Pérez Flores

[GitHub Profile](https://github.com/Karen491)

![Image](https://res.cloudinary.com/karen491/image/upload/v1595542790/ironhack_pm4ef8.png)
