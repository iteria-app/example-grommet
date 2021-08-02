export const pageByTotalAndPageSize = (pageSizeNumber: number, totalCustomers: number): number => {
    const pageNumber: number = Math.floor((totalCustomers / pageSizeNumber) - 1)
    if ((pageNumber) <= 1) {
        return 1
    }
    return pageNumber
}