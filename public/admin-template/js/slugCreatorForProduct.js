function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

function setValueOfSlugInput(value) {
    $('#slug').val(convertToSlug(value));
}

$(function () {
    $( "#name" ).one( "input", function(  ) {
        $('#slug_content').removeClass('d-none');
    });
    $(document).on('input', '#name', function ( event ) {
        console.log(event.target.value)
        setValueOfSlugInput(event.target.value)
    })
})
