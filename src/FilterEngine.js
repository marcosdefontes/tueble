class FilterEngine {
    filterArray(array, sortBy, sortOrder, textFilters, domainFilters) {
        if (sortBy) {
            array = array.slice().sort(function (a, b) {
                a = a[sortBy];
                b = b[sortBy];
                return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
            });
        }

        let rowId = 0;
        array = array.map(row => {
            row._id = rowId++;
            return row;
        });

        return array;
    }

}

export default new FilterEngine();