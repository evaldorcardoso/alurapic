<template>
    <button class="button" :class="buttonStyle" :type="type" @click="fireAction()">{{ caption }}</button>
</template>
<script>
export default {

   props: { 
       type: {
           required: true,
           type: String
        },
        caption: {
            required: true,
            type: String
        },
        confirm: Boolean,
        bstyle: String
   },
   methods: {
    fireAction() {
        if(this.confirm){
            if(confirm('Confirma ação?')){
                this.$emit('activeButton');
            }
            return;
        }
        this.$emit('activeButton');
    }
   },
   computed: {
       buttonStyle(){
           if(this.bstyle == 'default' || !this.bstyle) return 'button-default';
           if(this.bstyle == 'danger') return 'button-danger';            
       }
   }
}
</script>    

<style scoped lang="sass">
    
    @import './Button.scss';

</style>