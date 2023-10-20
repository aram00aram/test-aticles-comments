@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="card card-solid">
            <div class="card-body pb-0">

                    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column m-auto">
                            <div class="card bg-light d-flex flex-fill">
                            <div class="card-header text-muted border-bottom-0">
                                {{date('d.m.Y H:i:s', strtotime($article->created_at))}}
                            </div>
                            <div class="card-body pt-0">
                                    <div class="col-7">
                                        <h2 class="lead"><b>{{$article->title}}</b></h2>
                                    </div>
                                    <div class="col-12 text-center mt-5 mb-5">
                                        @if(isset($article->photo))
                                            <img src="{{ filter_var($article->photo, FILTER_VALIDATE_URL) ? $article->photo : asset("storage/$article->photo" ) }}"  class="img-circle img-fluid"/>
                                        @endif
                                    </div>

                                <div>
                                    {!! $article->description  !!}
                                </div>
                            </div>

                            <div class="card-footer">
                                <div class="text-right justify-content-between d-flex">
                                    <a href=" {{route('article.show',$article->slug)}}" class="btn btn-sm btn-primary">
                                        <i class="fas fa-user"></i> View
                                    </a>
                                    <a href="#" class="btn btn-sm bg-teal">
                                        {{$article->comments->count()}} <i class="fas fa-comments"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="container bg-form mt-4 pt-2 mb-6">
                            <form class="form-edit-add" role="form"
                                  action="{{route('article.comment.create', $article->id)}}"
                                  method="post" >
                                @csrf
                                @include('partials.comment-form')

                                <button type="submit" class="btn btn-primary pull-right save">
                                    {{ __('generic.save') }}
                                </button>
                            </form>

                                <div class="col">
                                    @foreach($article->comments as $comment)
                                        <div class="form-group mt-3 mb-3">
                                            <label for="title"><b>{{ $comment->title }}</b></label>
                                           <p>
                                               {{ $comment->comment_msg }}
                                           </p>
                                        </div>
                                        <hr>
                                    @endforeach
                                </div>

                        </div>
                    </div>

            </div>



        </div>
    </div>
@endsection
