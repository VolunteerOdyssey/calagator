//= require tether.min
//= require drop.min
//= require tooltip.min
//= require jquery.dotdotdot.min

//= require 'mailto'


$(function () {
    var searchButton = document.querySelector('.js-search-box');
    var searchForm = document.querySelector('.js-search-form');
    var searchInput = document.querySelector('.js-search-input');
    searchButton.addEventListener('click', function () {
        searchButton.classList.toggle('is-open');
        searchForm.classList.toggle('is-open');

        if (searchForm.classList.contains('is-open')) {
            setTimeout(function () {
                searchInput.focus();
            }, 250);
        } else {
            searchInput.blur();
        }
    });

    $(".js-event-title").dotdotdot({
        watch: true
    });
});