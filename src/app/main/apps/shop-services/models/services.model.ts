import { FuseUtils } from "@fuse/utils";

export class IServicesModel {
    id: string;
    key: string;
    name: string;
    category: number;
    price: number;
    mechanic: string;
    active: boolean;
    description: string;
    uid: string;
    categoryByname?: string;
    estimatedTime: string;
    status: boolean;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product) {
        {
            this.id = product.id || FuseUtils.generateGUID();
            this.key = product.key || "";
            this.name = product.name || "";
            this.category = product.category || "";
            this.price = product.price || "";
            this.mechanic = product.mechanic || "";
            this.description = product.description || "";
            this.active = product.active || false;
            this.uid = product.uid || "";
            this.categoryByname = product.categoryByname || "";
            this.status = product.status || false;
        }
    }
}
