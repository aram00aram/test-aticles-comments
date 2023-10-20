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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ttskch/select2-bootstrap4-theme@x.x.x/dist/select2-bootstrap4.min.css">

    @stack('styles')
    <!-- Add your scripts here -->
</head>

<body class="bg-white">


<div class="main-content">



    @yield('content')
    <div id="app">
        @yield('framework-content')
    </div>
</div>

<!-- JAVASCRIPT ============================================-->

<!-- Vendor -->
@yield('framework-js')

@yield('script')
</body>
</html>
