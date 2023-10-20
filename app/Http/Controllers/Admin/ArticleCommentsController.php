<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Articles\CommentStoreRequest;
use App\Models\ArticleComments;
use App\Models\Articles;
use App\Services\ArticleCommentsService;
use App\Traits\AlertHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleCommentsController extends Controller
{
    use AlertHandler;

    private ArticleComments $mdl_comments;
    private ArticleCommentsService $commentsService;

    public function __construct(ArticleComments $articleComments, ArticleCommentsService $commentsService)
    {
        $this->mdl_comments = $articleComments;
        $this->commentsService = $commentsService;
    }

    public function list()
    {
        $comments = $this->mdl_comments->orderBy('created_at','DESC')->paginate(10);
        return view('admin.articles_comments.list', compact('comments'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $comment_id
     */
    public function edit($comment_id){

        $comment = $this->mdl_comments->find($comment_id);
        if(!$comment){
            throw new ModelNotFoundException();
        }

        return view('admin.articles_comments.edit',  compact('comment'));
    }


    public function store(CommentStoreRequest $commentStoreRequest, $comment_id = null)
    {
        try {
            $this->commentsService->updateOrCreate($commentStoreRequest, $comment_id);

            return $this->redirectWithSuccess(
                route('admin.articles.comments.list',),
                'Article created successfully'
            );
        } catch (\Throwable $e) {
            return $this->backWithError("Error " . $e->getMessage());
        }
    }

    /**
     *
     * @param int $comment_id
     */
    public function delete(int $comment_id)
    {
        try {
            $this->commentsService->delete($comment_id);

            return $this->redirectWithSuccess(
                route('admin.articles.comments.list',),
                'Article deleted successfully'
            );
        } catch (\Throwable $e) {
            return $this->backWithError("Error " . $e->getMessage());
        }
    }
}
