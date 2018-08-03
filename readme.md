# Tueble - A Vuejs table component

> Work in progress!

## Properties

### Tueble (Root Table Component)

| Property           | Required? | Default Value | Description                                                                                 |
| ------------------ | --------- | ------------- | ------------------------------------------------------------------------------------------- |
| data               | Yes       | --            | Data that will be used to render the table                                                  |
| default-sort-by    | No        | --            | Initial order of the table                                                                  |
| default-sort-order | No        | asc           | Initial sort order. `asc` for ascending and `desc` for descending                           |
| table-class        | No        | --            | Classes that will be added to the table                                                     |
| table-body-class   | No        | --            | Classes that will be added to the table body (`tbody`)                                      |
| filter-text        | No        | --            | Term used to filter the table. Applies only to columns with the filterable property enabled |
| filter-min-size    | No        | 2             | Minimal length of the filter search field to filter the table                               |
| filter-min-size    | No        | 2             | Minimal length of the filter search field to filter the table                               |

### Column Component

| Property            | Required? | Default Value | Description                                                                                                            |
| ------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| show                | No        | --            | Sets which object's property to display. Must be provided if `index` prop is `false`                                   |
| sortable            | No        | `true`        | Sets the column as sortable                                                                                            |
| filterable          | No        | `true`        | If true, the search text will be compared to the column contents                                                       |
| label               | Yes       | --            | Sets the text of the column header                                                                                     |
| index               | No        | `false`       | If `true` column will show row number                                                                                  |
| column-class        | No        | --            | Classes that will be added to column                                                                                   |
| column-header-class | No        | --            | Classes that will be added to column header                                                                            |
| highlight           | No        | `false`       | If true finds specified terms in your input text and adds HTML tag around them. Does not apply when using custom slots |

### Filter By Domain Component

| Property      | Required? | Default Value | Description                                          |
| ------------- | --------- | ------------- | ---------------------------------------------------- |
| filter-by     | Yes       | `Array`       | Set of elements to be checked in the column provided |
| filter-column | Yes       | `String`      | Name of the column to be searched for                |
