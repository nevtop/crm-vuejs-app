<template>
    <div>
        <template v-if="mainPage">
            <div v-for="(setting,index) in settings" v-bind:key="index">
                <p class="heading"><span class="heading-title">{{ setting.name }}</span></p>
                <ul class="settings-list">
                    <li v-for="item in setting.items" v-bind:key="item.id" class="settings-list-item">
                        <router-link :to="{ name : item.name}" class="link">
                            <font-awesome-icon v-bind:icon="item.icon" size="3x" transform="down-2 shrink-4"/>    
                            <label v-bind:for="item.name" class="label">{{ item.name }}</label>
                        </router-link>
                    </li>
                </ul>
            </div>
        </template>
        <router-view name="setting"></router-view>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            mainPage: true,
            settings : [
               {
                    name: 'USER SETTINGS', 
                    items : [
                        {
                            id: 11,
                            name: 'Users',
                            icon: 'user' 
                        },
                        {
                            id: 12,
                            name: 'Roles',
                            icon: 'sitemap'
                        }
                    ]
               }
            ]
        }
    }
}
</script>

<style scoped>

.heading {
    width: 100%; 
    text-align: left; 
    border-bottom: 1px solid #000; 
    line-height: 0.1em;
    margin: 10px 0 20px;
}

.heading-title {
    background: white;
    padding: 0px 10px;
}

.settings-list {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
}

.settings-list-item {
    width: 60px;
    text-align: center;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    padding: 10px;
    margin: 0 10px;
}

.link {
    text-decoration: none;
    outline: none;
}

.label {
    line-height: 2;
}

</style>