// YYYY-MM-DD
export const DateFormat = (originalDate) => {
    if(!originalDate) return originalDate;
    
    return originalDate.split("T")[0];
};