liff.init({ liffId: '1656905982-G3NEEoYZ' });
window.onload = login();
const firebaseConfig = {
  apiKey: 'AIzaSyDyZrD317VqSjHEwt7TgV1G4xb66pGrVGg',
  authDomain: 'myform-liff.firebaseapp.com',
  projectId: 'myform-liff',
  storageBucket: 'myform-liff.appspot.com',
  messagingSenderId: '616881646360',
  appId: '1:616881646360:web:d36298e705ddaefaeecc6d',
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function login() {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  }
}

function disablesexform() {
  const sexvalue = document.getElementById('sexsel').value;
  const sextext = document.getElementById('sex');
  if (sexvalue === 'อื่นๆ') {
    sextext.removeAttribute('disabled');
  } else {
    sextext.value = '';
    sextext.setAttribute('disabled', 'true');
  }
}

function loadFile(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById('avatar');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

async function senddata() {
  if (vaild() === true) {
    const image = document.getElementById('upload');
    const imagename = document.getElementById('upload').files.name;
    const name = document.getElementById('name').value;
    const sername = document.getElementById('sername').value;
    const sexsel = document.getElementById('sexsel').value;
    const sex = document.getElementById('sex').value;
    const birthday = document.getElementById('birthday').value;
    const edu = document.getElementById('edu').value;
    const home = document.getElementById('home').value;
    const imageL = document.getElementById('upload').files;
    let imgURL =
      'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png';
    if (imageL.length > 0) {
      imgURL = await uploadimage(imageL[0]);
    }
    const uid = await getUID();
    db.collection(uid)
      .add({
        name: name,
        sername: sername,
        gender: sexsel === 'อื่นๆ' ? sex : sexsel,
        birthday: birthday,
        edu: edu,
        home: home,
        img: imgURL,
      })
      .then(() => {
        Swal.fire({
          title: 'การบันทึกข้อมูล',
          text: 'การบันทึกข้อมูลเสร็จสิ้น',
          icon: 'success',
          timer: 3000,
        }).then(function () {
          location.reload();
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาติดต่อผู้ดูแลระบบ',
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      timer: 3000,
    });
  }
}
function vaild() {
  const nametext = document.getElementById('name');
  const sernametext = document.getElementById('sername');
  const sexvalue = document.getElementById('sexsel');
  const sextext = document.getElementById('sex');
  const birthday = document.getElementById('birthday');
  const home = document.getElementById('home');
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

async function uploadimage(image) {
  const uid = await getUID();
  const ref = firebase.storage().ref();
  const name = getimagename() + '-' + image.name;
  const metadata = { contentType: image.type };
  const snapshot = await ref.child(`/${uid}/${name}`).put(image, metadata);
  const url = await snapshot.ref.getDownloadURL();
  return url;
}

async function getUID() {
  const profile = await liff.getProfile();
  return profile.userId;
}

function getimagename() {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
