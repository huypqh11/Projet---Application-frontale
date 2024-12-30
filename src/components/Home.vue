<template>
    <div id="title">
        <p>TPA52</p>
        <p v-for="personne in this.groupe">
        {{ personne }}
        </p>

        <router-link to="/vng">
            <input id="idButton" type="button" value="Start">
        </router-link>

        <router-link to="/statistics">
            <input id="idButton" type="button" value="Statistiques">
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Home", 
    data: function(){
        return{
            groupe: ['Quang Huy PHAM']
        }
    }
}
</script>

<style>
#title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 200px;
    color: #ffffff;
    font-family: 'Arial';
    font-size: 20px;
    background-color: #2d99ae;
}
</style>