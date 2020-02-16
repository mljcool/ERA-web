interface IShopLocation {
    latitude: number;
    longitude: number;
}

interface AssistanceTypes {
    id: number;
    label: string;
    imgSrc: string;
}

export interface IAssistance {
    key?: string;
    myId: string;
    shopId: string;
    assistanceType: AssistanceTypes;
    mylocation: IShopLocation;
    status: string;
    escalatedTime: string;
    note: string;
}
