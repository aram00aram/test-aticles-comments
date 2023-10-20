let Months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];
const WeekDays = ['Mon', 'Tus', 'Wed', 'Ths', 'Fri', 'Sat', 'Sun'];
let SessionUnderEdition = {};
let changeOfSessionType = {
    get sessionType() {
        return this._someValue
    },
    set sessionType(value) {
        let typeChangerButtons = document.querySelectorAll('.change_session_type .session_type_changers')
        typeChangerButtons.forEach((btn)=>btn.classList.remove('action_active'))
        if (value) {
            let selectedTypeIndex;
            typeChangerButtons.forEach((singleType, index) => {
                if (singleType.getAttribute('data-type') == value) {
                    selectedTypeIndex = index
                }
            });
            typeChangerButtons[selectedTypeIndex].classList.add('action_active');
            SessionUnderEdition.session.type=value;
            $('.change_session_type').show();
        } else {
            document.querySelector('.change_session_type .action_active')
                ?.classList.remove('action_active')
            SessionUnderEdition={};
            $('.change_session_type').hide();
        }
        this._someValue = value
    }
}
let InitialRender = true;
let SessionsHasBeenChanged = false;

class Interval {
    start;
    end;
    creator;
    id;

    constructor(start, end, creator = "admin",id=0) {
        this.start = start;
        this.end = end;
        this.creator = creator
        this.id=id;
    }

}

let Psy_id;
let ErrorsHolder = {
    set error(value) {
        this._error = value
    },
    get error() {
        return this._error
    }
}

function checkIfInputIsFilled(input) {
    let Inputvalue = input.value
    if (Inputvalue) {
        if (Inputvalue.length === 1) {
            input.value = `0${Inputvalue}:00`
        }
        if (Inputvalue.length === 2) {
            input.value = `${Inputvalue}:00`
        }
        if (Inputvalue.length === 3) {
            input.value = `${Inputvalue}00`
        }
        if (Inputvalue.length === 4) {
            input.value = `${Inputvalue}0`
        }
    }
    return input.value
}

function checkIfAllInputsAreFilled() {
    let Inputs = document.querySelectorAll('.interval_details input')
    for (const input of Inputs) {

        let inputValue = checkIfInputIsFilled(input)
        if (inputValue === '') {
            input.value = `00:00`
        }
        let index = $(input).parent().parent().index();
        let key = $(input).attr('data-key')
        if (Intervals.itself[index]){
            Intervals.itself[index][key] = input.value
        }

    }
}

let Intervals = {
    get count() {
        return this._count
    },
    set count(value) {

        if (value > this._count) {
            addIntervalsForEdition();
        }
        this._count = value

    },
    intervalsFetchedFromServer: [],
    selectedWeekDays: [],
    _count: document.querySelectorAll('.all_intervals .interval').length,
    itself: []
};

let DaysContent = document.getElementById('days');
let CurrentYear = new Date().getFullYear()
let currentDatesInfo = {
    selectedMonth: new Date().getMonth(),
};
let selectedDay = {
    _day:new Date().getDay(),
    get day() {
        return this._day
    },
     set day(value) {
        return (async ()=>{
            this._day = value;
            let weekDay = new Date(CurrentYear, Dates.selectedMonth, this.day).getDay() - 1;
            let date=refactorDateForSendingToServer(this.day, Dates.selectedMonth, CurrentYear)
            setDateOnSessionPopUp(this.day, Dates.selectedMonth);
            await getSessionOfSelectedDay({date});
            getAvailableTimesOfPsy(date,weekDay)
            getDataForSearch(this.day, Dates.selectedMonth, CurrentYear, weekDay);
            $('.change_session_type').hide();
        })()
    }
};

function refactorDateForSendingToServer(day, month, year) {
    return `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` : day}`
}

function getAvailableTimesOfPsy(date,weekDay) {
    let _token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        url: "/admin/intervals/availableTimes/" + Psy_id,
        type: "post",
        data: {
             date,
             weekDay,
            _token
        },
    }).then(({times,occupied})=> {
        return times.filter((single)=>{
            return !occupied.includes(single)
        })
      })
      .then((availableTimes)=>{
          renderAvailableTimes(availableTimes)
      })
     .catch((e)=>console.log(e))
}
function renderAvailableTimes(availableTimes){
    let innerHtml=''
    for (const index in availableTimes) {
        innerHtml+=`<div  class="available_time"><span>${availableTimes[index]}</span></div>`
    }
    $('.session_changers .available_times').html(innerHtml)


}
function refactorDateForReplaceSessionRequest(day, month, year) {
    return `${day < 10 ? `0${day}` : day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`
};

async function getSessionOfSelectedDay(data) {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let response = await $.ajax({
        url: "/admin/sessions/" + Psy_id,
        type: "post",
        data: {
            ...data,
            _token: _token
        },
    });
    if (response.success) {
        renderScheduledSessions(response.sessions)
    }
}

function renderScheduledSessions(sessions, emptySession = false) {
    $('.planned_sessions').html('');
    let addableSessions = '';
    if (!sessions.length || emptySession) {
        addableSessions = '<p class="no_sessions">There are no planned sessions yet</p>';
    } else {
        for (let session of sessions) {
            addableSessions += `<div class="single_session ${session.state === 'canceled' ? 'canceled' : ''}" >
            <div class="user_avatar " data-user-id="${session.user_id}" style="background-image: url('${session.patient.avatar}')">
                <span class="is_active"></span>
            </div>
            <div class="session_info" >
                <p class="session_date" data-date="${session.date}">${refactorDateForDisplaying(session.date)}${session.patient.firstname}</p>
                <p class="session_type" data-session-type="${session.type}">${session.type}</p>
            </div>
            <div class="session_controls" >
                <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3.25C9.69036 3.25 10.25 2.69036 10.25 2C10.25 1.30964 9.69036 0.75 9 0.75C8.30964 0.75 7.75 1.30964 7.75 2C7.75 2.69036 8.30964 3.25 9 3.25ZM16 3.25C16.6904 3.25 17.25 2.69036 17.25 2C17.25 1.30964 16.6904 0.75 16 0.75C15.3096 0.75 14.75 1.30964 14.75 2C14.75 2.69036 15.3096 3.25 16 3.25ZM2 3.25C2.69036 3.25 3.25 2.69036 3.25 2C3.25 1.30964 2.69036 0.75 2 0.75C1.30964 0.75 0.75 1.30964 0.75 2C0.75 2.69036 1.30964 3.25 2 3.25Z" fill="#A7A9B5" stroke="#A7A9B5" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>`
        }
    }

    $('.planned_sessions').html(addableSessions);
}

function refactorDateForDisplaying(dataData) {
    let date = new Date(dataData);
    let Minutes = date.getUTCMinutes();
    let Hours = date.getUTCHours();
    return `${Hours < 10 ? `0${Hours}` : Hours}:${Minutes < 10 ? `0${Minutes}` : Minutes}`
}

function setDateOnSessionPopUp(day, month) {
    $('.session_intro .replace_info .marked').html(`${day} ${Months[month]}`)
}

async function setViewInCaseOfAnyActionModal(action) {
    if (action == 'cancel') {
        $('.session_intro .text_of_action').html('Are You Sure you want to cancel action');
        $('.session_changers .replace_session').hide();
        $('.session_changers .change_type').hide();
        $('.session_intro .replace_info').hide()
        $('.session_changers .do_not_cancel_session').css('display', 'flex');
        $('.session_changers .relpace_time').hide()
    }
    if (action == 'view') {
        $('.session_intro .text_of_action').html('Session');
        $('.session_changers .replace_session').removeClass('action_active');
        $('.session_changers .replace_session').css('display', 'flex');
        $('.session_changers .change_type').css('display', 'flex');
        $('.session_changers .cancel_session').css('display', 'flex');
        $('.session_changers .do_not_cancel_session').hide()
        $('.session_intro .replace_info').hide()
        $('.session_changers .relpace_time').hide()
        $('.session_changers .available_times').css('display', 'none');
        $('.session_changers .relpace_time').val('');
        clearSelectedTimes()

    }
    if (action === 'replace') {
        $('.session_intro .text_of_action').html('');
        $('.session_intro .replace_info').css('display', 'flex');
        $('.session_changers .available_times').css('display', 'flex');
        $('.session_changers .cancel_session').hide();
        $('.session_changers .replace_session').addClass('action_active');
        $('.session_changers .change_type').hide();
    }
}

function getInstancesOfIntervals() {
    if (!Intervals.count) {
        return
    }
    let existingIntervals = document.querySelectorAll('.all_intervals .interval')
    for (let index = 0; index < existingIntervals.length; index++) {

        let firstInput = existingIntervals[index].querySelectorAll('input')[0];
        let secondInput = existingIntervals[index].querySelectorAll('input')[1];
        //two inputs has the same attr data-creator
        let Instance = new Interval(firstInput.value, secondInput.value, $(firstInput).attr('data-creator'),$(firstInput).attr('data-id'))
        Intervals.itself.push(Instance)
        if (firstInput.value !== '' && secondInput.value !== '') {
            Intervals.intervalsFetchedFromServer.push(Instance)
        }

    }
}

function getDataForSearch(day, month, year, weekday) {
    let data = {
        day: day,
        month: month,
        year: year,
        weekday: weekday,
        psyId: Psy_id
    }
    let _token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        url: "/admin/intervals",
        type: "post",
        data: {
            data,
            _token: _token
        },
        success: function (response) {
            renderIntervals(response)
        },
        error: function (error) {

        }
    });
}

async function getSessionDaysOfCurrentMonth(month, year) {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let data = {
        psyId: Psy_id,
        month,
        year
    };
    let daysResponse = await $.ajax({
        url: "/admin/sessions/days",
        type: "post",
        data: {
            ...data,
            _token: _token
        },
    });
    if (daysResponse.success) {
        markSessionDays(daysResponse.days)
    }
}

function markSessionDays(days) {
    let Days = document.querySelectorAll('#days .current')
    for (let i = 0; i < Days.length; i++) {
        if (days.includes(i + 1)) {
            Days[i].classList.add('session_day')
        }
    }
}

function checkIfDataUpdatedFromServer(index) {
    if (index > Intervals.intervalsFetchedFromServer.length) {
        return false;
    }
    let IntervalIsFetchedFromServer = false;
    Intervals.intervalsFetchedFromServer.forEach((interval, indexOfInterval) => {
        if (JSON.stringify(interval) === JSON.stringify(Intervals.itself[index])) {
            IntervalIsFetchedFromServer = indexOfInterval
        }
    })
    return IntervalIsFetchedFromServer;

}

function renderIntervals(dataForRender) {
    let IntervalsWrapper = document.querySelector('.interval_wrapper .intervals')
    IntervalsWrapper.innerHTML = '';
    for (let interval of dataForRender.intervals) {
        IntervalsWrapper.innerHTML += `<div class="interval">
                           <div class="times">
                                <span class="start_time">${interval.start}</span> -
                                <span class="end_time">${interval.end}</span>
                            </div>
                            <div class="planned_dates">
                                <p>${proverViewForWeekDays(dataForRender.week_days)}</p>
                            </div>
                            </div>`;
    }
}

function proverViewForWeekDays(weekDays) {
    let result = '';
    for (let i = 0; i < weekDays.length; i++) {
        result += WeekDays[weekDays[i]]
        if (i !== weekDays.length - 1) {
            result += ','
        }
    }
    return result
}

function refactorWeekDayForInitialRender() {
    let WeekDays = document.querySelectorAll('.planned_dates p')
    for (let weekDay of WeekDays) {
        weekDay.innerHTML = proverViewForWeekDays(JSON.parse(weekDay.innerHTML))
    }
}

let handlerOfChangesInCurrentDatesInfo = {
    set(target, p, value, receiver) {
        let month = null
        if (p === 'selectedMonth') {
            if (value === 12) {
                value = 0;
                CurrentYear += 1
            }
            if (value < 0) {
                value = 11;
                CurrentYear -= 1;
            }
            month = value
            changeCurrentMonthView(value)
            target[p] = value;
            calcDays(month, CurrentYear);
            getSessionDaysOfCurrentMonth(month, CurrentYear);
            clearIntervals();
            clearSessions();
        }
        return true
    }
}
let Dates = new Proxy(currentDatesInfo, handlerOfChangesInCurrentDatesInfo)

function changeCurrentMonthView(index) {
    document.getElementById('currentMonth').innerHTML = Months[index]
}

function clearIntervals() {
    $('.interval_wrapper .intervals').html('');
}

function clearSessions() {
    $('.planned_sessions').html('<p class="no_sessions">There are no planned sessions yet</p>');
}

function calcDays(month = null, year = null) {
    DaysContent.innerHTML = '';
    let PassedDays = [];
    let ComingDays = [];
    let CurrentMonthsDays = [];
    const date = new Date();
    date.setDate(1);
    if (month !== null) date.setMonth(month);
    if (year !== null) date.setFullYear(year);
    const lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getDate();
    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex === -1) {
        firstDayIndex = 6
    }

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    for (let x = firstDayIndex; x > 0; x--) {
        PassedDays.push(prevLastDay - x + 1)
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            CurrentMonthsDays.push({today: i});
        } else {
            CurrentMonthsDays.push(i);
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        ComingDays.push(j)
    }
    for (let passedDay of PassedDays) {
        DaysContent.innerHTML += `<div class="prev-date day"><span>${passedDay}</span></div>`
    }
    for (let currentMonthsDay of CurrentMonthsDays) {
        if (currentMonthsDay.hasOwnProperty('today')) {
            DaysContent.innerHTML += `<div class="today day current ${InitialRender ? 'selected_day' : ''}" >
                   <span>${currentMonthsDay.today}<span class="dot"></span></span></div>`
            if (InitialRender) InitialRender = false

        } else {
            DaysContent.innerHTML += `<div class="day current" ><span>${currentMonthsDay}</span></div>`
        }
    }
    for (let comingDay of ComingDays) {
        DaysContent.innerHTML += `<div class="next-date day"><span>${comingDay}</span></div>`
    }
}

function setDay(day) {
    selectedDay.day = day
}

async function removeIntervalFromServer(index) {
    let data = Intervals.itself[index]
    data.psy_id = Psy_id
    let _token = $('meta[name="csrf-token"]').attr('content');
    return $.ajax({
        url: "/admin/intervals/remove",
        type: "delete",
        data: {
            data,
            _token: _token
        },
    });
}

function addIntervalsForEdition() {
    $('.all_intervals').append(`<div class="interval" >
                            <div class="interval_details" >
                                <span>From</span>
                                <input type="text" data-key="start" data-creator="admin" class="interval_inp" placeholder="HH:MM"  >
                            </div>
                            <div class="interval_details" >
                                <span>to</span>
                                <input type="text" data-key="end" data-creator="admin" class="interval_inp" placeholder="HH:MM"  >
                            </div>
                            <div class="closer">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002" stroke="#C31A39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>`)
}

async function sendChangedIntervalsToServer() {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let data = {
        intervals: Intervals.itself,
        weekDays: Intervals.selectedWeekDays
    }
    data.psy_id = Psy_id
    try {
        let response = await $.ajax({
            url: "/admin/intervals/upsert",
            type: "post",
            data: {
                data,
                _token: _token
            }
        });
        if (response.success) {
            Intervals.intervalsFetchedFromServer = Intervals.itself
            ErrorsHolder.error = ''
        }
    } catch (e) {
        ErrorsHolder.error = 'Date Format Must be HH:MM'
    }

}

function validationOfInputValue(value) {
    //date format is HH:MM
    let lengthOfCharacters = value.length
    if (lengthOfCharacters === 1 && /[0-2]/.test(value)) {
        return true
    }
    if (lengthOfCharacters === 2 && /(0[0-9]|1[0-9]|2[0-3])/.test(value)) {

        return true
    }
    if (lengthOfCharacters === 3 && /(0[0-9]|1[0-9]|2[0-3]):/.test(value)) {

        return true
    }
    if (lengthOfCharacters === 4 && /^(0[0-9]|1[0-9]|2[0-3]):[0-5]/.test(value)) {

        return true
    }
    if (lengthOfCharacters === 5 && /([2][0-3]|[01]?[0-9])([:][0-5][0-9])/.test(value)) {
        return true
    }
    if (lengthOfCharacters === 4) {
        return value.slice(0, -2);
    }
    if (lengthOfCharacters === 5) {
        return value.slice(0, -3);
    }
    if (lengthOfCharacters === 6) {
        return value.slice(0, -5);
    }
    return value.slice(0, -1);

}

function getSelectedWeekDaysForIntervals() {
    let weekDays = document.querySelectorAll('.interval_content .week_days span');
    let resultWeekDays = [];
    for (let i = 0; i < weekDays.length; i++) {
        if (weekDays[i].classList.contains('selected')) {
            resultWeekDays.push(i)
        }
    }
    Intervals.selectedWeekDays = resultWeekDays;
}

function dropSelectedWeekDays() {
    Intervals.selectedWeekDays = []
    let weekDays = document.querySelectorAll('.interval_content .week_days span');
    for (const weekDay of weekDays) {
        $(weekDay).removeClass('selected')
    }
}

async function sendReplaceSessionRequest(sessionData) {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let response = await $.ajax({
        url: "/admin/sessions/replace",
        type: "put",
        data: {
            ...sessionData,
            _token
        },
    });
    if (response) {
        SessionsHasBeenChanged = true;
        $('#sessionEdit').modal("hide");
    }
}

async function sendCancelSessionRequest(sessionData) {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let response = await $.ajax({
        url: "/admin/sessions/cancel",
        type: "patch",
        data: {
            ...sessionData,
            _token
        },
    });
    if (response.success && response.canceled) {
        SessionsHasBeenChanged = true;
        $('#sessionEdit').modal("hide");
    }
}
function clearSelectedTimes() {
    document.querySelectorAll('.available_times .available_time')
        .forEach((item)=>item.classList.remove('selected_time'))
}
async function sendRequestToChangeSessionType() {
    let _token = $('meta[name="csrf-token"]').attr('content');
    let response = await $.ajax({
        url: "/admin/sessions/changeType",
        type: "patch",
        data: {
            ...SessionUnderEdition,
            _token: _token
        },
    });
    if (response.success){
        return  true;
    }
}


$(async function () {
    const Today=new Date()
    calcDays();
    changeCurrentMonthView(Dates.selectedMonth);
    refactorWeekDayForInitialRender();
    getInstancesOfIntervals();
    getSelectedWeekDaysForIntervals();
    Psy_id = window.location.pathname.split('/')[4]//id of psy in route
    await getSessionDaysOfCurrentMonth(currentDatesInfo.selectedMonth, CurrentYear);
    getAvailableTimesOfPsy(
        refactorDateForSendingToServer(Today.getUTCDate(), Today.getUTCMonth(), CurrentYear),
        Today.getUTCDay()-1
    )
    $(".monts_opener").click(function () {
        $(".months").toggle();
    });
    $(".prev_month").click(function () {
        Dates.selectedMonth -= 1
        $('.change_session_type').hide();
    });
    $(".next_moth").click(function () {
        Dates.selectedMonth += 1
        $('.change_session_type').hide();
    });
    $("#days").on("click", ".current", function () {
        $('.selected_day').removeClass('selected_day')
        let day = $(this).children().html()
        if (/<\/?[a-z][\s\S]*>/i.test(day)) {
            day = day.replace(/<\/?[a-z][\s\S]*>/i, '')
        }
        $(this).addClass('selected_day')
        setDay(day)
    });
    $(".months div").on("click", "p", function () {
        Dates.selectedMonth = $(this).index()
        $(".months").toggle();
        $('.months div p').each(function () {
            $(this).removeClass('selected_month')
        })
        $(this).addClass('selected_month');
    });
    $(".add_interval").click(function () {
        Intervals.count += 1;
        Intervals.itself.push(new Interval('', '', 'admin'));
    });
    $(document).on('input', '.interval_details input', function () {
        let key = $(this).attr('data-key')
        let index = $(this).parent().parent().index();
        let otherInput = document.querySelectorAll('.all_intervals .interval')[index].querySelector(`input[data-key="${key === 'start' ? 'end' : 'start'}"]`)
        let otherInputValue = checkIfInputIsFilled(otherInput)
        let testpassed = validationOfInputValue(this.value)
        if (testpassed !== true) {
            this.value = testpassed
        }
        if (this.value) {
            $(this).addClass('active_interval_inp')
        } else {
            $(this).removeClass('active_interval_inp')
        }
        Intervals.itself[index][key] = this.value
        Intervals.itself[index][key === 'start' ? 'end' : 'start'] = otherInputValue
    });

    $('.all_intervals').on('click', '.interval .closer', async function () {
        let index = $(this).parent().index();
        let indexOfIntervalInDataFromServe = checkIfDataUpdatedFromServer(index)
        try {
            if (indexOfIntervalInDataFromServe !== false) {
                let removedSuccessfully = await removeIntervalFromServer(index)
                if (removedSuccessfully.success) {
                    $(this).parent().remove();
                    Intervals.itself.splice(index, 1);
                    Intervals.intervalsFetchedFromServer.splice(indexOfIntervalInDataFromServe, 1);
                }
                if (removedSuccessfully.noExistingInterval) {
                    dropSelectedWeekDays()
                }
            } else {
                $(this).parent().remove();
                Intervals.itself.splice(index, 1)
            }
        }catch (e) {
            $(this).parent().remove();
            Intervals.itself.splice(index, 1);
            if (indexOfIntervalInDataFromServe){
                 Intervals.intervalsFetchedFromServer.splice(indexOfIntervalInDataFromServe, 1);
            }
        }


    });
    $('.interval_content .week_days span').click(function () {
        $(this).toggleClass('selected');
        getSelectedWeekDaysForIntervals();
    });
    $('.save_intervals').click(async function () {
        checkIfAllInputsAreFilled();
        await sendChangedIntervalsToServer();

    });
    /// hooks on modals opening or closing
    $('#largeShoes').on('hide.bs.modal', function () {
        $('.calendar_wrapper .days .selected_day').click();
    });
    $('#sessionEdit').on('hide.bs.modal', function () {
        setTimeout(() => setViewInCaseOfAnyActionModal('view'), 1000);
        if (!changeOfSessionType.sessionType) {
            SessionUnderEdition = {};
        }
        if (SessionsHasBeenChanged) {
            $('.calendar_wrapper .days .selected_day').click();
            SessionsHasBeenChanged = false;
        }
    });
    $('.planned_sessions').on('click', '.single_session', function () {
        if ($(this).hasClass('canceled')) {
            return;
        }
        let slot = $(this).children(':lt(2)').clone();
        $('.slot').html(slot);
        let user_id = $(this).find('.user_avatar').attr('data-user-id');
        let date = $(this).find('.session_date').attr('data-date');
        let type = $(this).find('.session_type').attr('data-session-type');
        SessionUnderEdition.session = {user_id, date, type, psy_id: Psy_id};
        $('#sessionEdit').modal("show");
    });

    $('.session_changers').on('click', '.do_not_cancel_session', function () {
        setViewInCaseOfAnyActionModal('view')
    });
    $('.session_changers').on('click', '.replace_session', async function () {
        if (!$(this).hasClass('action_active')) {
            await setViewInCaseOfAnyActionModal('replace')
            return;
        }
        let session = {
            ...SessionUnderEdition,
            dateOfReplacement: refactorDateForReplaceSessionRequest(selectedDay.day, currentDatesInfo.selectedMonth, CurrentYear),
            time: $('.session_changers .available_times .selected_time').text()
        };
        await sendReplaceSessionRequest(session)
    });
    $('.session_changers').on('click', '.available_times .available_time', function (e) {
        clearSelectedTimes()
        $(this).addClass('selected_time')
    });
    $('.session_changers').on('click', '.cancel_session', async function () {
        var shouldCancel = $(this).attr('data-cancel');
        if (shouldCancel) {
            $(this).removeAttr('data-cancel');
            await sendCancelSessionRequest(SessionUnderEdition)

        } else {
            $(this).attr('data-cancel', true);
            setViewInCaseOfAnyActionModal('cancel');
        }

    });
    $('.session_changers').on('click', '.change_type', function () {
        changeOfSessionType.sessionType = SessionUnderEdition.session.type;
        $('#sessionEdit').modal("hide");
    });
    $('.change_session_type ').on('click', '.session_type_changers', function () {
        changeOfSessionType.sessionType=$(this).attr('data-type')
    });
    $('.change_session_type ').on('click', '.save_change_of_type',async  function () {
        let allGood=await sendRequestToChangeSessionType();
        if (allGood){
            $('.calendar_wrapper .days .selected_day').click();
        }

    });

});
