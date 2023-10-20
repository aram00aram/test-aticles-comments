<?php

namespace App\Http\Requests\Articles;

use App\Http\Rules\MaxFileSizeRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:50',
            'short_desc' => 'required|string|max:50',
            'description' => 'required|string',
            'photo' => ['nullable','image','mimes:jpg,jpeg,png','mimetypes:image/jpeg,image/png', new MaxFileSizeRule(1)],
            'slug' => 'required',
        ];
    }
}
