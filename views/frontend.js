const btn = document.getElementById('submit');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('hello');
    const expense = document.getElementById('typeid');
    const description =document.getElementById('browserid');
    const category= document.getElementById('select');

    console.log(expense.value);
    console.log(description.value);
    console.log(category.value);

    const obj={
                  expense : expense.value,
                  description:description.value,
                  category:category.value
           }
           console.log(obj);
           const token = localStorage.getItem('token')
             axios.post("http://localhost:3000/details",obj,{headers:{"Authorization":token}})
             .then((response)=>{
                showListofRegisteredUser(response.data.data)
                console.log(response.data);
             })
             .catch((err)=>{
                // document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
                console.log(err)
             })
           localStorage.setItem(obj.description,JSON.stringify(obj))

           //clear fields 
           expense.value='';
           description.value='';
           category.value='';
})
function showListofRegisteredUser(user){
        const parentNode = document.getElementById('userlist');
        const createNewUserHtml = `<li id='${user.id}'>${user.expense} - ${user.description} - ${user.category}
                                        <button onclick=deleteUser('${user.id}')>Delete</button>
                                        <button onclick=EditUser('${user.expense}','${user.description}','${user.category}','${user.id}')>Edit</button>
                                    </li>`
        console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
        console.log(parentNode.innerHTML)
     }
     window.addEventListener('DOMContentLoaded', (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token')
            axios.get("http://localhost:3000/userinfo",{headers:{"Authorization":token}})
            .then((response)=>{
                console.log(response)
                for(let i=0;i<response.data.response.length;i++){
                    let expense =response.data.response[i].expense
                    let description =response.data.response[i].description
                    let category =response.data.response[i].category
                    let id =response.data.response[i].id

                    const parentNode = document.getElementById('userlist');
        const createNewUserHtml = `<li id='${id}'>${expense} - ${description} - ${category}
                                        <button onclick=deleteUser('${id}')>Delete</button>
                                        <button onclick=EditUser('${expense}','${description}','${category}','${id}')>Edit</button>
                                    </li>`
        console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
       console.log(parentNode.innerHTML)
                   console.log();
                }

                })
               .catch((err)=>{
                console.log(err);
               })
            })
            

    function deleteUser(userid)
    {
        const token = localStorage.getItem('token')
        axios.delete(`http://localhost:3000/delete/${userid}`,{headers:{"Authorization":token}})

        .then((response)=> 

        removeItemFromScreen(userid))
        //    console.log(response)
        .catch(err=>console.log(err))
    }

    function removeItemFromScreen(userid){
        const parentNode = document.getElementById('userlist');
        const elem = document.getElementById(userid)
        parentNode.removeChild(elem);
    }

    function EditUser(expense,description,category,id)
    {
 document.getElementById('typeid').value = expense
 document.getElementById('browserid').value= description
 document.getElementById('select').value= category

 deleteUser(id)
}

const logout = document.getElementById('logout')
 logout.addEventListener('click',()=>{
    if(confirm('ARE U SURE'))
    {
        window.location = 'login.html'
    }
 })

 document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:3000/purchase', { headers: {"Authorization" : token} });
    console.log(response);
    const options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "9663332873"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/updatepurchase',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
            
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
 }