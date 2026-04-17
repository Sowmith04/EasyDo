function RegisterUser(event){
    event.preventDefault();

    const name=document.querySelector('.name').value;
    const email=document.querySelector('.email').value;
    const password=document.querySelector('.password').value;

    if(name===''||email===''||password===''){
        alert('Please fill all the details');
        return;
    }

    let users=JSON.parse(localStorage.getItem('users'))|| [];

    const exists=users.some(user=>user.email===email);
    if(exists){
        alert(`User already Exists
            Please Login`);
            return;
    }

    const userData={
        name:name,
        email:email,
        password:password
    };

    users.push(userData);

    localStorage.setItem('users',JSON.stringify(users));
    alert('Registered Succesfully');
    window.location.href='ToDo-Login.html';
}