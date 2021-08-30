global.firebase = {
  auth: () => ({
    // signOut: () => {},
    GoogleAuthProvider: () => {},
    FacebookAuthProvider: () => {},
    signInWithEmailAndPassword: () => {},
    createUserWithEmailAndPassword: jest.fn(() => new Promise((resolve, reject) => {
      resolve({
        email: 'pepita@gmail.com',
        password: '123456',
      });
      reject();
    })),
  }),
  firestore: () => {},
};
