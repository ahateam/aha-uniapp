<template>
    <div>
        <div v-if="isActive =='0'">
             <choose></choose>  
        </div>
        <div v-if="isActive =='1'">
             <conversation></conversation>  
        </div>
         <div v-if="isActive =='2'">
             <message></message>  
        </div>
        <div>
               <p>
                {{JSON.stringify(userId)}}
                {{isActive}}
               </p>
        </div>
    </div>
</template>

<script>
import choose from '../components/choose'
import conversation from '../components/conversation'
import message from '../components/message'
export default {
    name:'index',
    data(){
        return{
            isActive:0,
            userId:'',

        }
    },
    components:{
        choose,
        conversation,
        message
    },
    methods:{

    },
    created(){
        if(this.$route.query.userId){
            this.userId = JSON.parse(this.$route.query.userId)
        }
        if(this.$route.query.isActive){
            this.isActive = this.$route.query.isActive
        }
    },
    mounted(){

    }

}
</script>

<style lang="scss" scoped>

</style>