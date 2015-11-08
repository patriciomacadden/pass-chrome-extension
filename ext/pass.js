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

  getText('http://localhost:3131/pass/' + this.dataset['path'], function(data) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, { code: fillInScript(username, data.trim()) });
    });
  }, null);
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

function getText(url, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      success(xhr.responseText);
    }
  };

  xhr.onerror = error;
  xhr.send();
}

function getJSON(url, success, error) {
  getText(url, function(data) {
    success(JSON.parse(data));
  }, error);
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    var url = tldjs.getDomain(tab.url);

    getJSON('http://localhost:3131/domain/' + url, function(data) {
      if (data.length > 0) {
        data.forEach(function(item) {
          var img = document.createElement('img');
          img.src = tab.favIconUrl;

          var span = document.createElement('span');
          span.innerHTML = item.username;

          var a = document.createElement('a');
          a.href = 'javascript:;';
          a.dataset['path'] = item.path;
          a.appendChild(img);
          a.appendChild(span);
          a.addEventListener('click', fillInPassword);

          appendListItem(a);
        });
      } else {
        appendListItem('There are no passwords for this website.');
      }
    }, function() {
      appendListItem('passd is not running.');
    });
  });
});
