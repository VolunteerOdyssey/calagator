//= require tether.min
//= require drop.min
//= require tooltip.min
//= require jquery.dotdotdot.min
//= require 'mailto'
//= require medium-editor.min



$(function () {

    /* Search Form */
    $(".js-search-button").click(function (e) {
        e.preventDefault();
        $(".js-search").toggleClass("is-hidden");
        setTimeout(function () {
            $(".js-search-input").focus();
        }, 100);
    });

    $(".js-search-close").click(function (e) {
        e.preventDefault();
        $(".js-search").toggleClass("is-hidden");

        setTimeout(function () {
            $(".js-search-input").blur();
        });

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

    function findTallestTr() {
		var height = 0;

		$('.event_table tr').each(function () {
			if ( $(this).height() > height) {
				height = $(this).height();
			}
		});

		return height;
	}

	var tallestHeight = findTallestTr();

	if (window.matchMedia("(min-width: 720px)").matches) {
		$('.event_table tr').not(':first').each(function () {
			$(this).height(tallestHeight + 'px');
		});
	}
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
});
