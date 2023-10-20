<div class="row">
    <div class="col-md-8">
        <div class="panel panel-bordered">
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div class="panel-body">
                <a href="{{route('admin.article.edit',$comment->article)}}">{{$comment->article->title}}</a>
                <div class="form-group mt-3 mb-3">
                    <label for="title">{{ __('fields.title') }} <b class="text-danger">*</b></label>
                    <input type="text" class="form-control  @error('title') is-invalid @enderror"
                           id="title" name="title" placeholder="{{ __('fields.title') }}"
                           value="{{ old('title', $comment->title ?? '') }}">
                </div>


                <div class="form-group mt-3 mb-3">
                    <label for="comment_msg">{{ __('fields.comment_msg') }} <b class="text-danger">*</b></label>
                    <div class="form-group">
                        <textarea class="form-control " rows="4"
                                  name="comment_msg">{!!  old('comment_msg', $comment->comment_msg ?? '') !!}</textarea>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
