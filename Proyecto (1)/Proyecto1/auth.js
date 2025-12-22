document.addEventListener('DOMContentLoaded', () => {
    let modoRegistro = false;

    const title = document.getElementById('auth-title');
    const btnAction = document.getElementById('auth-btn');
    const toggleLink = document.getElementById('toggle-auth');
    
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const btnVerPass = document.getElementById('btn-ver-pass');
    
    const errorEmail = document.getElementById('error-email');
    const errorPass = document.getElementById('error-password');

    // --- LÓGICA PARA VER CONTRASEÑA ---
    btnVerPass.addEventListener('click', () => {
        // Cambiamos el tipo de input
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);
        
        // Cambiamos el icono del ojo
        btnVerPass.classList.toggle('fa-eye');
        btnVerPass.classList.toggle('fa-eye-slash');
    });

    // --- FUNCIONES ---
    function mostrarModal(titulo, mensaje) {
        document.getElementById('modal-titulo').innerText = titulo;
        document.getElementById('modal-mensaje').innerText = mensaje;
        document.getElementById('modal-aviso').style.display = 'flex';
    }

    document.getElementById('btn-cerrar-modal').onclick = () => {
        document.getElementById('modal-aviso').style.display = 'none';
    };

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validarPassSegura = (pass) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);

    // --- CAMBIO DE MODO ---
    toggleLink.addEventListener('click', () => {
        modoRegistro = !modoRegistro;
        title.innerText = modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión';
        btnAction.innerText = modoRegistro ? 'Registrarse ahora' : 'Entrar';
        toggleLink.innerText = modoRegistro 
            ? '¿Ya tienes cuenta? Inicia sesión' 
            : '¿No tienes cuenta? Regístrate gratis';
        
        errorEmail.innerText = "";
        errorPass.innerText = "";
        // Reset del tipo de password al cambiar
        passInput.setAttribute('type', 'password');
        btnVerPass.className = 'fas fa-eye toggle-password';
    });

   // --- ACCIÓN PRINCIPAL (BOTÓN ENTRAR/REGISTRAR) ---
    btnAction.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passInput.value;
        let hayError = false;

        errorEmail.innerText = "";
        errorPass.innerText = "";

        if (!validarEmail(email)) {
            errorEmail.innerText = "❌ Email inválido";
            hayError = true;
        }

        if (modoRegistro && !validarPassSegura(password)) {
            errorPass.innerText = "❌ Mínimo 6 caracteres, letras y números";
            hayError = true;
        } else if (!password) {
            errorPass.innerText = "❌ Ingresa tu contraseña";
            hayError = true;
        }

        if (hayError) return;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (modoRegistro) {
            if (usuarios.find(u => u.email === email)) {
                mostrarModal("Error", "Este correo ya está registrado.");
                return;
            }
            
            // 1. Guardar el usuario en la base de datos local
            usuarios.push({ email, password });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            // 2. Mostrar mensaje de éxito
            mostrarModal("¡Registro Exitoso!", "Tu cuenta ha sido creada. Ahora puedes iniciar sesión con tus credenciales.");

            // 3. Cambiar automáticamente a modo Login para que el usuario ingrese
            toggleLink.click(); // Esto simula el clic en "¿Ya tienes cuenta?"
            
            // Opcional: Limpiar campos para que el usuario escriba de nuevo
            emailInput.value = "";
            passInput.value = "";

        } else {
            // Lógica de Inicio de Sesión
            const usuario = usuarios.find(u => u.email === email && u.password === password);
            if (!usuario) {
                mostrarModal("Fallo de acceso", "Correo o contraseña incorrectos.");
                return;
            }
            
            // Solo aquí se crea la sesión activa y se entra a la página
            localStorage.setItem('usuarioActivo', email);
            window.location.href = 'index.html';
        }
    });
});