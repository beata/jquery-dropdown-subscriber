# Dropdown Subscriber

Any input element have subscribed to the changes of dropdown list, it's value will be set to the selected option's [data-publish-value] when the dropdown list changed.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/beata/jquery-dropdown-subscriber/master/dist/jquery.dropdown-subscriber.min.js
[max]: https://raw.github.com/beata/jquery-dropdown-subscriber/master/dist/jquery.dropdown-subscriber.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.dropdown-subscriber.min.js"></script>
```

## Examples

```html
<select id="dropdown" name="dropdown">
  <option value="">Please Select</option>
  <option value="1" data-publish-value="10" selected="selected">A</option>
  <option value="2" data-publish-value="20">B</option>
  <option value="3" data-publish-value="30">C</option>
</select>

<input type="text" id="input" name="input" value="10"
  data-dropdown-subscriber="#dropdown" />
```
