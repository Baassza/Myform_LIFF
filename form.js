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
window.onload =  () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  } else {
    liff.getProfile().then( (profile) => {
      const uid = profile.userId
      getForm(getData(uid));
      console.log(profile);
    });
  }
};

function getData(uid) {
  const docRef = db.collection(uid).doc("form");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(Object.values(doc.data()))
      } else {
        docRef.doc('form').set({});
        return []
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
}

function getForm(data) {
  const tabeldata = document.getElementById('content');
  let textHTML = '';
  let i = 1;
  data.forEach((element) => {
    textHTML += '<tr>';
    textHTML += '<th scope="row">' + i.toString() + '</th>';
    textHTML +=
      '<td>' + '<img class="imgshow" src="upload/' + element.img + '"/></td>';
    textHTML += '<td>' + element.name + '</td>';
    textHTML += '<td>' + element.sername + '</td>';
    textHTML += '<td>' + element.gender + '</td>';
    textHTML += '<td>' + element.birthday + '</td>';
    textHTML += '<td>' + element.edu + '</td>';
    textHTML += '<td>' + element.home + '</td>';
    textHTML +=
      '<td><a class="btn btn-warning text-white" href="edit.html?ID=' +
      element.ID +
      '">แก้ไขข้อมูล</a>' +
      '</td>';
    textHTML +=
      '<td><a class="btn btn-danger" onclick="deletedata(' +
      element.ID +
      ')">ลบข้อมูล</a>' +
      '</td>';
    textHTML += '</tr>';
    i++;
  });
  tabeldata.innerHTML = textHTML;
}
