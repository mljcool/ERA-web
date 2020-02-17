export const hrsList = () => {
    const hrs = [{ hours: "1hr" }];
    for (let index = 2; index < 16; index++) {
        hrs.push({ hours: `${index}hrs` });
    }
    for (let mins = 2; mins < 50; mins += 3) {
        hrs.push({ hours: `${mins}mins` });
    }
    hrs.push({ hours: `10-20mins` });
    hrs.push({ hours: `20-30mins` });
    hrs.push({ hours: `30-40mins` });

    return hrs;
};
