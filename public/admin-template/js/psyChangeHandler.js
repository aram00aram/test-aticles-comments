let GET_PSYS_ROUTE=document.currentScript?.attributes['data-action-get']?.value
let SET_PSY_ROUTE=document.currentScript?.attributes['data-action-set']?.value
let USER_ID=document.currentScript?.attributes['data-user-id']?.value
let TOKEN=$('meta[name="csrf-token"]').attr('content');
const Loader=`<h3>Loading Psychologists</h3>
               <div class="lds-dual-ring"></div>`

const SELECTED_PSYS_HOLDER=$('#psycologitstContent')
const PsysNotFound=`<div class="alert alert-warning alert-block  alert-dismissible fade show" data-bs-animation="fade-in-down" role="alert">
        <p class="text-center   mb-0">No psychologist was found for given user</p>
        </div>`

const renderPsysCards=(psys)=>{

    if (!psys.length){
        SELECTED_PSYS_HOLDER.html(PsysNotFound)
        return;
    }
    let cards=`<div >
            <form method="post" id="change_psy_form" class="d-flex flex-row align-items-center justify-content-between" action="${SET_PSY_ROUTE}">
            <div class="dropdown" style="width: 300px">
              <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="chengePsydropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pick a psycologist
              </button>
  <div class="dropdown-menu w-100 h-300 overflow-hidden" aria-labelledby="chengePsydropdownMenuButton" style="overflow-y: auto !important">`
    psys.forEach((psy,index)=>{
        cards+=`
                <div class="d-flex flex-row align-items-center gap-3 position-relative psy_option_for_exchange "
                 data-psy-name="${psy.full_name}"
                 data-psy-id="${psy.id}">
                    <img src="${'/storage/'+psy.avatar}" class="new_psy_candidate" alt="${psy.full_name}"/>
                    <span>${psy.full_name}</span>
                </div>
            `
        if (index === psys.length-1){
            cards+=`
                          </div>
                        </div>
                         <input type="hidden"  class="psy_id_for_exchange" name="psy_id" />
                         <input type="hidden" name="user_id" value="${USER_ID}"/>
                         <input type="hidden" name="_token" value="${TOKEN}"/>
                        </form>
                        <div class="d-flex justify-content-center align-items-center mt-2">
                            <button type="submit" form="change_psy_form" class="btn btn-primary">
                              Change Psy
                            </button>
                        </div>
                    </div>`
        }
    })
    SELECTED_PSYS_HOLDER.html(cards)
}

const getUsers=()=>{
    $.ajax({
        url: GET_PSYS_ROUTE,
        type: "get",
    }).then(renderPsysCards)

}
$(function () {
    $('#changePsyModalOpener').click(function () {
        $('#changePsyModal').modal('show');
        getUsers()
    })
    $('#changePsyModal').on('hide.bs.modal', function () {
       setTimeout(()=>{
           SELECTED_PSYS_HOLDER.html(Loader)
       },1000)
    });
    $(document).on('click', '.psy_option_for_exchange', function (){
        let psy_id=$(this).attr('data-psy-id')
        let psy_name=$(this).attr('data-psy-name')
        $('.psy_id_for_exchange').val(psy_id)
        $('#chengePsydropdownMenuButton').text(psy_name)
    })
})
