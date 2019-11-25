<template>
    <div >
        conversation  
    </div>
</template>

<script>
export default {
    name:'conversation',
    data(){
        return {
            userInfo:'',
            toUserInfo:''
        }
    },
    mounted(){
            if(this.$route.query.userInfo){
                 this.userInfo =JSON.parse(this.$route.query.userInfo)
            }
    }
}
</script>
<style lang="scss" scoped>
  
</style>