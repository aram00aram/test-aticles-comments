var _token = $('meta[name="csrf-token"]').attr('content');


//Add new input file
$('.add-diplome').on('click', function (e){
    e.preventDefault();
    $('.diplomes-block').append(`
        <div class="form-group d-flex">
            <input type="file" class="form-control" name="diplomas[]">
            <button class="btn remove-diplom-block" type="button">X</button>
        </div>
    `)
})

$('.add-question').on('click', function (e){
    e.preventDefault();
    $('.questions_holder').append(`
         <tr>
             <td class="w-30">
                 <input type="text" class="w-100 form-control" name="question_langs[]">
             </td>
             <td>
                 <input type="text" class="w-100 form-control" name="question_values[]">
             </td>
             <td>
                 <button class="btn btn-close bg-danger remove-question"></button>
             </td>
         </tr>
    `)
})

$('.add-question-block-text').on('click', function (e){
    e.preventDefault();
    $('.questions_block_text_holder').append(`
         <tr>
             <td class="w-30">
                 <input type="text" class="w-100 form-control" name="question_block_langs[]">
             </td>
             <td>
                 <input type="text" class="w-100 form-control" name="question_block_values[]">
             </td>
             <td>
                 <button class="btn btn-close bg-danger remove-question"></button>
             </td>
         </tr>
    `)
})
$('.add-answer').on('click', function (e){
    e.preventDefault();
    $('.answers_holder').append(`
         <tr>
             <td class="w-30">
                 <input type="text" class="w-100 form-control" name="answer_lang[]">
             </td>
             <td>
                 <input type="text" class="w-100 form-control" name="answer_value[]">
             </td>
             <td>
                 <button class="btn btn-close bg-danger remove-question"></button>
             </td>
         </tr>
    `)
})
//remove input file
$(document).on('click', '.remove-diplom-block', function (){
    $(this).parent().remove()
})
$(document).on('click', '.remove-question', function (){
    $(this).parents('tr').remove()
})


//delete file
$(document).on('click', '.delete-diplom', function (){
    let _this = $(this);
    let diplom_id = $(this).data('diplom-id')
    $.ajax({
        url: "/admin/users/file/destroy/"+diplom_id,
        type: "post",
        data: {
            diplom_id: diplom_id,
            _token: _token
        },
        success: function (response) {
            _this.parents('.form-group').remove()
        },
        error: function (error) {

        }
    });
})
//remove input file
$(document).on('click', '.btn-delete-user', function (){
    $('.user_fio').html()
   $('.delete-user').attr('data-user-id', $(this).data('user-id'))
   $('.user_fio').html( $(this).data('user-fio'))
})
$(document).on('click', '.btn-delete-user-forever', function (){
    $('.user_fio_hard').html()
   $('.user-hard-delete').attr('data-user-id', $(this).data('user-id'))
   $('.user_fio_hard').html( $(this).data('user-fio'))
})

//delete file
$(document).on('click', '.delete-user', function (){
    let _this = $(this);
    let user_id = $(this).data('user-id')
    $.ajax({
        url: "/admin/users/destroy/"+user_id,
        type: "post",
        methods: "delete",
        data: {
            // user_id: user_id,
            _token: _token
        },
        success: function (response) {
            location.reload();
        },
        error: function (error) {

        }
    });
})

$(document).on('click', '.user-hard-delete', function (){
    let _this = $(this);
    let user_id = $(this).data('user-id')
    $.ajax({
        url: "/admin/users/deleteForever/"+user_id,
        method: "delete",
        type:"delete",
        data: {
            user_id: user_id,
            _token: _token
        },
        success: function (response,textStatus,xhr) {
           if(xhr.status === 204){
               location.reload();
           }
        },
        error: function (error) {

        }
    });
})

$(document).on('click', '.delete-item', function (){
    let _this = $(this);
    let itemId = _this.attr('data-item-id')
    let itemAction = $(this).data('action')
    let url = "/admin/"+itemAction+"/destroy/"+itemId

    $.ajax({
        url : url,
        method: "delete",
        type:"delete",
        data: {
            _token: _token
        },
        success: function (response) {
         if(response.status == 'success'){
             $('tr[data-item-id='+itemId+']').remove();
         }
        },
        error: function (error) {

        }
    });
})


//delete file
$(document).on('keyup', '.search-user', function (){
    let _this = $(this);
    let query_search = $(this).val()

    $.ajax({
        url: "/admin/users/search/",
        type: "post",
        data: {
            query_search: query_search,
            _token: _token
        },
        success: function (response) {
            resultSearchContent(response)
            console.log('response', response)
        },
        error: function (error) {
            console.log('response', error)
        }
    });
})

function resultSearchContent(response){
    $('.resultSearchResource').html('')

    if(response.data.length >= 1){
        $('.resultSearchContent').show()
        for (const responseElement of response.data) {
            $('.resultSearchResource').append(`
                <tr>
                    <td>
                     ${responseElement.id}
                    </td>
                    <td>
                        <a href="/admin/users/${responseElement.id}/edit" class="text-decoration-none">
                            <span class="avatar avatar-sm me-3">
                                <img src="/storage/${responseElement.avatar}" class="avatar-image rounded-circle" alt="">
                            </span>
                            <span class="item-ceo text-dark relative-top-2">
                              ${responseElement.firstname} ${responseElement.lastname}
                            </span>
                        </a>
                    </td>
                    <td>
                        <span  class="item-name text-dark relative-top-2">
                            ${responseElement.email}
                        </span>
                    </td>
                    <td>
                         ${responseElement.role}
                     </td>
                    <td>
                         <a class="dropdown-item" href="/admin/users/${responseElement.id}/edit">
                                <i class="fas fa-pen fa-xs text-info "></i>
                            </a>
                     </td>
                </tr>`)

        }
    }

}

function deleteItem(itemId, href){
    $('.delete-item').attr('data-item-id',itemId).attr('data-action',href)
}
