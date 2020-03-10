<template>
  <div>
    <div class="topnav">
      <span @click="openNav">
        <i class="fa fa-bars icon"></i>
      </span>
      <a href="http://nevtop.in/" class="logo">
        <img src="@/assets/nevtop.png" />
      </a>
      <router-link :to="{name: 'Logout', params: { logout:'true'}}" class="link">Logout</router-link>
      <router-link to="home" class="link">Home</router-link>
    </div>
    <div id="myNav" class="overlay">
      <div class="closebtn" @click="closeNav">&times;</div>
      <div class="overlay-content">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openNav: function () {
      document.getElementById('myNav').style.width = '30%'
    },
    closeNav: function () {
      document.getElementById('myNav').style.width = '0%'
    }
  }
}
</script>

<style scoped>
.topnav {
  overflow: hidden;
}

img {
  width: 148px;
  scale: 1.5;
}

.topnav .icon {
  font-size: 40px;
  color: black;
  margin: 5px;
  border: 2px solid #008cba;
  padding: 5px 15px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.topnav .icon:hover {
  background-color: #008cba;
  color: white;
}

.topnav .logo {
  left: 35%;
  right: 50%;
  position: relative;
  top: 10px;
}

.topnav .link {
  float: right;
  display: block;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  margin: 5px;
  border: 2px solid #008cba;
  transition-duration: 0.4s;
  cursor: pointer;
}

.topnav .link:hover {
  background-color: #008cba;
  color: white;
}

.overlay {
  height: 100%;
  width: 0%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  overflow-y: hidden;
  transition: 0.5s;
}

.overlay-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.overlay a {
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

.overlay a:hover,
.overlay a:focus {
  background-color: #008cba;
}

.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 40px;
  margin: 10px;
  color: #fff;
  cursor: pointer;
}
</style>
