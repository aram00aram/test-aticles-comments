<?php

namespace App\Services;

use App\Models\Articles;
use Illuminate\Support\Facades\File;

class ArticleService
{
    const PHOTO_DEFAULT = 'articles/default.png';

    static function updateOrCreate($request, $articleId = null): Articles
    {
        try {
            $photo['photo'] = self::PHOTO_DEFAULT;

            if ($request->hasFile('photo')) {
                $photo = self::updateFile($request, $articleId);
            }
            return Articles::updateOrCreate(
                ['id' => $articleId], array_filter(array_merge($request->all(), $photo))
            );
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }
    }

    static function updateFile($request, $article_id = null)
    {
        if ($article_id) {
            $articleFile = Articles::find($article_id);
            if (File::exists(public_path("storage/$articleFile->photo"))) {
                File::delete(public_path("storage/$articleFile->photo"));
            }
        }

        $filename = FileService::oneUpload($request);
        $photoPath = ['photo' => 'articles/' . $filename];

        return $photoPath;
    }

    static function delete($article_id): Articles
    {
        try {
            $article = Articles::find($article_id);
            FileService::deleteFile($article->photo);
            $article->delete();
            return  $article;
        } catch (\Throwable $e) {
            dd($e->getMessage());
        }


    }
}
