(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('DropdownSubscriber', {
    setup: function () {
      this.$input = $('input[data-dropdown-subscriber]');
    }
  });

  test('backupDefaultValue', function () {
    expect(1);
    $._DropdownSubscriber.backupDefaultValue.call(this.$input.get(0));
    equal(this.$input.data('defaultValue'), this.$input.val());
  });

  test('restoreDefaultValue', function () {
    expect(1);

    this.$input.data('defaultValue', '99999');
    this.$input.val(0);

    $._DropdownSubscriber.restoreDefaultValue.call(this.$input.get(0));

    equal(this.$input.val(), '99999');
  });


  test('setValue', function () {
    expect(1);

    this.$input.val(0);

    this.$input.each( $._DropdownSubscriber.setValue(99999) );

    equal(this.$input.val(), '99999');
  });

  test('subscribe', function () {
    expect(3);

    this.$input.each( $._DropdownSubscriber.subscribe );

    var $dropdown = $(this.$input.data('dropdownSubscriber'));

    deepEqual($dropdown.data('subscribers'), [this.$input.get(0), this.$input.get(1)], 'stored subscribers on dropdown');

    ok($dropdown.hasClass('js-dropdown-subscriber-dropdown'), 'added class ".js-dropdown-subscriber-dropdown" on dropdown');
    equal(this.$input.data('defaultValue'), this.$input.val(), 'stored default value of input');
  });

  test('dropdownChange', function () {
    expect(3);

    $.dropdownSubscriber.init();

    var $dropdown = $(this.$input.data('dropdownSubscriber'));

    equal($dropdown.data('subscribers').length, 2, 'stored subscribers on dropdown');


    // change to another value
    $dropdown.val(2).trigger('change');
    equal(this.$input.val(), $dropdown.find('option:selected').data('publishValue'), 'updated input value as [data-publish-value] attribute on selected option');

    // change to default value
    $dropdown.val( $dropdown.data('defaultValue') ).trigger('change');
    equal(this.$input.val(), this.$input.data('defaultValue'), 'input restored to default value if the dropdown has been changed to its default value');

  });


  module('jQuery#dropdownSubscriber', {
    // This will run before each test in this module.
    setup: function() {
      this.$dropdown = $('#dropdown');
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.$dropdown.dropdownSubscriber(), this.$dropdown, 'should be chainable');
  });

  test('is set defaultValue', function() {
    expect(1);
    equal(this.$dropdown.dropdownSubscriber().data('defaultValue'), this.$dropdown.val(), 'should be set data-default-value');
  });


}(jQuery));
