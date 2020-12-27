// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBCdgKkPd16Km-C83YS-hDEp2aDMw-yNRI",
  authDomain: "docs-swagger.firebaseapp.com",
  projectId: "docs-swagger",
  storageBucket: "docs-swagger.appspot.com",
  messagingSenderId: "368457766946",
  appId: "1:368457766946:web:b27aa9dc105e31864bd27b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => console.log('usuário logado'))
    .catch(err => console.log('erro'));

  await getIdToken();
}

async function getIdToken() {
  await firebase.auth().currentUser

  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    console.log(idToken);
  }).catch(function(error) {
    console.log(error);
  });
}