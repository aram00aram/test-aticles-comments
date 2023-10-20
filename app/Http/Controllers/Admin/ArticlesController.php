<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\StoreRequest;
use App\Models\Articles;
use App\Services\ArticleService;
use App\Traits\AlertHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticlesController extends Controller
{
    use AlertHandler;

    private Articles $mdl_articles;
    private ArticleService $articleService;

    public function __construct(Articles $articles, ArticleService $articleService)
    {
        $this->mdl_articles = $articles;
        $this->articleService = $articleService;
    }

    public function list()
    {
        $articles = $this->mdl_articles->orderBy('created_at','DESC')->paginate(10);
        return view('admin.articles.list', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        return view('admin.articles.create');
    }


    public function store(StoreRequest $storeRequest, $articleId = null)
    {
        try {
            $this->articleService->updateOrCreate($storeRequest, $articleId);

            return $this->redirectWithSuccess(
                route('admin.articles.list',),
                'Article created successfully'
            );
        } catch (\Throwable $e) {
            return $this->backWithError("Error " . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $article_id
     */
    public function edit($article_id){

        $article = $this->mdl_articles->find($article_id);
        if(!$article){
            throw new ModelNotFoundException();
        }

        return view('admin.articles.edit',  compact('article'));
    }

    /**
     *
     * @param int $article_id
     */
    public function delete(int $article_id)
    {
        try {
            $this->articleService->delete($article_id);

            return $this->redirectWithSuccess(
                route('admin.articles.list',),
                'Article deleted successfully'
            );
        } catch (\Throwable $e) {
            return $this->backWithError("Error " . $e->getMessage());
        }
    }
}
