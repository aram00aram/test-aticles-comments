<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ArticleComments extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'comment_msg',
        'article_id',
        'crated_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function article(): HasOne
    {
        return $this->hasOne(Articles::class, 'id', 'article_id');
    }
}
