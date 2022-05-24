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
liff.init({ liffId: '1656905982-G3NEEoYZ' });
window.onload = async () => {
  localStorage.removeItem('login');
  if (!liff.isLoggedIn()) {
    liff.login({
      //https://baassza.github.io/Myform_LIFF/
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  } else {
    const uid = await getUID();
    const data = await getData(uid);
    getForm(data);
  }
};

async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}

async function getData(uid) {
  let data = [];
  const querySnapshot = await db.collection(uid).get();
  querySnapshot.forEach((doc) => {
    let row = doc.data();
    row.id = doc.id;
    data.push(row);
  });
  return data;
}

function getForm(data) {
  const tabeldata = document.getElementById('content');
  let textHTML = '';
  let i = 1;
  data.forEach((element) => {
    textHTML += '<tr>';
    textHTML += '<th scope="row">' + i.toString() + '</th>';
    textHTML +=
      '<td>' + '<img class="imgshow" src="' + element.img + '"/></td>';
    textHTML += '<td>' + element.name + '</td>';
    textHTML += '<td>' + element.sername + '</td>';
    textHTML += '<td>' + element.gender + '</td>';
    textHTML += '<td>' + element.birthday + '</td>';
    textHTML += '<td>' + element.edu + '</td>';
    textHTML += '<td>' + element.home + '</td>';
    textHTML +=
      '<td><a class="btn btn-warning text-white" href="edit.html?id=' +
      element.id +
      '">แก้ไขข้อมูล</a>' +
      '</td>';
    textHTML +=
      '<td><a class="btn btn-danger" onclick="deletedata(\'' +
      element.id +
      '\')">ลบข้อมูล</a>' +
      '</td>';
    textHTML += '</tr>';
    i++;
  });

  tabeldata.innerHTML = textHTML;
}

async function deletedata(id) {
  Swal.fire({
    title: 'คุณต้องการลบข้อมูลนี้หรือไม่',
    icon: 'warning',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ใช่',
    denyButtonText: 'ไม่',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const defaultURL =
        'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png';
      const uid = await getUID();
      const docRef = db.collection(uid).doc(id);
      const loadrow = await docRef.get();
      const row = await loadrow.data();
      if (row.img != defaultURL) {
        const path = getPathStorageFromUrl(row.img);
        const ref = firebase.storage().ref();
        const file = ref.child(path);
        await file.delete();
      }
      await db.collection(uid).doc(id).delete();
      Swal.fire({
        title: 'การลบข้อมูล',
        text: 'การลบข้อมูลเสร็จสิ้น',
        icon: 'success',
        timer: 3000,
      }).then(function () {
        location.reload();
      });
    }
  });
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

function logout() {
  liff.logout();
  window.location = 'index.html';
}
