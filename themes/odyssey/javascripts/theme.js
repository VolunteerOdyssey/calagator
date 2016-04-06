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

    function replaceSearchPlaceholderValue($field) {
        var placeholderValue = $field.attr("data-placeholder"),
            actionValue = $field.attr("data-action");

        $(".js-search-input").attr("placeholder", placeholderValue);
        $(".js-search-form").attr("action", actionValue);

        $(".Search--searchOptionChecked input").removeAttr("checked");
        $(".Search--searchOptionChecked").removeClass("Search--searchOptionChecked");

        $field.addClass("Search--searchOptionChecked");
        $field.children("input").prop("checked", "checked");
    }

    $(".Search--searchOption").click(function () {
        replaceSearchPlaceholderValue($(this));
    });
    /* End Search Form */

    replaceSearchPlaceholderValue($(".Search--searchOptionChecked"));

    $(".js-event-title").dotdotdot({
        watch: true
    });

});