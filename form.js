liff.init({ liffId: '1656905982-G3NEEoYZ' });
window.onload = () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://web-platform-a5zbpo.stackblitz.io/form.html',
    });
  } else {
    liff.getProfile().then((profile) => {
      const uid = profile.userId;
      console.log(profile);
    });
  }
};
