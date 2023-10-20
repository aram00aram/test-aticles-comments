
@extends('admin.layouts.app')

@section('content')
    <div class="container bg-form mt-4 pt-2 mb-6">
        <form class="form-edit-add" role="form"
              action="{{route('admin.article.store')}}"
              method="POST" enctype="multipart/form-data" autocomplete="off">
            @csrf

            @include('admin.articles.partials.form')

            <button type="submit" class="btn btn-primary pull-right save">
                {{ __('generic.save') }}
            </button>
        </form>
    </div>
@endsection
