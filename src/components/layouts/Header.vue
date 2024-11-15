<script>
import { store } from '../../store';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    name: 'Header',
    setup() {
        const route = useRoute();
        const searchQuery = ref('');
        const suggestions = ref([]);
        const showSuggestions = ref(false);
        const TOMTOM_API_KEY = 'Kk87PKMPOPLJLWGTTGUP57nMaGxn8A1b';

        // Controllo se la route attiva è 'homepage'
        const isHomepage = computed(() => route.name === 'homepage');

        const fetchAddressSuggestions = async () => {
            if (searchQuery.value.length > 2) {
                try {
                    const response = await axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(searchQuery.value)}.json`, {
                        params: {
                            key: TOMTOM_API_KEY,
                            countrySet: 'IT',
                            typeahead: true,
                            limit: 5
                        }
                    });
                    suggestions.value = response.data.results.map(result => ({
                        address: result.address.freeformAddress,
                        position: result.position
                    }));
                    showSuggestions.value = suggestions.value.length > 0;
                } catch (error) {
                    console.error('Errore nel recupero dei suggerimenti degli indirizzi:', error);
                }
            } else {
                suggestions.value = [];
                showSuggestions.value = false;
            }
        };

        const selectSuggestion = (suggestion) => {
            searchQuery.value = suggestion.address;
            store.searchTerm = suggestion.address;
            store.latitude = suggestion.position.lat;
            store.longitude = suggestion.position.lon;
            showSuggestions.value = false;
            onSearch();
        };

        const onSearch = () => {
            store.current_page = 1;
        };

        const handleClickOutside = (event) => {
            const searchBox = document.querySelector('.search-box');
            if (searchBox && !searchBox.contains(event.target)) {
                showSuggestions.value = false;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            store,
            searchQuery,
            suggestions,
            showSuggestions,
            fetchAddressSuggestions,
            selectSuggestion,
            onSearch,
            isHomepage
        };
    }
};
</script>

<template>
    <header class="app-header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-hide col-md-4">
                    <router-link to="/"><img class="logo" src="../../../public/logo.png" alt="Logo"></router-link>
                </div>

                <div class="col-sm-12 col-md-4">
                    <div v-if="isHomepage" class="search-box">
                        <button class="btn-search"><i class="fas fa-search"></i></button>
                        <input 
                            v-model="searchQuery" 
                            @input="fetchAddressSuggestions" 
                            @keyup.enter="onSearch" 
                            placeholder="Search by city or address..." 
                            class="input-search" 
                        />
                        <div v-if="showSuggestions" class="suggestions-box">
                            <ul>
                                <li v-for="(suggestion, index) in suggestions" :key="index" @mousedown.prevent="selectSuggestion(suggestion)">
                                    {{ suggestion.address }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-sm-hide col-md-4 col-lg-4 justify-content-end">
                    <a :href="`${store.clientUrl}/login`">Login</a>
                    <a :href="`${store.clientUrl}/register`">Register</a>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    padding-top: 20px;

    .col-sm-12 {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        .search-box {
            width: fit-content;
            height: fit-content;
            position: relative;

            .suggestions-box {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                border: 1px solid #ccc;
                border-radius: 5px;
                z-index: 1000;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            }

            .suggestions-box ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .suggestions-box li {
                padding: 8px 12px;
                cursor: pointer;
            }

            .suggestions-box li:hover {
                background-color: #f0f0f0;
            }
        }

        .input-search {
            height: 50px;
            width: 50px;
            border-style: none;
            padding: 10px;
            font-size: 18px;
            outline: none;
            border-radius: 25px;
            transition: all .5s ease-in-out;
            background: linear-gradient(45deg, #49919d, #84a59d);
            padding-right: 40px;
            color: #f7ede2;
        }

        .input-search::placeholder {
            color: rgba(255, 255, 255, .5);
            font-size: 18px;
            font-weight: 100;
        }

        .btn-search {
            width: 50px;
            height: 50px;
            border-style: none;
            font-size: 20px;
            font-weight: bold;
            outline: none;
            cursor: pointer;
            border-radius: 50%;
            position: absolute;
            right: 0px;
            color: #f7ede2;
            background-color: transparent;
            pointer-events: painted;

            &:hover {
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }
        }

        .btn-search:focus~.input-search {
            width: 450px;
            border-radius: 0px;
            background: transparent;
            border-bottom: 1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }

        .input-search:focus {
            width: 450px;
            border-radius: 0px;
            background: transparent;
            border-bottom: 1px solid #f7ede2;
            transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
        }
    }

    .col-md-4 {
        display: flex;
        align-items: center;
        padding: 0px 50px;

        .logo {
            width: 100px;
            height: 67px;
            cursor: pointer;
            &:hover {
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }
        }
    }

    .col-lg-4 {
        display: flex;
        align-items: center;

        a {
            color: #f7ede2;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2rem;
            margin: 0px 20px;

            &:hover {
                background: linear-gradient(45deg, #f6bd60, #ce6a6c);
                background-clip: text;
                color: transparent;
                transform: scale(1.15);
                transition: all 0.3s ease-in-out;
            }
        }
    }
}

@media (max-width: 767px) {
    .col-sm-hide {
        display: none !important;
    }

    .search-box .btn-search:focus~.input-search,
    .search-box .input-search:focus {
        width: 450px !important;
        border-radius: 0px;
        background-color: transparent;
        border-bottom: 1px solid #f7ede2;
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    .search-box .btn-search:focus~.input-search,
    .search-box .input-search:focus {
        width: 300px !important;
        border-radius: 0px;
        background-color: transparent;
        border-bottom: 1px solid #f7ede2;
        transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    }
}
</style>
