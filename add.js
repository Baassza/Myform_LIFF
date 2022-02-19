var field = document.getElementById('birthday');

function disablesexform() {
  var sexvalue = document.getElementById('sexsel').value;
  var sextext = document.getElementById('sex');
  if (sexvalue === 'อื่นๆ') {
    sextext.removeAttribute('disabled');
  } else {
    sextext.value = '';
    sextext.setAttribute('disabled', 'true');
  }
}

function loadFile(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById('avatar');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
function senddata() {
  if (vaild() === true) {
    var image = document.getElementById('upload');
    var imagename = document.getElementById('upload').files.name;
    var name = document.getElementById('name').value;
    var sername = document.getElementById('sername').value;
    var sexsel = document.getElementById('sexsel').value;
    var sex = document.getElementById('sex').value;
    var birthday = document.getElementById('birthday').value;
    var edu = document.getElementById('edu').value;
    var home = document.getElementById('home').value;
    var imageL = document.getElementById('upload').files;
    var formdata = new FormData();
    if (imageL.length > 0) {
      formdata.append('img', image.files[0], imagename);
    }
  }
}
function vaild() {
  var nametext = document.getElementById('name');
  var sernametext = document.getElementById('sername');
  var sexvalue = document.getElementById('sexsel');
  var sextext = document.getElementById('sex');
  var birthday = document.getElementById('birthday');
  var home = document.getElementById('home');
  if (nametext.value == '') {
    return false;
  }
  if (sernametext.value == '') {
    return false;
  }
  if (sexvalue === 'อื่นๆ') {
    if (sextext.value == '') {
      return false;
    }
  }
  if (birthday.value == '') {
    return false;
  }
  if (home.value == '') {
    return false;
  }
  return true;
}
