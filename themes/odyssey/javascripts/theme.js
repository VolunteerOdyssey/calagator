//= require tether.min
//= require drop.min
//= require tooltip.min
//= require jquery.dotdotdot.min

//= require 'mailto'


$(function () {

    /* Search Form */
    $(".js-search-button").click(function (e) {
        e.preventDefault();
        $(".js-search").toggleClass("is-hidden");
    });

    $(".js-search-close").click(function (e) {
        e.preventDefault();
        $(".js-search").toggleClass("is-hidden");
    });

    $(".Search--searchOption").click(function () {
        var placeholderValue = $(this).attr("data-placeholder"),
            actionValue = $(this).attr("data-action");

        $(".js-search-input").attr("placeholder", placeholderValue);
        $(".js-search-form").attr("action", actionValue);

        $(".Search--searchOptionChecked input").removeAttr("checked");
        $(".Search--searchOptionChecked").removeClass("Search--searchOptionChecked");

        $(this).addClass("Search--searchOptionChecked");
        $(this).children("input").prop("checked", "checked");
    });
    /* End Search Form */

    $(".js-event-title").dotdotdot({
        watch: true
    });

});