const CONSULTATION_TYPES=JSON.parse(document.currentScript?.attributes['data-consultation-type']?.value)
const COUNTRIES=JSON.parse(document.currentScript?.attributes['data-countries']?.value)
let target={
    count:Date.now()
}
let handler={
    get(target,name){
        return target[name]
    },
    set(target,prop,value){
        $('#price_area').append(renderPriceAdder(value))
        $(`#countries_values${value}`).select2({multiple:true});
        target[prop]=value;
        return true;
    }
}
function removeAddedPrice(index) {
    $(`#price_wrapper${index}`).remove()
}
const ConsultationOptionTemplate = () => {
    let template=``;
    for (const consultationType of CONSULTATION_TYPES) {
        template+=`<option value="${consultationType.id}">${consultationType.type_name_ru}</option>`
    }
    return template;
}
const countryOptionsTemplate=()=>{
    let template=``;
    for (const country in COUNTRIES) {
        template+=`<option value="${country}">${COUNTRIES[country]}</option>`
    }
    return template;
}
const countriesTemplate=(index)=>{
    return(
        `    <fieldset>
                            <legend>Select a variant for countries</legend>
                            <div class="col">
                                <label class="d-inline-block ml-1"> Only
                                    <input type="radio"  name="countries[${index}]" value="only">
                                </label>
                                 <label class="d-inline-block">Except
                                    <input type="radio"  name="countries[${index}]" checked value="except">
                                </label>
                            </div>
                            <select id="countries_values${index}" data-multislect="true" name="country_values[${index}][]" class="form-control select2 " multiple data-live-search="true">
                               ${countryOptionsTemplate()}
                            </select>
                        </fieldset>`
    )
}
const constultationTypesTemplate=()=>(
    `
        <div class="form-group col-md-8 ">
            <label for="inputState">Consultation TYpes</label>
            <select id="inputState" name="typeConsultations[]" class="form-control">
               ${ConsultationOptionTemplate()}
            </select>
        </div>
   `
);
function renderPriceAdder(index) {
    return (`<div class="col mt-2 border mb-2 p-1" id="price_wrapper${index}">
          <div class="row">
               <div class="col">
                   <label for="">Slug
                       <input type="text" name="price_slug[]" class="form-control" placeholder="Slug">
                   </label>
                   <div class="form-group col-md-8">
                       <label for="inputState">Валют</label>
                       <select id="inputState" name="price_currency[]" class="form-control">
                           <option value="RUB">RUB</option>
                           <option value="USD">USD</option>
                       </select>
                   </div>
               </div>
               <div class="col">
               ${constultationTypesTemplate()}
                   <label for="">Цена
                       <input type="text" name="prices[]" class="form-control" placeholder="Цена">
                   </label>
               </div>
                 <div class="col">
                    <label for="">Price Description
                        <input type="text" name="price_description[]" class="form-control" placeholder="Price description">
                    </label>
                    ${countriesTemplate(index)}
                </div>
               <div class="col d-flex align-items-center">
                   <button type="button" class="btn btn-danger price_field_remover" data-index="${index}">Удалить</button>
               </div>
           </div>
       </div>`)
}
let priceCount=new Proxy(target,handler)
$(function () {
    $('.select2').select2()
    $('#price_adder').click(function () {
        priceCount.count+=1;
    })
    $(document).on('click', '.price_field_remover', function (  ) {
        removeAddedPrice($(this).attr('data-index'));
    })
})
