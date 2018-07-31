export default {
    functional: true,
    props: ['column', 'rowData', 'rowIndex'],

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
        data.domProps.innerHTML =
            props.column.index ?
            props.rowIndex + 1 : props.rowData[props.column.show];

        return createElement('td', data);
    },
}