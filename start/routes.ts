

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome');
Route.resource("articles", "ArticlesController");

/** 
 * You can change namde and the params as default is id
 * 
 * Route.resource("articles", "ArticlesController").paramFor("articles","employeeNo").as("employees")
 * 
 * */ 





