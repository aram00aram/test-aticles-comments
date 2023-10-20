<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ArticlesController;
use App\Http\Controllers\Admin\ArticleCommentsController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticlesController as WebArticlesController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class,'home'])->name('home');
Route::get('/article/{slug}', [WebArticlesController::class,'show'])->name('article.show');
Route::post('/article/comment/create/{article_id}', [WebArticlesController::class,'store'])->name('article.comment.create');


Route::group(['prefix' => 'admin', 'as'=>'admin.'], function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginController::class, 'login']);

    Route::middleware(['admin', 'auth'])->group(function () {
        Route::get('logout', [LoginController::class,'logout'])->name('logout');

        Route::get('/', [DashboardController::class,'dashboard'])->name('dashboard');
        Route::get('/articles', [ArticlesController::class,'list'])->name('articles.list');

        Route::group(['prefix' => 'article'], function () {
            Route::get('/create', [ArticlesController::class,'create'])->name('article.create');
            Route::post('/store', [ArticlesController::class,'store'])->name('article.store');
            Route::get('{article_id}/edit', [ArticlesController::class,'edit'])->name('article.edit');
            Route::put('/update/{article_id}', [ArticlesController::class,'store'])->name('article.update');
            Route::delete('/delete/{article_id}', [ArticlesController::class,'delete'])->name('article.delete');
        });

        Route::get('/comments', [ArticleCommentsController::class,'list'])->name('articles.comments.list');

        Route::group(['prefix' => 'comment'], function () {
            Route::post('/store', [ArticleCommentsController::class,'store'])->name('article.comment.store');
            Route::get('{comment_id}/edit', [ArticleCommentsController::class,'edit'])->name('article.comment.edit');
            Route::put('/update/{comment_id}', [ArticleCommentsController::class,'store'])->name('article.comment.update');
            Route::delete('/delete/{comment_id}', [ArticleCommentsController::class,'delete'])->name('article.comment.delete');
        });
    });
});
