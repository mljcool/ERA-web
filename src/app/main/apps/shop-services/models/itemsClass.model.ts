import { FuseUtils } from "@fuse/utils";

export class IProductModel {
    id: string;
    key: string;
    name: string;
    category: number;
    price: number;
    quantity: string;
    active: boolean;
    description: string;
    uid: string;

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
            this.quantity = product.quantity || "";
            this.description = product.description || "";
            this.active = product.active || false;
            this.uid = product.uid || false;
        }
    }
}
