//= require tether.min
//= require drop.min
//= require tooltip.min
//= require 'mailto'
//= require medium-editor.min


(function (window, document, undefined) {
    window.onload = function windowLoad() {
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
        var editor = new MediumEditor('.medium-editable', {
          targetBlank: true,
          extensions: {
            'imageDragging': {}
          },
          toolbar: {
            buttons: ['bold', 'italic', {
              name: 'anchor',
              contentDefault: '<b>Link</b>'
            }],
            align: 'left',
            static: true,
            relativeContainer: $('#organization_description_input, #event_description_input').prev()[0]
          },
          placeholder: false
        })
        $(".medium-editor-toolbar").insertAfter($('#organization_description_input, #event_description_input').prev())
    };
}(window, document));
