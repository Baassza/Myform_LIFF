liff.init({ liffId: '1656905982-G3NEEoYZ' });
function login() {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  }
}

if (liff.isLoggedIn()) {
  document.getElementById('carouselExampleSlidesOnly').style.display = 'none';
  window.location = './form.html';
}
