<template>
    <div class="popup">
        <div class="context-card">
         <div class="cardPop">
          
              <slot name="header"></slot>
         
          <p>
              <slot name="content"></slot>
          </p>

<div>
    <slot name="footer">
    </slot>
</div>
         </div>
        </div>
        

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.popup {
    animation: 0.5s ease-in-out;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    align-content: center;
    top: 0;
    left: 0;
    z-index: 9999;
    text-align: center;
}
.context-card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    z-index: 9999;
    backdrop-filter: blur(7px);
    padding: 100Px;
    background: rgb(149 135 135 / 70%);
    border-radius: 6px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    scroll-behavior: smooth;
}
.cardPop{
  box-shadow: 0 4px 8px 0 rgba(0, 0,0, 0.2);
  background-color:whitesmoke;
 
  transition: 0.3s;
  padding: 7px;
  margin-bottom: 20px;
  width: 500px;
  height: 200px;
  text-align: center;
    float: left;
    column-gap: 12px;
   margin-left: 424px;
    margin-right: 19px;
    margin-top: 100px;
}
.cardPop:hover{
   box-shadow: 0 8px 16px 0 rgba(0, 0,0, 0.2);;
}
</style>