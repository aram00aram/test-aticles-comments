<?php

namespace App\Http\Controllers;

use App\Http\Requests\Articles\CommentStoreRequest;
use App\Models\Articles;
use App\Services\ArticleCommentsService;
use App\Traits\AlertHandler;

class ArticlesController extends Controller
{
    use AlertHandler;

    private Articles $mdl_articles;
    private ArticleCommentsService $commentsService;

    public function __construct(Articles $articles, ArticleCommentsService $commentsService)
    {
        $this->mdl_articles = $articles;
        $this->commentsService = $commentsService;
    }

    public function show($article_slug){
        $article = $this->mdl_articles->where('slug', $article_slug)->first();
        return view('article', compact('article'));
    }

    public function store(CommentStoreRequest $commentStoreRequest, $articleId = null)
    {

        try {
            $this->commentsService->updateOrCreate($commentStoreRequest, null, $articleId);

            return $this->backWithSuccess(
                'Comment created successfully'
            );
        } catch (\Throwable $e) {
            return $this->backWithError("Error " . $e->getMessage());
        }
    }


}
