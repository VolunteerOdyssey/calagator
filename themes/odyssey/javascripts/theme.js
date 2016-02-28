//= require tether.min
//= require drop.min
//= require tooltip.min
//= require jquery.dotdotdot.min

//= require 'mailto'


$(function () {

    $(".js-search-button").click(function () {
        $(".js-search").toggleClass("is-hidden");
    });

    $(".Search--searchOption").click(function () {
        var placeholderValue = $(this).attr("data-placeholder");
        $(".js-search-input").attr("placeholder", placeholderValue);
        $(".Search--searchOptionChecked input").removeAttr("checked");
        $(".Search--searchOptionChecked").removeClass("Search--searchOptionChecked");
        $(this).addClass("Search--searchOptionChecked");
        $(this).children("input").prop("checked", "checked");
    });

    $(".js-event-title").dotdotdot({
        watch: true
    });
});