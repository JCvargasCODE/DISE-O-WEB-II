// 1. Capturamos el checkbox del switch y revisamos si ya existe un tema guardado
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// 2. Si existe un tema guardado en localStorage, lo aplicamos al cargar la página
if (currentTheme) {
    // Ponemos el atributo data-theme en <html>
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Si el tema guardado era oscuro, marcamos el checkbox como activado
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// 3. Función que cambia entre modo claro ↔ oscuro
function switchTheme(e) {
    if (e.target.checked) {
        // Usuario activó el switch → activar modo oscuro
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Guardamos preferencia
    } else {
        // Usuario desactivó → modo claro
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// 4. Escuchamos el evento del switch
toggleSwitch.addEventListener('change', switchTheme, false);
