<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Services\ArticleService;

class HomeController extends Controller
{
    private Articles $mdl_articles;

    public function __construct(Articles $articles)
    {
        $this->mdl_articles = $articles;
    }

    public function home(){
        $articles = $this->mdl_articles->orderBy('created_at','DESC')->paginate(10);
        return view('home', compact('articles'));
    }
}
