liff.init({ liffId: '1656905982-G3NEEoYZ' });
function login() {
  localStorage.setItem('login', true);
  document.getElementById('show').style.display = 'none';
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  }
}

window.onload = () => {
  if (localStorage.getItem('login')) {
    document.getElementById('show').style.display = 'none';
  } else {
    if (!liff.isLoggedIn()) {
      document.getElementById('show').style.display = 'block';
    } else {
      window.location = 'form.html';
    }
  }
};
