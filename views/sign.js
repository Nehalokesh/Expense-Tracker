function signup(event){
    event.preventDefault()
    const signupDetails = {
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    console.log(signupDetails);
    axios.post("http://localhost:4000/signup",signupDetails)
    .then(result=>{
        alert("successfully sign up")
        window.location = "login.html"
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    });
    event.target.name.value="";
    event.target.email.value="";
    event.target.password.value="";
}