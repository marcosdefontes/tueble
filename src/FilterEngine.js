class FilterEngine {
    filterArray(array, sortBy, sortOrder, columns, textFilters = [], domainFilters = []) {

        const filterableColumns = this.pluck(
            columns.filter(column => column.filterable), 'show');

        textFilters.filter(
                filter =>
                typeof filter.filterBy == 'string' &&
                filter.filterBy.length >= filter.filterMinSize)
            .forEach(filter => {

                array = array.filter(function (row) {
                    return Object.keys(row)
                        .filter(function (column) {
                            return filterableColumns.includes(column);
                        })
                        .some(function (key) {
                            return (
                                String(row[key])
                                .toLowerCase()
                                .indexOf(filter.filterBy) >= 0
                            );
                        });
                });
            });


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

    pluck(array, key) {
        return array.reduce(function (p, v) {
            return p.concat(v[key]);
        }, []);
    }

}

export default new FilterEngine();