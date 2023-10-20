<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\File;

class FileService
{

    static function oneUpload($request, $filename = 'articles/default.png')
    {
        try {
            $filename = time() . '.' . $request->photo->extension();

            $request->photo->move(storage_path('app/public/articles'), $filename);
        } catch (\Exception $exception) {

        }

        return $filename;
    }

    static function deleteFile($filePath)
    {
        if ($filePath) {
            if (File::exists(public_path("storage/$filePath"))) {
                File::delete(public_path("storage/$filePath"));
            }
        }
    }

}
