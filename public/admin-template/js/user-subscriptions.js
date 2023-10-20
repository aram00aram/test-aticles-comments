var _token = $('meta[name="csrf-token"]').attr('content');

$(document).on('keyup', '.search-subscription', function (){
    let _this = $(this);
    let query_search = $(this).val()
    console.log(query_search)
    $.ajax({
        url: "/admin/users/subscriptions/search",
        type: "post",
        data: {
            query_search: query_search,
            _token: _token
        },
        success: function (response) {
            resultSearchContentSubscriptions(response)
            console.log('response', response)
        },
        error: function (error) {
            console.log('response', error)
        }
    });
})

function resultSearchContentSubscriptions(response){
    $('.resultSearchResource').html('')

    if(response.data.length >= 1){
        $('.resultSearchContent').show()
        for (const responseElement of response.data) {
            let htmlTr = '';
            let subscriptionId = responseElement.id;
            for (const key of Object.keys(responseElement)) {
                htmlTr +=`  <td>
                     ${responseElement[key]}
                    </td>`
            }

            $('.resultSearchResource').append(`
                <tr class="user-subscription" data-subscription="${subscriptionId}">
                   ${htmlTr}
                </tr>`)

        }
    }

}


$(document).on('click', '.user-subscription', function (){
    let subscriptionId = $(this).data('subscription')
    window.location.href = '/admin/users/subscription/'+subscriptionId
})
