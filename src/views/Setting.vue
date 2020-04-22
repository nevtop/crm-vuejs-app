<template>
    <div>
        <template v-if="settingPage">
            <div v-for="(setting,index) in settings" v-bind:key="index">
                <p class="heading"><span class="heading-title">{{ setting.name }}</span></p>
                <ul class="settings-list">
                    <li v-for="item in setting.items" v-bind:key="item.id" class="settings-list-item">
                        <router-link :to="{ name : item.name}" v-on:click.native="settingPage = !settingPage" class="link">
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
            settingPage: true,
            settings : [
               {
                    name: 'USER SETTINGS', 
                    items : [
                        {
                            id: 11,
                            name: 'User',
                            icon: 'user' 
                        },
                        {
                            id: 12,
                            name: 'Role',
                            icon: 'sitemap'
                        }
                    ]
               }
            ]
        }
    },
    watch: {
        $route (to, next) {
            if(to.name === 'Setting')
                this.settingPage = true
        }
    },
    created: function () {
        if(this.$route.name !== 'Setting')
            this.settingPage = false
    }
}
</script>

<style scoped>

.heading {
    width: 100%; 
    text-align: left; 
    border-bottom: 1px solid #b3b3b2; 
    line-height: 0.1em;
    margin: 10px 0 20px;
}

.heading-title {
    background: white;
    padding: 0px 10px;
    color: #787;
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