# Tueble - A Vuejs table component

> Work in progress!

## Props

### Tueble (Root Table Component)

| Prop               | Required? | Default Value | Description                                                       |
| ------------------ | --------- | ------------- | ----------------------------------------------------------------- |
| data               | Yes       | --            | Data that will be used to render the table                        |
| default-sort-by    | No        | --            | Initial order of the table                                        |
| default-sort-order | No        | asc           | Initial sort order. `asc` for ascending and `desc` for descending |
| table-class        | No        | --            | Classes that will be added to the table                           |

### Column Component

| Prop                | Required? | Default Value | Description                                                                          |
| ------------------- | --------- | ------------- | ------------------------------------------------------------------------------------ |
| show                | No        | --            | Sets which object's property to display. Must be provided if `index` prop is `false` |
| sortable            | No        | `true`        | Sets the column as sortable                                                          |
| label               | Yes       | --            | Sets the text of the column header                                                   |
| index               | No        | `false`       | If `true` column will show row number                                                |
| column-class        | No        | --            | Classes that will be added to column                                                 |
| column-header-class | No        | --            | Classes that will be added to column header                                          |
