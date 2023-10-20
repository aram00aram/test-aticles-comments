

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-light navbar-white">
    <div class="container">
        <a href="/admin" class="navbar-brand">
            <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="{{ route('admin.logout') }}" title="{{ __('generic.logout') }}" data-widget="control-sidebar" data-slide="true" role="button">
                    {{ __('generic.logout') }}
                    <i class="fas   fa-share"></i>
                </a>
            </li>
        </ul>
    </div>
</nav>
<!-- /.navbar -->
