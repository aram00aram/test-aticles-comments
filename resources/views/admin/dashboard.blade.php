@extends('admin.layouts.app')

@section('content')
    <div class="main-content">
        <div class="container-fluid mt-4 mt-md-5 mb-6">
            <div class="row text-center text-md-start">
                <div class="col-md-12">
                    <div class="me-auto">
                        <h2>
                            Hello, {{Auth::user()->name}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
