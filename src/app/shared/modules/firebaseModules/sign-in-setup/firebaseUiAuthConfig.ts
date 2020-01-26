import { firebase, firebaseui } from "firebaseui-angular";

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                // Forces account selection even when one account
                // is available.
                prompt: "select_account"
            }
        },
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ["public_profile", "email", "user_likes", "user_friends"],
            customParameters: {
                // Forces password re-entry.
                auth_type: "reauthenticate"
            }
        }
    ],
    tosUrl: "<your-tos-link>",
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};
