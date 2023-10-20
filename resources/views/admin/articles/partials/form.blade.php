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
                <div class="form-group mt-3 mb-3">
                    <label for="title">{{ __('fields.title') }} <b class="text-danger">*</b></label>
                    <input type="text" class="form-control  @error('title') is-invalid @enderror" onchange="generateSlug()" id="title" name="title" placeholder="{{ __('fields.title') }}"
                           value="{{ old('title', $article->title ?? '') }}">
                </div>

                <div class="form-group mt-3 mb-3">
                    <label for="slug">{{ __('fields.slug') }} <b class="text-danger">*</b></label>
                    <input type="text" class="form-control  @error('slug') is-invalid @enderror" id="slug" name="slug" placeholder="{{ __('fields.slug') }}"
                           value="{{ old('slug', $article->slug ?? '') }}">
                </div>

                <div class="form-group mt-3 mb-3">
                    <label for="short_desc">{{ __('fields.short_desc') }} <b class="text-danger">*</b></label>
                    <div class="form-group">
                        <textarea class="form-control " rows="4" name="short_desc">{!!  old('short_desc', $article->short_desc ?? '') !!}</textarea>
                    </div>
                </div>

                <div class="form-group mt-3 mb-3">
                    <label for="description">{{ __('fields.description') }} <b class="text-danger">*</b></label>
                    <div class="form-group">
                        <textarea class="ckeditor form-control" name="description">{!! old('description',$article->description ?? '') !!}</textarea>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="panel panel-bordered">
            <div class="panel-body">
                <div class="form-group">
                    @if(isset($article->photo))
                        <img src="{{ filter_var($article->photo, FILTER_VALIDATE_URL) ? $article->photo : asset("storage/$article->photo" ) }}" class="img-fluid"/>
                    @endif
                    <input type="file" data-name="photo" name="photo">
                </div>
            </div>
        </div>
    </div>
</div>



@section('script')
    <script>
        function generateSlug() {
            const a = document.getElementById("title").value;
            const b = a.toLowerCase().replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');

            document.getElementById("slug").value = b;
            document.getElementById("slug-target-span").innerHTML = b;
        }
    </script>
@endsection
