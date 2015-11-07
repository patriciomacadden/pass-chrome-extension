function appendListItem(content) {
  var li = document.createElement('li');
  if (typeof(content) == 'string') {
    li.innerHTML = content;
  } else {
    li.appendChild(content);
  }
  document.querySelector('#passwords').appendChild(li);
}

function fillInPassword() {
  var username = this.querySelector('span').innerHTML;

  $.get('http://localhost:3131/pass/' + this.dataset['path'], function(data) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, { code: fillInScript(username, data.trim()) });
    });
  });
}

function fillInScript(username, password) {
  return "var passwordInput = document.querySelector('input[type=password]');" +
    "passwordInput.value = '" + password + "';" +
    "var form = passwordInput.parentElement;" +
    "while (form.tagName != 'FORM') { form = form.parentElement; };" +
    "var usernameInput = form.querySelector('input[type=text]');" +
    "usernameInput.value = '" + username + "';" +
    "form.submit();";
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    url = url.split('/')[2].replace('www.', '');

    $.getJSON('http://localhost:3131/domain/' + url, function(data) {
      if (data.length > 0) {
        $.each(data, function(index, item) {
          var img = document.createElement('img');
          img.src = tab.favIconUrl;
          var a = document.createElement('a');
          a.href = 'javascript:;';
          a.appendChild(img);
          var span = document.createElement('span');
          span.innerHTML = item.username;
          a.appendChild(span);
          a.dataset['path'] = item.path;
          a.addEventListener('click', fillInPassword);

          appendListItem(a);
        });
      } else {
        appendListItem('There are no passwords for this website.');
      }
    }).fail(function() {
      appendListItem('passd is not running.');
    });
  });
});
