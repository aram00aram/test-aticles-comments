<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Articles extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'short_desc',
        'description',
        'photo',
        'slug',
        'crated_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(ArticleComments::class, 'article_id')->orderBy('updated_at', 'DESC');
    }
}
