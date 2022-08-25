// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from "App/Models/Article";
import CreateArticleValidator from "App/Validators/CreateArticleValidator";
import UpdateArticleValidator from "App/Validators/UpdateArticleValidator";


export default class ArticlesController {

    public async index({ view }) {
        //Fetch data from Database
        const articles = await Article.all();

        const state = {
            articles,
        }
        return view.render('article/view', state);
    }

    public async create({ view }) {
        return view.render('article/create');
    }

    public async store({ request, response }) {
        const payload = await request.validate(CreateArticleValidator)
        await Article.create(payload);
        return response.redirect().back();

    }

    public async show({ view, params }) {
        const article = await Article.findBy('id', params.id);
        const state = {
            article,
        }
        return view.render('article/show', state)
    }

    public async edit({ view, params }) {
        const article = await Article.findBy('id', params.id);
        const state = {
            article,
        }
        return view.render('article/edit', state)
    }

    public async update({ request, response, params }) {
        const payload = await request.validate(UpdateArticleValidator);
        await Article.query()
            .where('id', params.id)
            .update(payload);
        return response.redirect().back();
    }

    public async destroy({ params, response }) {
        const article = await Article.findBy('id', params.id);
        if (article) {
            article.delete();
            return response.redirect().back();
        }

    }
}
