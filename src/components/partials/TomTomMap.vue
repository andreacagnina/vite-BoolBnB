<script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {
    props: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        // `map` viene dichiarato come variabile locale non reattiva
        let map = null;

        const initializeMap = () => {
            if (!map) {
                // Controllo per evitare l’inizializzazione multipla della mappa
                map = tt.map({
                    key: 'N4TIi8FzWNZv1sUqEUsREdKHYaG6HhSU', // La tua chiave API TomTom
                    container: 'map',  // L'id del div in cui verrà mostrata la mappa
                    center: [props.long, props.lat],
                    zoom: 17,
                });

                // Aggiunta del marker alle coordinate specificate
                new tt.Marker()
                    .setLngLat([props.long, props.lat])
                    .addTo(map);
            }
        };

        // Inizializzazione della mappa solo dopo il montaggio del componente
        onMounted(() => {
            if (props.lat && props.long) {
                initializeMap();
            }
        });
    }
};
</script>

<template>
    <!-- Assicurati che il div `map` abbia uno stile che gli dia un'altezza definita -->
    <div id="map" class="rounded-4" style="height: 500px; width: 100%;"></div>
</template>

<style lang="scss" scoped>
#map {
    height: 100%;
    width: 100%;
}
</style>
