<template>
  <div class="hello">
      <b><i><p style="color: orange;">Mark Sheet form</p></i></b>
      <table >
    <th>Name</th>
    <th>Register Id</th>
    <th>Tamil</th>
    <th>English</th>
    <th>Maths</th>
    <th>Science</th>
    <th>Social</th>
    <th>Total</th>
    <th>Grade</th>
    <th>Action</th>
    <tr v-for="details in datas" :key="details.id">
      <td>{{ details.name}}</td>
      <td >{{ details.id }}</td>
      <td >{{ details. tamil}}</td>
      <td >{{ details.eng }}</td>
      <td >{{ details.maths }}</td>
      <td >{{ details.sci}}</td>
      <td >{{ details.soc }}</td>
      <td>{{ details.total }}</td>
      <td><span v-if="details.total>450" style="color: green;">A GRADE</span>
      <span v-else-if="details.total>400 && details.total<450" style="color: rgb(86, 116, 40);">B GRADE</span>
    <span v-else-if="details.total>350 && details.total<400" style="color: aqua;">C GRADE</span>
  <span v-else style="color: red;">D GRADE</span></td>

      <td><button @click="edit(details)" style="background-color: aliceblue;">edit</button>
      <button @click="deleteac(details)">delete</button>
      </td>
    </tr>
</table>
<button ><router-link to="/" >Add students</router-link></button>
  </div>
</template>
<script>
import stuform from './stuform.vue'
import axios from 'axios';
export default {
  name: 'stutable',
  components:{
    stuform
  },
  data(){
      return{
     datas:[],
  }
},
mounted(){
this.getdata()
  },
  methods:{
     async getdata(){
      debugger
          const response=await axios.get("http://localhost:4000/posts");
          debugger
          this.datas=response.data
      },
      async deleteac(post)
      {
        alert("Data removed successfully")
        await  axios.delete(`http://localhost:4000/posts/${post.id}`,{data:post})
          .then(response=>{
              console.log('post delete:',response.data)
             this.getdata()
          })
      },
      edit(details){
        alert("Take me to Edit Changes")
        debugger
        const studentId =details.id;
  const queryParams = { id: studentId };
  this.$router.push({ name: 'stuform', query: queryParams });
      }
}
}
</script>
<style scoped>
label{
     padding: auto;
   }
   table {
border-collapse: collapse;
border-spacing: 0;
width: 100%;
border: 1px solid #ddd;
color:black;

}
th, td {
text-align: left;
padding: 8px;
border:1px solid black;
font-family: bold
;
}
tr{background:#fff;}
th{
  background-color:#ea9f28;
}
tr:nth-child(even){background-color: #deb66d}
button{
  display: flex;
  justify-content:space-between;
  margin: 10px;
  background-color: #ea9f28;
  border-radius: 10px;
  padding: 5px;
}
</style>