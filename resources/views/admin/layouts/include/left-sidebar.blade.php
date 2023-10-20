<nav class="navbar navbar-vertical navbar-expand-lg navbar-light bg-white" role="navigation" style="">
    <div class="container-fluid">
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
            <span class="navbar-toggler-icon"></span>
        </button>




        <div class="collapse navbar-collapse mt-md-2" id="navbar-collapse">
            <ul class="navbar-nav" id="sidebar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="{{route('admin.articles.list')}}">
                        <span class="svg-icon text-primary me-2 relative-top--2">
                          <i class="fas fa-1x fa-users"></i>
                        </span>
                        {{__('menu.articles')}}
                    </a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link"  href="{{route('admin.articles.comments.list')}}">
                        <span class="svg-icon text-primary me-2 relative-top--2">
                          <i class="fas fa-1x fa-users"></i>
                        </span>
                        {{__('menu.comments')}}
                    </a>
                </li>
            </ul>

            <a href="#!" class="btn btn-light btn-sm mt-auto d-none d-lg-block" style="transform: rotateY(180deg);"
               data-toggle="sidebar" data-sidebar="lg">
          <span class="svg-icon text-primary">

<svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"
     stroke="#000000" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                                              stroke-linecap="round"
                                                                                              stroke-linejoin="round"></g><g
        id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path
            d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6"
                                                                                                   stroke="#000000"
                                                                                                   stroke-width="2"
                                                                                                   stroke-linecap="round"></path> </g></svg>
          </span>
            </a>
        </div>
    </div>
</nav>


<nav class="navbar navbar-vertical navbar-vertical-sm fixed-left navbar-expand-lg navbar-light bg-white"
     role="navigation" style="display: none">
    <div class="container-fluid">
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
            <span class="navbar-toggler-icon"></span>
        </button>



        <div class="dropdown d-flex d-lg-none">
            <a href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="avatar">
            <img src="assets/img/uifaces/9.jpg" class="avatar-image rounded-circle" alt="">
          </span>
            </a>

        </div>

        <div class="collapse navbar-collapse mt-md-3" id="navbar-collapse">
            <ul class="navbar-nav">

                <li class="nav-item dropdown dropend">
                    <a class="nav-link" href="{{route('admin.articles.list')}}">
                        <span class="svg-icon text-primary me-2 relative-top--2">
                            <i class="fas fa-1x fa-money-bill"></i>
                        </span>
                    </a>
                </li>
                <li class="nav-item dropdown dropend">
                    <a class="nav-link" href="{{route('admin.articles.list')}}">
                        <span class="svg-icon text-primary me-2 relative-top--2">
                            <i class="fas fa-1x fa-comments"></i>
                        </span>
                    </a>
                </li>
            </ul>

            <a href="#!" class="btn btn-light btn-sm mt-auto d-none d-lg-block" data-toggle="sidebar"
               data-sidebar="sm">
              <span class="svg-icon text-primary">
                <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="rotate(0)">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                        <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                        <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                    </g>
                </svg>
              </span>
            </a>
        </div>
    </div>
</nav>
