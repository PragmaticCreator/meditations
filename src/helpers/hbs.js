const moment = require('moment');

module.exports = {
  formatDate: (date, format) => moment(date).format(format),
  // Truncates out body property of entry object to the specified length.
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      let newStr = str + ' ';
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = newStr.length > 0 ? newStr : str.substr(0, len);
      return newStr + '...';
    }
    return str;
  },
  stripTags: (input) => {
    // Regex looks for angled brackets in our html and strips them on display
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  // Sets our edit icon as a floating icon for the user currently logged in
  editIcon: (user, loggedUser, userId, floating = true) => {
    if (user._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/thoughts/edit/${userId}" class="btn-floating halfway-fab blue darken-4"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/thoughts/edit/${userId}" ckass="blue darken-4"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return '';
    }
  },
  // This helper property is used in the edit page to load the pre-selected status
  // I dont know how this works. Screw it!!
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      );
  },
};
