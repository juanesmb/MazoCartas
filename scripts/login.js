/*document.getElementById('ingresar').addEventListener('click', function () {
    iniciarSesion();
});*/

function iniciarSesion()
{
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if(usuario == "admin" && contraseña=="1234")
    {
        var datos = {usuario: usuario, contraseña: contraseña};
        window.localStorage.setItem('login',JSON.stringify(datos));
        document.getElementById('loginForm').submit();
    }else{
        alert("datos ingresados incorrectos");
    }
    
}