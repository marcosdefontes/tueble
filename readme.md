# Tueble - A Vuejs table component

> Work in progress!

## Props

### Tueble (Root Table Component)

| Prop | Required? | Default Value | Description                                |
| ---- | --------- | ------------- | ------------------------------------------ |
| data | Yes       | --            | Data that will be used to render the table |

### Column Component

| Prop        | Required? | Default Value | Description                                                                         |
| ----------- | --------- | ------------- | ----------------------------------------------------------------------------------- |
| show        | No        | --            | Sets which object's property to display. Must be provided if `index` prop is `true` |
| sortable    | No        | true          | Sets the column as sortable                                                         |
| label       | Yes       | --            | Sets the text of the column header                                                  |
| index       | No        | false         | If `true` column will show row number                                               |
| columnClass | No        | --            | Classes that will be added to column                                                |
