@extends('admin.layouts.app')

@section('content')
{{--{{dd($comments)}}--}}
    <div class="container-fluid mt-4 pt-2 mb-6">
        <!-- header -->

        <div class="d-md-flex align-items-center">
            <h3 class="mb-3 mb-md-0">
                {{__('menu.articles')}}
            </h3>
            <a  class="btn btn-purple hover-lift-light shadow-light-sm ms-auto" href="{{route('admin.article.create')}}">
                <i class="fas fa-plus fa-xs"></i>
                {{__('generic.add')}}
            </a>
        </div>

        <!-- report -->
        <div id="comments" class="card mt-4">
            <div class="table-responsive users-list overflow-visible">
                <table class="table table-sm card-table table-nowrap">
                    <thead>
                    <tr>
                        <th>
                            {{__('fields.id')}}
                        </th>
                        <th>
                            {{__('fields.title')}}
                        </th>
                        <th>
                            {{__('fields.short_desc')}}
                        </th>
                        <th>
                            {{__('menu.comments')}}
                        </th>
                        <th>
                            {{__('fields.created_at')}}
                        </th>
                        <th>
                            <span class="svg-icon text-primary me-2 relative-top--2">
                                <i class="fas  fa-1x fa-cogs"></i>
                            </span>
                        </th>

                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach($articles as $article)
                        <tr>
                            <td>
                                <a href="{{route('admin.article.edit',$article)}}" class="text-primary text-decoration-none" >
                                    <span>{{$article->id}}</span>
                                </a>
                            </td>
                            <td>
                                <a href="{{route('admin.article.edit',$article)}}" class="text-primary text-decoration-none" title="{{$article->slug}}">
                                    <span>{{$article->title}}</span>
                                </a>
                            </td>
                            <td>
                                <a href="{{route('admin.article.edit',$article)}}" class="text-primary text-decoration-none">
                                    <span>{{$article->short_desc}}</span>
                                </a>
                            </td>
                            <td>
                                <span>{{$article->comments->count()}}</span>
                            </td>
                            <td class="fs-sm text-muted">
                                {{date('d.m.Y H:i:s', strtotime($article->created_at))}}
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-2">
                                        <a class="btn btn-sm btn-info" href="{{route('admin.article.edit',$article)}}">
                                            <i class="fas fa-pen fa-xs"></i>
                                        </a>
                                    </div>
                                    <div class="col-2">
                                        {{--  Удалить без подтверждения  --}}
                                        <form action="{{route('admin.article.delete',$article)}}"  method="post">
                                            @csrf
                                            @method('delete')
                                            <button class="btn btn-sm btn-danger" >
                                                <i class="fas fa-trash fa-sm text-white  "></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>



                            </td>
                        </tr>

                    @endforeach

                    </tbody>
                </table>
            </div>

            <div class="card-footer d-flex justify-content-center p-0">
                <ul class="nav-pagination">
                    {{$articles->links()}}
                </ul>
            </div>
        </div>
    </div>

@endsection
