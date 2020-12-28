<template>
    <div>
        <template v-if="settingPage">
            <div v-for="(setting,index) in settings" v-bind:key="index" class="setting-section">
                <p class="heading"><span class="heading-title">{{ setting.name }}</span></p>
                <ul class="settings-list">
                    <li 
                        v-for="item in setting.items"
                        v-bind:key="item.id"
                        v-on:click="openItem(item.name)"
                        class="setting-item"
                    >
                        <router-link :to="{}" class="rlink">
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
                        { id: 11, name: 'User', icon: 'user' },
                        { id: 12, name: 'Role', icon: 'sitemap' }
                    ]
               },
               {
                   name: 'PACKAGE SETTINGS', 
                    items : [
                        { id: 21, name: 'Package', icon: 'cubes' }
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
    },
    methods: {
        openItem: function (routeName) {
            this.settingPage = !this.settingPage
            this.$router.push({ name : routeName })
        }
    }
}
</script>

<style scoped>
.setting-section {
    margin-bottom: 70px;
}

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

.setting-item {
    width: 60px;
    text-align: center;
    border: 1px solid #b3b3b2;
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px;
    cursor: pointer;
}

.setting-item .rlink {
    text-decoration: none;
    outline: none;
}

.setting-item .label {
    line-height: 2;
}

</style>