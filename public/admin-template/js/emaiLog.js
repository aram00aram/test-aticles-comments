$('.showMailLog').on('click', function (){
    let mailLog = $(this).data('user-item')
    $('.mailMessage').html(mailLog.message)
})
