<?php

namespace App\Services;

use App\Models\ArticleComments;

class ArticleCommentsService
{

    static function updateOrCreate($request, $commentId = null, $articleId = null): ArticleComments
    {
        try {
            return ArticleComments::updateOrCreate(
                ['id' => $commentId], array_filter(array_merge($request->all(), ['article_id'=> + $articleId]) )
            );
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }
    }

    static function delete($commentId): ArticleComments
    {
        try {
            $comment = ArticleComments::find($commentId);
            $comment->delete();
            return  $comment;
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }
    }
}
