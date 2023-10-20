let GET_LIST_ROUTE = document.currentScript?.attributes['data-action-list']?.value;
let SEND_EMAIL_ROUTE = document.currentScript?.attributes['data-action-send']?.value;

$(function () {
    let TOKEN = $('meta[name="csrf-token"]').attr('content');

    const EMAIL_LIST_HOLDER = $('#emailsContent .list');
    const EMAIL_CONFIG_FORM_HOLDER = $('#emailsContent .config-form');
    const LOADER_HOLDER = $('#emailsContent .loader');
    const RESULT_HOLDER = $('#emailsContent .result');

    let EMAIL_CONFIG = {};

    const renderEmailConfigList = (configSet) => {
        let listHtml = '';
        for (let configClass in configSet) {
            const config = configSet[configClass];
            listHtml += `
                <option value="${config.className}">${config.description}</option>
            `;
        }
        EMAIL_LIST_HOLDER.html(`
            <div class="form-group mb-3">
                <label for="">Выберите письмо, которое будет отправлено</label>
                <select class="form-control select2" name="config" id="sendEmailConfig">
                    ${listHtml}
                </select>
            </div>
        `);
    }
    const selectEmailConfig = (configClass) => {
        if (!configClass in EMAIL_CONFIG) {
            return;
        }

        const config = EMAIL_CONFIG[configClass];
        EMAIL_CONFIG_FORM_HOLDER.html('');
        RESULT_HOLDER.html('');
        let formHtml = '';

        const toSentenceCase = camelCase => {
            if (camelCase) {
                const result = camelCase.replace(/([A-Z])/g, ' $1');
                return result[0].toUpperCase() + result.substring(1).toLowerCase();
            }
            return '';
        };

        for (let param of config.params) {
            let paramInputHtml = '';
            switch (param.type) {
                case 'string':
                    paramInputHtml = `<input type="text" required class="form-control" name="${param.name}">`;
                    break;
                case 'bool':
                    paramInputHtml = `<input type="checkbox" required class="form-control" name="${param.name}">`;
                    break;
                case 'int':
                case 'float':
                    paramInputHtml = `<input type="number" required class="form-control" name="${param.name}">`;
                    break;
                default:
                    paramInputHtml = '';
            }
            formHtml += `<div class="form-group mb-3"><label>${toSentenceCase(param.name)}</label>${paramInputHtml}</div>`
        }

        EMAIL_CONFIG_FORM_HOLDER.html(formHtml);
    }

    const loadEmailsList = () => {
        $.ajax({
            url: GET_LIST_ROUTE,
            type: "get",
        })
        .then(response => {
            EMAIL_CONFIG = response.messages;
            renderEmailConfigList(EMAIL_CONFIG);
            selectEmailConfig(Object.keys(EMAIL_CONFIG)[0]);
            showLoader(false);
        })
    }

    const showLoader = (show) => {
        if (!show) {
            LOADER_HOLDER.hide();
            return;
        }
        LOADER_HOLDER.show()
    }

    $('#emailSendModalOpener').click(function () {
        $('#emailSendModal').modal('show');
        loadEmailsList()
    })

    $('#emailSendModal').on('hide.bs.modal', function () {
       setTimeout(() => {
           EMAIL_LIST_HOLDER.html('');
           EMAIL_CONFIG_FORM_HOLDER.html('');
           RESULT_HOLDER.html('');
           showLoader(true);
       },1000)
    });

    $(document).on('change', '#sendEmailConfig', function (e){
        selectEmailConfig(this.value);
    })

    $(document).on('submit', '#emailSendForm', function (e){
        e.preventDefault();
        const formData = $(e.target).serializeArray();
        let params = {};
        for (let param of formData) {
            params[param.name] = param.value;
        }
        $.ajax({
            url: SEND_EMAIL_ROUTE,
            type: "post",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify({
                _token: TOKEN,
                params: params
            })
        })
        .done(function() {
            RESULT_HOLDER.html(`<span class="text-success">Письмо отправлено</span>`)
        })
        .fail(function(jqXHR) {
            RESULT_HOLDER.html(`<span class="text-danger">${jqXHR.responseJSON.errors}</span>`)
        });
    })
})
