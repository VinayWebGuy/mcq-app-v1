
$('#toggle-theme').on('click', function () {
    $('#toggle-theme').toggleClass('fa-moon')
    $('#toggle-theme').toggleClass('fa-sun')
    $('body').toggleClass('dark')
    $('body').toggleClass('light')


})
$('input').attr("autocomplete", "off");


let time = "30:00";
let started = false;
function setTime() {
    $('.timer').html(time);
}
let timerTimeoutId;
function timer() {
    let timerElement = $(".timer");
    function updateTimer() {
        var timeArray = time.split(":");
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        var totalMinutes = hours * 60 + minutes;
        if (totalMinutes < 1) {

            timerElement.removeClass("red orange");
            submitResults();
        } else if (totalMinutes <= 3) {
            timerElement.addClass("red");
            timerElement.removeClass("orange");
        } else if (totalMinutes <= 10) {
            timerElement.addClass("orange");
            timerElement.removeClass("red");
        }
        else {
            timerElement.removeClass("red orange");
        }
        timerElement.text(
            String(Math.floor(totalMinutes / 60)).padStart(2, "0") +
            ":" +
            String(totalMinutes % 60).padStart(2, "0")
        );
        totalMinutes--;
        if (totalMinutes >= 0) {
            hours = Math.floor(totalMinutes / 60);
            minutes = totalMinutes % 60;
            time = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
            timerTimeoutId = setTimeout(updateTimer, 1000);
        } else {
            timerElement.text("Stop!");
        }
    }
    updateTimer();
}
function showPopup(heading, content, iconClass) {
    started = false;
    $('.timer').removeClass('on')
    $('.block').addClass('yes');
    $('#user-msg-heading').html(heading)
    $('#user-msg-content').html(content)
    $('#user-msg-icon').addClass(iconClass)
}
function submitResults() {
    let heading = "Oops! Time Expired";
    let content = "You result has been submitted automatically. Kindly wait for the response.";
    let icon = "fa-exclamation-circle";
    showPopup(heading, content, icon)
    let results = [];
    for (let i = 0; i < ques.length; i++) {
        results.push(ques[i].selected);
    }
    console.log(results);
}
function submitTest(){
    let heading = "Wohoo! Your test has been submitted";
    let content = "Your have successfully submitted the test. Kindly wait for the response.";
    let icon = "fa-check";
    showPopup(heading, content, icon)
    let time = $(".timer").html();
    let results = [];
    for (let i = 0; i < ques.length; i++) {
        results.push(ques[i].selected);
    }
    console.log(results, time);
}
function stopTimer() {
    clearTimeout(timerTimeoutId);
}
function openFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            resetTest("fullscreen");
        }
    }
    $(document).on('fullscreenchange mozfullscreenchange webkitfullscreenchange msfullscreenchange', handleFullscreenChange);
}
let index = 0;
$('#register-form').on('submit', function (e) {
    e.preventDefault()
    $('.register').addClass('hide')
    $('#questions').removeClass('hide')
    timer();
    renderQues(index);
});
$('#start-test').on('click', function () {
    timer();
    openFullscreen()
    renderQues(index);
    started = true;
    $('.timer').addClass('on')
})
function renderQues(ind) {
    let index = ind + 1;
    let _ques = `Q${index}. ${ques[ind].question}`
    let options = ques[ind].options
    let selected = ques[ind].selected;
    let disabled = '';
    if (selected == 0) {
        disabled = "disabled";
    }
    let _options = '';
    for (let i = 0; i < options.length; i++) {
        if (selected == (i + 1)) {
            _options += `<label for="${index}.${i + 1}"><input checked value="${i + 1}" name="option" type="radio" id="${index}.${i + 1}"> <span class="gen ques-gen">${options[i]}</span></label>`
        }
        else {
            _options += `<label for="${index}.${i + 1}"><input value="${i + 1}" name="option" type="radio" id="${index}.${i + 1}"> <span class="gen ques-gen">${options[i]}</span></label>`
        }
    }
    let _buttons = '';
    if (ind == 0) {
        _buttons += `<div class="buttons next">
        <button class="nextBtn" ${disabled} onClick="nextQues(${ind + 1})">Next</button>
       </div>`
    }
    else if (ind == ques.length - 1) {
        _buttons += `<div class="buttons">
        <button class="prevBtn" onClick="prevQues(${ind - 1})">Previous</button>
        <button class="nextBtn submitBtn" ${disabled} onClick="submitTest()">Submit</button>
       </div>`
    }
    else {
        _buttons += `<div class="buttons">
        <button onClick="prevQues(${ind - 1})">Previous</button>
        <button class="nextBtn" ${disabled} onClick="nextQues(${ind + 1})">Next</button>
       </div>`
    }
    let myQueston = `<div class="question">
   <h3>${_ques}</h3>
   ${_options}
    ${_buttons}
</div>`
    $('#questions').html(myQueston);
    $('input[type="radio"]').on('change', function () {
        $('.nextBtn').prop('disabled', false)
        let val = $(this).val()
        ques[ind].selected = val
    })

    function updatePageList(){
        let q = ``;
        for (var i = 1; i <= ques.length; i++) {
            if(i == index){
                q += `<span class="ques-no active" ques-id=${i}>${i}</span>`
            }
            else{
                q += `<span class="ques-no" ques-id=${i}>${i}</span>`
            }
        }
        $('.ques-nos').html(q)
    }
    // updatePageList();
}
function nextQues(id) {
    renderQues(id);
}
function prevQues(id) {
    renderQues(id);
}
$(function () {
    $(".draggable").draggable({
        containment: "window" // Restrict to the viewport
    });
});
function resetTest(type) {
    if (started) {
        
        let heading = "";
        let content = "";
        if (type == "fullscreen") {
            heading = "Oops! Test has been reset."
            content = "Your test has been reset becuase you minimized the page size."
        }
        else if (type == "pageout") {
            heading = "Oops! Test has been reset."
            content = "Your test has been reset becuase you moved out of the page."
        }
        let icon = "fa-exclamation-circle";
        showPopup(heading, content, icon)
        index = 0;
        time = "30:00";
        stopTimer();
        let buttonHtml = `<div class="start-test-box"><button type="button" id="start-test">Start Test</button> <div class="note">
        <b>Note</b>
        <ul>
            <li>There are 50 multiple-choice questions, and each question has four options.</li>
            <li>There will be a timer on the screen. As soon as you run out of time, the test will be automatically saved.</li>
            <li>You can't move to the next question without attempting the current one.</li>
            <li>You can move to previous questions and can also update your answers.</li>
            <li>The test will be in fullscreen mode.</li>
            <li>The test will be reset in the following cases: 
                <ul>
                    <li>If you try to exit fullscreen mode.</li>
                    <li>If you try to navigate away from the test.</li>
                    <li>If you try to inspect the page.</li>
                </ul>
            </li>
        </ul>
    </div></div>`;
        $('#questions').html(buttonHtml)
        setTime();
        $('#start-test').on('click', function () {
            timer();
            openFullscreen()
            renderQues(index);
            started = true;
            $('.timer').addClass('on')
        })
        $('.timer').removeClass("red orange");
    }
}

function resetJS() {
    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        }
        else if (event.ctrlKey) {
            return false;
        }
        else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }
        else if (event.ctrlKey && event.shiftKey && event.keyCode == 74) {
        }
        else if (event.ctrlKey && event.keyCode == 85) {
        }
    });
}
function pageOut() {
    document.onvisibilitychange = function () {
        if (started) {
            if (document.visibilityState === 'hidden') {
                resetTest("pageout");
                document.title = "Test has been reset"
            }
            else if (document.visibilityState === 'visible') {
                document.title = logo
            }
        }
    }

}

pageOut();
// resetJS();
setTime();