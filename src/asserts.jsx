export const JSJP = (data) => {
    if (Array.isArray(data)) {
        return JSON.parse(JSON.stringify(data));
    }
    else {
        return JSON.parse(JSON.stringify([data]));
    }
}
