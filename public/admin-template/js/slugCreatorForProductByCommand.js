function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

function setValueOfSlugInput(value) {
    $('#slug').val(convertToSlug(value));
}
function getValueOfNameInput() {
    console.log($('#name').val())
    return $('#name').val()
}
$(function () {
    $(document).on('click', '#slug_updater', function (  ) {
        setValueOfSlugInput(getValueOfNameInput())
    })
})
