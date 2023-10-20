<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <link rel="shortcut icon" href="{{asset('admin-template/img/favicon.ico')}}">

    <!-- Theme styles -->
    <link rel="stylesheet" type="text/css" href="{{asset('admin-template/css/theme.min.css')}}">

    <!-- Font Awesome -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

    <!-- Vendor -->
    <link rel="stylesheet" type="text/css" href="{{asset('admin-template/css/vendor.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('admin-template/css/main.css')}}">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ttskch/select2-bootstrap4-theme@x.x.x/dist/select2-bootstrap4.min.css">

    @stack('styles')
    <!-- Add your scripts here -->
</head>

<body class="bg-white">

@auth
    @include('admin.layouts.include.left-sidebar')
@endauth

<div class="main-content">

    @auth
        @include('admin.layouts.include.alert')
        @include('admin.layouts.include.top-menu')

    @endauth

    @yield('content')
    <div id="app">
        @yield('framework-content')
    </div>
</div>

<!-- JAVASCRIPT ============================================-->

<!-- Vendor -->
@yield('framework-js')
<script src="{{asset('admin-template/js/vendor.min.js')}}"></script>
<!-- Main Theme file -->
<script src="{{asset('admin-template/js/theme.min.js')}}"></script>
<script src="{{asset('admin-template/js/main.js') }}" defer></script>
<script src="https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

@yield('script')
</body>
</html>
