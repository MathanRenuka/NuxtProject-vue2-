<template>
  <form @submit.prevent="done">
    <div class="center">
      <i><h3 style="color: orange;">Mark Entry Form</h3></i>
     <i><b><label for="name">Student Name: </label></b></i>
      <b><input type="text" v-model="details.name" required /></b><br/>
      <i><b> <label for="id">Register Id: </label></b></i>
      <input type="text" v-model="details.id" required /><br/>
      <i><b><label for="tamil">Enter Tamil Mark: </label></b></i>
      <input type="number" v-model="details.tamil" required /><br/>
      <i><b><label for="english">Enter English Mark: </label></b></i>
      <input type="number" v-model="details.eng" required /><br/>
      <i><b><label for="maths"> Enter Math Mark: </label></b></i>
      <input type="number" v-model="details.maths" required /><br/>
      <i><b><label for="science">Enter Science Mark: </label></b></i>
      <input type="number" v-model="details.sci" required /><br/>
      <i><b><label for="social">Enter Social Mark: </label></b></i>
      <input type="number" v-model="details.soc" required />
      <b><i><p>Total Marks: {{ totalMarks}}</p></i></b>
      <button v-if="isEdit === true" @click="updatedData()">save</button>
      <button v-else @click="done"><b><i style="color: orange;">Submit</i></b></button>
    </div>
  </form>
    <popup v-if="pop==true">
      <template v-slot:header>
       <b><i><h1 style="color: green;"> SUCCESS</h1></i></b>
      </template>
      <template v-slot:content>
        <b><i><p style="color: rgb(16, 246, 8);"> Data Submitted Successfully</p></i></b>
      </template>
      <template v-slot:footer>
     <button @click="close">Close</button>

      </template>
    </popup>
  
</template>
<script>
import axios from "axios";
import popup from "./slot/popup.vue";
export default {
  name: "stuform",
  components:{popup},
  data() {
    return {
      pop:false,
      details: {
        name: "",
        id: "",
        tamil: "",
        eng: "",
        maths: "",
        sci: "",
        soc: "",
        total:''
      },

      isEdit: false,
    };
  },
  watch: {
    "details.tamil"(newVal) {
      this.details.tamil = this.validateMarks(newVal);
    },
    "details.eng"(newVal) {
      this.details.eng = this.validateMarks(newVal);
    },
    "details.maths"(newVal) {
      this.details.maths = this.validateMarks(newVal);
    },
    "details.sci"(newVal) {
      this.details.sci = this.validateMarks(newVal);
    },
    "details.soc"(newVal) {
      this.details.soc= this.validateMarks(newVal);
    },
  },
  computed: {
    totalMarks() {
      const tamil = parseInt(this.details.tamil) ||0;
      const english = parseInt(this.details.eng)||0 ;
      const maths= parseInt(this.details.maths) ||0;
      const science = parseInt(this.details.sci) ||0;
      const social = parseInt(this.details.soc) ||0;
      this.details.total=tamil + english + maths + science + social
      return this.details.total;
    }
  },
  mounted() {
    debugger;
    const subjectid =
      this.$route.query.id != "" && this.$route.query.id != null
        ? this.$route.query.id
        : "";
    if (subjectid != "") {
      this.isEdit = true;
      this.getdata(subjectid);
    }
  },
  methods: {
    close(){
      this.$router.push("/stu");
    },
    async getdata(subjectid) {
      debugger
      const response = await axios.get(
        `http://localhost:4000/posts/${subjectid}`
      );
      this. details = response.data;
    },
    validateMarks(value) {
      const enteredMarks = parseInt(value);
      if (enteredMarks > 100 ) {
        this.invalidMarks = true;
        alert("exceeded 100 so default mark 100 is added!!");
        return "100";
      }
      else if(
        enteredMarks<0){
          alert("value must not be negative")
        }
       else {
       return enteredMarks;
      }
    },
    done() {
      debugger;
       if(this.details.name==' '||this.details.id==''||this.details.tamil==''||this.details.eng==''||this.details.maths==''||this.details.sci==''||this.details.soc==''){
        alert('some datas are missing')
       }
       else{
      axios
        .post("http://localhost:4000/posts", this.details)
        .then((response) => {
          this.pop=true
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
      }
    
    },
    updatedData() {
      debugger
      if (this.details.name != "" && this.details.id != "" &&this.details.tamil != "" &&this.details.eng != "" && this.details.maths != "" &&this.details.sci!= "" &&this.details.soc != ""){
        axios.put(`http://localhost:4000/posts/${this.details.id}`,this.details);
        console.log(this.details)
        this.$router.push("/stu");
      }
      else{
          alert("some datas are missing")
      }
    },
       
    },
 
  };
</script>
<style scoped>
input {
  border: 1px solid #e3852e;
  border-radius: 4px;
  padding: 15px;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;
  margin-bottom: 15px;
  color: #101010;
  font-family: Courier New;
}
label{
  width: 158px !important;
    display: inline-block;
    text-align: left;
    vertical-align: top;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  color: black;
}
th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid black;
}
tr {
  background: #ee8e8e;
}
th {
  background-color: #b6b9ba;
}
form {
  box-sizing: border-box;
  padding: 100px;
  border-radius: 1rem;
  background-color: hsl(120, 33%, 99%);
  border: 4px solid hsl(30, 89%, 50%);
  display:flexbox;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: center;
}



</style>