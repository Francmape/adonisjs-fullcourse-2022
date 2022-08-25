

import Route from '@ioc:Adonis/Core/Route'
/*
These routes use the system middleware auth that wa registered in Kernel.ts as per the documentatuion
*/
Route.on('/').render('welcome');

/*Group middleware all routes won't be access unless logged in*/
// Route.group(() => {
//     Route.resource("articles", "ArticlesController");
// }).middleware('auth')

// Chousing only several routes
Route.resource("articles", "ArticlesController").middleware({
    create: ['auth'],
    edit: ['auth'],
    store: ['auth'],
    destroy: ['auth']
});

/** 
 * You can change namde and the params as default is "id"
 * Route.resource("articles", "ArticlesController").paramFor("articles","employeeNo").as("employees")
 * */


Route.on('/login').render('auth.login').as("auth.login")

Route.post('/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')

    await auth.use('web').attempt(email, password)
    return response.redirect('/');
})

Route.get('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/login')
}).as("auth.logout")




