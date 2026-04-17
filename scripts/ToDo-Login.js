function LoginUser(event){
    event.preventDefault();

    const email=document.querySelector('.email').value;
    const password=document.querySelector('.password').value;


    const users=JSON.parse(localStorage.getItem('users'))|| [];

    const user=users.find(user=> user.email===email && user.password===password);

    if(!user){
        alert(`No user found with this email
            Register First!`);
        return;
    }
    
    localStorage.setItem('currentUser',JSON.stringify(user));
    alert('Login Successfull');
    window.location.href="ToDo-Body.html";

}
