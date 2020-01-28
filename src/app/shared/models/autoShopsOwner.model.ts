interface IShopLocation {
    latitude: number;
    longitude: number;
}

export interface IAutoShopsUser {
    uid: string;
    isRegisteredShop: boolean;
    status: boolean;
    email: string;
    mainName: string;
    secondaryName: string;
    mainContact: string;
    emailAddress: string;
    secondaryContact: string;
    writtenAddress: string;
    location: any;
    functionalLocation: IShopLocation;
}
