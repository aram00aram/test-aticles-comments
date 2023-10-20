<?php

namespace App\Http\Rules;

use Illuminate\Contracts\Validation\Rule;

class MaxFileSizeRule implements Rule
{
    private $maxSizeMb;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($maxSizeMb = 8)
    {
        $this->maxSizeMb = $maxSizeMb;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $megabytes = $value->getSize() / 1024 / 1024;

        return $megabytes < $this->maxSizeMb;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('validation.max.file',['max'=>$this->maxSizeMb]);
    }
}
