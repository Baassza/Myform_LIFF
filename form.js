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
window.onload = () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  } else {
    liff.getProfile().then(async (profile) => {
      const uid = profile.userId;
      const data = await getData(uid)
      getForm(data)
    });
  }
};

async function getData(uid) {
  let data = [];
  const querySnapshot = await db.collection(uid).get();
  querySnapshot.forEach((doc) => {
    let row = doc.data()
    row.id = doc.id
    data.push(row);
  });
  return data
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

function deletedata(id){

}