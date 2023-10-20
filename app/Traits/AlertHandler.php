<?php

namespace App\Traits;

trait AlertHandler
{
    private function backWithSuccess(string $message): \Illuminate\Http\RedirectResponse
    {
        return back()->with('success',$message);
    }

    private function backWithError(string $message): \Illuminate\Http\RedirectResponse
    {
        return back()->with('error', $message);
    }

    private function redirectWithSuccess(string $url, string $message): \Illuminate\Http\RedirectResponse
    {
        return redirect($url)->with('success', $message);
    }
}
