/*! dropdown-subscriber - v0.1.0 - 2013-10-01
* https://github.com/beata/jquery-dropdown-subscriber
* Copyright (c) 2013 Beata Lin; Licensed MIT */
(function ($) {

  var DropdownSubscriber = {};

  if (typeof QUnit === "object") {
    $._DropdownSubscriber = DropdownSubscriber;
  }

  $.extend(DropdownSubscriber, {

    /*
    * @context: HTMLElement
    */
    backupDefaultValue: function () {
      var $element = $(this);
      $element.data('defaultValue', $element.val());
    },

    /*
    * @context: HTMLElement
    */
    restoreDefaultValue: function () {
      var $element = $(this);
      $element.val($element.data('defaultValue'));
    },

    /*
    * @returns: function in HTMLElement context.
    */
    setValue: function (newValue) {
      return function() {
        var $element = $(this);
        $element.val(newValue);
      };
    },

    /*
    * @context: [data-dropdown-subscriber]
    */
    subscribe: function () {
        var $dropdown = $($(this).data('dropdownSubscriber')),
            subscribers = $dropdown.data('subscribers') || [];
        subscribers.push(this);
        $dropdown.data('subscribers', subscribers).addClass('js-dropdown-subscriber-dropdown');
        DropdownSubscriber.backupDefaultValue.call(this);
    },
    /*
    * @context: $.fn.dropdownSubscriber
    */
    dropdownChange: function () {
      var $dropdown = $(this),
          subscribers = $dropdown.data('subscribers') || [],
          $option = $dropdown.find('option:selected');

      if ( ! subscribers.length || ! $option.length ) {
        return null;
      }

      // set original value back if there has no change.
      if ( $option.val() + '' === $dropdown.data('defaultValue') + '') {
        $.each(subscribers, DropdownSubscriber.restoreDefaultValue );
        return null;
      }

      // use new number
      $.each(subscribers, DropdownSubscriber.setValue($option.data('publishValue')) );

      return null;
    }
  });

  $.dropdownSubscriber = {

    init: function () {
      $('input[data-dropdown-subscriber], select[data-dropdown-subscriber]').
        each( DropdownSubscriber.subscribe );

      $('select.js-dropdown-subscriber-dropdown').dropdownSubscriber();
    }
  };

  $.fn.dropdownSubscriber = function () {
    return this.
      each( DropdownSubscriber.backupDefaultValue ).
      on('change.dropdownSubscriber', DropdownSubscriber.dropdownChange );
  };

  $.dropdownSubscriber.init();


}(jQuery));
