@if (session()->has('success'))
    <div class="alert alert-success alert-block alert-dismissible fade show" data-bs-animation="fade-in-down" role="alert">
        <p class="text-center  mb-0">{{ session()->get('success') }}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif


@if (session()->has('error'))
    <div class="alert alert-danger alert-block alert-dismissible fade show" data-bs-animation="fade-in-down" role="alert">
        <p class="text-center  mb-0">{{ session()->get('error')}}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif


@if (session()->has('warning'))
    <div class="alert alert-warning alert-block  alert-dismissible fade show" data-bs-animation="fade-in-down" role="alert">
        <p class="text-center   mb-0">{{ session()->get('warning')}}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif


@if (session()->has('info'))
    <div class="alert alert-info alert-block  alert-dismissible fade show" data-bs-animation="fade-in-down" role="alert">
        <p class="text-center  mb-0">{{ session()->get('info')}}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
