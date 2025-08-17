import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDPSJAzfWYvzJqQzd6khW8cLx0K1kge3rk',
  authDomain: 'tentalents-fdd1d.firebaseapp.com',
  projectId: 'tentalents-fdd1d',
  storageBucket: 'tentalents-fdd1d.appspot.com',
  messagingSenderId: '620568739945',
  appId: '1:620568739945:web:12e20ba9abc1f086ae62f8',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
