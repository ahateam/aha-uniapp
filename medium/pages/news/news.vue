<template>
	<view>
		<loading-icons></loading-icons>
		<Loading></Loading>
	</view>
</template>

<script>
	import LoadingIcons from '@/components/Loading/LoadingIcons.vue'
	import Loading from '@/components/Loading/Loading.vue'

	export default {
		components: {
			LoadingIcons,
			Loading
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
