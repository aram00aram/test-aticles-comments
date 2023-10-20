@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="card card-solid">
            <div class="card-body pb-0">
                <div class="row">
                    @foreach($articles as $article)
                        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                        <div class="card bg-light d-flex flex-fill">
                            <div class="card-header text-muted border-bottom-0">
                                {{date('d.m.Y H:i:s', strtotime($article->created_at))}}
                            </div>
                            <div class="card-body pt-0">
                                <div class="row">
                                    <div class="col-7">
                                        <h2 class="lead"><b>{{$article->title}}</b></h2>
                                        <p class="text-muted text-sm">
                                            {{$article->short_desc}}
                                        </p>

                                    </div>
                                    <div class="col-5 text-center">
                                        @if(isset($article->photo))
                                            <img src="{{ filter_var($article->photo, FILTER_VALIDATE_URL) ? $article->photo : asset("storage/$article->photo" ) }}"  class="img-circle img-fluid"/>
                                        @endif
                                    </div>
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
                    </div>
                    @endforeach
                </div>
            </div>

            <div class="card-footer">
                <nav aria-label="Contacts Page Navigation">
                    <ul class="pagination justify-content-center m-0">
                        {{$articles->links()}}
                    </ul>
                </nav>
            </div>

        </div>
    </div>
@endsection
