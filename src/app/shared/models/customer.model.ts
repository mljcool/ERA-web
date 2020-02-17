export interface ICustomer {
    key: string;
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    isShopRegistered?: boolean;
    id: string;
    serverAuthCode: string;
    familyName: string;
    givenName: string;
    imageUrl: string;
    name: string;
    authentication: {
        accessToken: string;
        idToken: string;
    };
    isLogin?: boolean;
}
