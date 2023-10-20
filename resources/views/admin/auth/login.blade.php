@extends('admin.layouts.app')

@section('content')
    <section class="container text-center py-5 py-md-6 py-xl-8">

        <h4 class="font-weight-normal text-dark mt-5">
            {{ __('generic.login')  }}
        </h4>

        <div class="row justify-content-center mt-4 pt-3">
            <div class="col-md-6 col-lg-4">
                <form method="POST" action="{{ route('admin.login') }}">
                    @csrf
                    <div class="mb-3">
                        <input type="email" name="email" placeholder="{{ __('generic.email') }}" class="form-control form-control-lg bg-pastel-darkblue @error('email') is-invalid @enderror">

                        @error('email')
                        <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <input type="password" name="password" placeholder="{{ __('generic.password') }}" class="form-control form-control-lg bg-pastel-darkblue @error('password') is-invalid @enderror">
                        @error('password')
                        <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <input type="submit" class="btn btn-primary btn-lg shadow-light text-uppercase-bold-sm hover-lift mt-4" value="{{__('generic.next')}}">

                </form>
            </div>
        </div>
    </section>

@endsection
