let TRANSLATIONS=JSON.parse(document.currentScript?.attributes['data-translations']?.value)
let GET_CREDITS_ROUTE=document.currentScript?.attributes['data-action-get']?.value
let SET_CREDITS_ROUTE=document.currentScript?.attributes['data-action-set']?.value
let WITHDRAW=document.currentScript?.attributes['data-action-withdraw']?.value
let TOP_UP=document.currentScript?.attributes['data-action-top-up']?.value
let CSRF_TOKEN=$('meta[name="csrf-token"]').attr('content');
let Currencies=['EUR','RUB','USD'];
const Loader_template=`<h3>${ TRANSLATIONS.loading }</h3><div class="lds-dual-ring"></div>`
const getCreditsOfUser=()=>{
    $.ajax({
        url: GET_CREDITS_ROUTE,
        type: "get",
    }).then((r)=>renderCreditContent(r))
}

function renderEditCreditsForm(pointsExists) {
    return `<form method="post" class="d-flex flex-column w-100 form-control" action="${SET_CREDITS_ROUTE}">
                <input type="hidden" name="_token" value="${CSRF_TOKEN}"/>
                <div class="d-flex flex-row justify-content-between align-items-center mb-2">
                   <div class="d-flex flex-column justify-content-between align-items-left">
                        <p class="m-0">  ${ TRANSLATIONS.action_type }</p>
                        ${pointsExists?
                        `<div class="form-check p-0">
                            <input className="form-check-input" value="${TOP_UP}" type="radio" name="action_type" id="flexRadioDefault1"/>
                            <label class="form-check-label" for="flexRadioDefault1">${ TRANSLATIONS.top_up }</label>
                        </div>
                        <div class="form-check p-0">
                            <input className="form-check-input" value="${WITHDRAW}" type="radio" name="action_type" id="flexRadioDefault2" checked/>
                            <label class="form-check-label" for="flexRadioDefault2"> ${ TRANSLATIONS.withdrawn } </label>
                        </div>`
                        :
                        `<div class="form-check  p-0">
                            <input className="form-check-input" value="${TOP_UP}" type="radio" name="action_type" checked id="flexRadioDefault1"/>
                            <label class="form-check-label"> ${ TRANSLATIONS.top_up  } </label>
                        </div>`
                        }
                    </div>
                    <label >
                        <p class="mb-0 font-weight-bold"> ${ TRANSLATIONS.amount } </p>
                        <input class="form-control" name="amount"/>
                    </label>
                    <label >
                        <p class="mb-0 font-weight-bold">${ TRANSLATIONS.reason }</p>
                        <input class="form-control"  name="reason"/>
                    </label>
                </div>
                <button class="btn btn-primary"> ${ TRANSLATIONS.proceed }</button>
            </form>`

}
function renderCreditContent({credit,creditHistory}) {
    let content=`
                <div class="d-flex flex-row justify-content-between align-items-center w-100 form-control mb-2">
                    <label class="d-flex flex-column">
                        <p class="m-0">${ TRANSLATIONS.amount } </p>
                        <input disabled value="${credit?.amount ?? 0}">
                    </label>
                    <label class="d-flex flex-column">
                        <p class="m-0">${ TRANSLATIONS.currency } </p>
                        <input disabled value="${credit?.currency ?? 'RUB'}">
                    </label>
                </div>`
                + renderEditCreditsForm(credit?.amount) +
                `
                <h5 class="mt-4">${ TRANSLATIONS.credit_history }</h5>
                <section class="w-100 credits_history">
                    <table class="table table-striped w-100">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">${ TRANSLATIONS.amount } </th>
                                  <th scope="col">${ TRANSLATIONS.currency } </th>
                                  <th scope="col">${ TRANSLATIONS.reason } </th>
                                  <th scope="col">${ TRANSLATIONS.date } </th>
                                </tr>
                              </thead>
                              <tbody>
                              ${creditHistory.length ?
                    creditHistory.map((history,index)=>(
                        `<tr>
                            <th scope="row">${index+1}</th>
                            <td>${history.amount}</td>
                            <td>${history.currency}</td>
                            <td>${history.description}</td>
                            <td>${ (new Date(history.updated_at)).toLocaleString()}</td>
                        </tr>`))
                    :
                    "" }
                      </tbody>
                    </table>
                </section>
                `;
                $('#usersCreditsWrapper').html(content)
}

$(function () {
    $('#credits_modal_opener').click(function () {
        $('#credits_modal').modal('show');
        getCreditsOfUser()
    })
    $('#credits_modal').on('hide.bs.modal', function () {
        setTimeout(()=>{
            $('#usersCreditsWrapper').html(Loader_template)
        },1000)
    });

})
