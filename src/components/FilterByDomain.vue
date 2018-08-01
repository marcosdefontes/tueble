export default {
    props: {
        filterBy: {
            required: true,
            type: Array,
            default: ''
        },
        filterColumn: {
            required: true,
            type: String,
        }
    }
}