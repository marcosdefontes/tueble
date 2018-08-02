export default {
    functional: true,
    props: ['column', 'rowData', 'rowIndex', 'textSearch'],

    render(createElement, {
        props
    }) {
        const data = {};

        if (props.column.columnClass) {
            data.class = props.column.columnClass
        }

        if (!props.column.index && props.column.template) {
            return createElement('td', data, props.column.template(
                props.rowData
            ));
        }

        data.domProps = {};
        let highlight = function (text, query) {
            if (!query) {
                return text;
            }
            return text.toString()
                .replace(new RegExp(query, "gi"), match => {
                    return '<span class="highlight">' + match + '</span>';
                });
        }

        let innerHTML =
            props.column.index ? props.rowIndex + 1 :
            (props.column.highlight ?
                highlight(props.rowData[props.column.show], props.textSearch) :
                props.rowData[props.column.show])

        data.domProps.innerHTML = innerHTML

        return createElement('td', data);
    },
}