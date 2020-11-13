<template>
    <div>
        <div class="forgot-body"  v-show="error">
            <div class="forgot-content" id="next">
                <div class="head">
                    <h1>Password Reset</h1>
                    <hr>
                </div>
                <div class="w">
                    <label  for="username">Username:</label>
                    <input type="text" placeholder="Username" class="x" v-model="username" required>
                </div>
                <div class="z"> 
                    <label  for="email">Email:</label>
                    <input type="email" v-model="memail" placeholder="Mail ID" class="x" required>
                </div>
                <div class="button">
                    <button v-on:click="change()">Send To My Mail</button> 
                </div>    
            </div>  
        </div>
        <div class="inside-body" v-show="!error">
            <div class="inside-content">
                <p><span id="lock">&#10004; </span>CHECK YOUR MAIL</p>
            </div>
            <div class="inside-content1">
                <template id="pot"> We have sent an email to<p class="d">{{ protect_email(memail) }}</p> Please click on the link in the email to reset your password.
                If not found do check in spam , junk or other folders.</template>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function () {
        return {
            username:"",
            memail:"",
            error:true
        }
    },
    methods:{
        change:function(){
            this.error=false;
        },
        protect_email:function(user_email){
            if(user_email.length<=5){
                return "Invalid Email";
            }
            else{
                let avg, splitted, part1, part2;
                splitted = user_email.split("@");
                part1 = splitted[0];
                avg = part1.length / 2;
                part1 = part1.substring(0, (part1.length - avg));
                part2 = splitted[1];
                return part1 + "***@" + part2;
            }
        }
    }
}    
</script>

<style scoped>
*{
    margin: 0;
    box-sizing: border-box;
}
.forgot-body{
    background-color: darkgrey ;
    width: 440px;
    height: 240px;
    margin: auto;
    border-radius: 10px;
}

.forgot-content{
    text-align: center;
    width: 400px;
    padding: 25px;
    background-color: white;
    height: 220px;
    margin-top: 100px;
    margin-left: 20px;
    border: solid 2px black;
    border-radius: 10px;
}

.x{
    margin-left: 5px;
    padding: 5px;
}
.y{
    margin-left: 8px;
}
.z{
    margin-left: 38px;
    margin-top: 10px;
}
.w{
    margin-top: 8px;
}
.button button{
    margin-top: 15px;
    padding: 8px 80px ;
    background-color:lightskyblue;
    border: darkslateblue solid 2px ;
    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 20px;
}
button:hover{
    background-color: royalblue;
}
label{
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.inside-body{
    text-align: center;
    width: 500px;
    padding: 25px;
    margin: auto;
    margin-top: 50px;
    background-color:navajowhite;
    border-radius: 5px;
    border:black solid 2px;
}
#lock{
    font-size: 200%;
    color: green;
}
.inside-content p{
    font-family: sans-serif;
    font-size: 150%;
    background-color:thistle;
    padding: 8px;
    border-radius: 5px;
    border:black solid 2px;
}
.inside-content1{
    margin-top: 10px;
    border-radius: 5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.d{
    color:darkblue;
}
#pot{
    font-family: cursive;
}
</style>