const fuelList = [
    {
        value: "G",
        label: "Gasoline"
    },
    {
        value: "D",
        label: "Diesel"
    },
    {
        value: "E",
        label: "Ethanol"
    },
    {
        value: "LP",
        label: "Liquified Petroleum"
    },
    ,
    {
        value: "BD",
        label: "Bio-diesel"
    },
    {
        value: "CNG",
        label: "Compressed Natural Gas"
    }
];

export const fuelType = (fuels: string) => {
    return fuelList.find(fuel => fuel.value === fuels).label;
};
