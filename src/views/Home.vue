<template>
    <div>
        <h1>Protected View</h1>
        {{ user }}
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Home',
    computed: {
        ...mapState(['user'])
    }
}
</script>