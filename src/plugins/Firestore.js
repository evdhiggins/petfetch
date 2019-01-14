import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default ({ Vue }) => {
  const firebase = Firebase.initializeApp({
    apiKey: 'AIzaSyBv67hLR0GxtsvSyyU5EqugaZWCRnG6XtU',
    authDomain: 'dogbot-981fa.firebaseapp.com',
    databaseURL: 'https://dogbot-981fa.firebaseio.com',
    projectId: 'dogbot-981fa',
    storageBucket: 'dogbot-981fa.appspot.com',
    messagingSenderId: '118515953604',
  });

  const firestore = firebase.firestore();

  // apply necessary option settings
  firestore.settings({
    timestampsInSnapshots: true,
  });

  Vue.prototype.$db = firestore;
};
