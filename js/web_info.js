const title = "Test";
const logo = "Machine Test"
let theme = "dark";

$('body').addClass(theme)
let theme_icon = ``;
if(theme == "dark"){
    theme_icon = `<i class="fa fa-moon" id="toggle-theme"></i>`;
}
else{
    theme_icon = `<i class="fa fa-sun" id="toggle-theme"></i>`;
}
$('.theme').html(theme_icon)

// Set Logo
$('#logo').html(logo)

// Set Title
document.title = title;



