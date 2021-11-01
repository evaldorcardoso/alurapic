<template>
    <img class="image-responsive" :src="url" :alt="title">
</template>

<script>

export default {
    props: ['url', 'title']
}

</script>

<style scoped>
    .image-responsive {
        width: 100%;
    }
</style>