liff.init({ liffId: '1656905982-G3NEEoYZ' });
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
window.onload = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const uid = await getUID();
  const ref = db.collection(uid).doc(id);
  let rawdata = await ref.get();
  rawdata = rawdata.data();
  setUI(rawdata);
};

async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
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
    const output = document.getElementById('img');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
async function senddata() {
  Swal.fire({
    title: 'คุณต้องการแก้ไขข้อมูลนี้หรือไม่',
    icon: 'warning',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ใช่',
    denyButtonText: 'ไม่',
  }).then(async (result) => {
    if (vaild() === true) {
      const defaultURL =
        'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png';
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      const uid = await getUID();
      const docRef = db.collection(uid).doc(id);
      const loadrow = await docRef.get();
      const row = await loadrow.data();
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
      if (imageL.length > 0) {
        if (row.img != defaultURL) {
          const path = getPathStorageFromUrl(row.img);
          const ref = firebase.storage().ref();
          const file = ref.child(path);
          await file.delete();
          const imgname = await uploadimage(imageL[0]);
          docRef.update({ img: imgname });
        }
      }
      docRef.update({
        birthday: birthday,
        edu: edu,
        gender: sexsel === 'อื่นๆ' ? sex : sexsel,
        home: home,
        name: name,
        sername: sername,
      });
      Swal.fire({
        title: 'การบันทึกข้อมูล',
        text: 'การบันทึกข้อมูลเสร็จสิ้น',
        icon: 'success',
        timer: 3000,
      }).then(function () {
        window.location = 'form.html';
      });
    }
  });
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

function setUI(data) {
  const sexsel = document.getElementById('sexsel');
  const sextext = document.getElementById('sex');
  const keys = Object.keys(data);
  const editdata = Object.values(data);
  console.log(data.img);
  keys.forEach((e, i) => {
    try {
      document.getElementById(e).value = editdata[i];
    } catch (e) {}
  });
  document.getElementById('img').src = data.img;
  if (data.gender === 'อื่น ๆ') {
    sextext.removeAttribute('disabled');
    sextext.value = data.gender;
    sexsel.value = 'อื่นๆ';
  } else {
    sextext.setAttribute('disabled', 'true');
    for (let i = 0, j = sexsel.options.length; i < j; ++i) {
      if (sexsel.options[i].innerHTML === data.gender) {
        sexsel.selectedIndex = i;
        break;
      }
    }
  }
}

function getPathStorageFromUrl(url) {
  const baseUrl =
    'https://firebasestorage.googleapis.com/v0/b/myform-liff.appspot.com/o/';
  let imagePath = url.replace(baseUrl, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return imagePath;
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
