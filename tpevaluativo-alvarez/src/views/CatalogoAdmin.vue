<template>
    <div>
        <h3>vista Catalogo Admin</h3>

        <CatalogoAdminForm/> 

    </div>
    
</template>

<script>
import CatalogoAdminForm from '@/components/CatalogoAdminForm.vue'
export default {
    name: 'CatalogoAdmin',
    components:{
        CatalogoAdminForm
    }
}
</script>