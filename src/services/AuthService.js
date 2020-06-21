import "firebase/auth";


class AuthService {
  constructor(firebase, onAuthStateChanged) {
    this.auth = firebase.auth();
    this.firebase = firebase;
    this.auth.onAuthStateChanged((user) => onAuthStateChanged(user));
  }

  isRegistered = async (email) => {
    //controleren of email bestaat
    const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
    return signInMethods.length === 0 ? false : true;
  };

  login = async (email, password) => {
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('user :', result)
      return result;
    } catch (error) {
      return error.code;
    }
  };

  logout = async () => {
    try {
      const result = await this.auth.signOut();
      return result;
    } catch (error) {
      return error.code;
    }
  };

  register = async (name, email, password) => {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential) {
        try {
          await userCredential.user.updateProfile({
            displayName: name,
          });
          return userCredential.user;
        } catch (error) {
          return error;
        }
      }
    } catch (error) {
      return error.code;
    }
  };
}

export default AuthService;
