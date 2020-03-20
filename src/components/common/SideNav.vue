<template>
    <div ref="sidenav" class="sidenav">
        <div>
            <a href="#" class="menu-item">About</a>
            <a href="#" class="menu-item">Services</a>
            <a href="#" class="menu-item">Clients</a>
            <a href="#" class="menu-item">Contact</a>
        </div>
    </div>
</template>

<script>

export default {
    
}
</script>

<style scoped>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-y: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav .menu-item {
    padding: 14px 16px;
    margin: 5px;
    text-decoration: none;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    display: block;
    transition-duration: 0.4s;
    border: 1px solid #008cba;
    cursor: pointer;
}

.sidenav .menu-item:hover {
    background-color: #008cba;
    color: white;
}
</style>
