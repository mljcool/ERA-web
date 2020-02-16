interface IShopLocation {
    latitude: number;
    longitude: number;
}

export interface IAssistance {
    key?: string;
    myId: string;
    shopId: string;
    assistanceType: object;
    mylocation: IShopLocation;
    status: string;
    escalatedTime: string;
    note: string;
}
