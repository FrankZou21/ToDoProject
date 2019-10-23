const renderList = function (list) {
  $('.listContainer').empty();
  for (let item of items) {
    let output = createElement(list);
    $(`.listContainer`).prepend(output);
  }
};

const loadList = function (data) {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function (res) {
      renderList(res);
    })
};

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// Hit "Enter" to submit form

const enterSubmit = function(){
var input = document.getElementById("navbutton");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("navbutton").click();
  }
});

}

// Checkbox confirmation, and space for notes

const doalert = function(checkboxG1) {
  if (checkboxG1.checked) {
    alert ("Great! You've done this one!");
  } else {
    alert ("There must be a mistake, this shouldn't come up.");
  }
}


