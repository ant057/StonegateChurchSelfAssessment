import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        scopes: [
          'public_profile',
          'email',
          'user_likes',
          'user_friends'
        ],
        customParameters: {
          auth_type: 'reauthenticate'
        },
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
      },
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
  };
