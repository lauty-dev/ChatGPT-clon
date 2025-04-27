

document.querySelector("#stop").addEventListener("click", () => {
  document.querySelector("#input").removeAttribute("disabled");
  $("#stop").classList.add("hidden");
  $("#stop").classList.remove("flex");
  $(".run").classList.remove("hidden");
  $(".run").classList.add("flex");
  document.querySelector("#loader" + idloader).remove();
  contexto.pop();

  document.getElementById(ultima_pregunta).remove();



});



document.querySelectorAll(".aside").forEach(element => {
  element.addEventListener("click", e => {
    if (aside) {
      aside = false
      $("#des").classList.remove("hidden")
      $(".contaside").classList.remove("w-[.1px]")
      $(".contaside").classList.add("w-[300px]", "min-w-[300px]", "max-sm:w-[55%]")
      $(".ws").classList.add("hidden")
      $(".ws2").classList.add("hidden")
    } else {
      aside = true
      $("#des").classList.add("hidden")

      $(".ws").classList.remove("hidden")
      $(".ws2").classList.remove("hidden")
      $(".contaside").classList.add("w-[.1px]")
      $(".contaside").classList.remove("w-[300px]", "min-w-[300px]", "max-sm:w-[55%]")


    }
  })
});

document.querySelectorAll(".new").forEach(new_chat => {

  new_chat.addEventListener("click", e => {
    newCHAT()
  })
})
function newCHAT() {
  if (chat_property[idchat].titule === "chat nuevo") {
    actual_chat = principal;
    chat.innerHTML = ""
  } else {

    chat.innerHTML = ""
    contexto = [...instrucciones]

    idchat++
    chat_property.push(
      {
        id: idchat,
        titule: "chat nuevo",
        chatcontexto: []
      }
    )

  }
  actual_chat = idchat
  renderihistori()
}

/*
function showRegisterForm() {
document.getElementById('loginForm').classList.add('hidden');
document.getElementById('registerForm').classList.remove('hidden');
}

function showLoginForm() {
document.getElementById('registerForm').classList.add('hidden');
document.getElementById('loginForm').classList.remove('hidden');
}
*/


const renderihistori = () => {

  localStorage.setItem("idchat", idchat)
  localStorage.setItem("historial", JSON.stringify(chat_property))

  $("#history").innerHTML = ""
  for (let i = 0; i < chat_property.length; i++) {

    let text = document.createElement("p")
    text.textContent = chat_property[i].titule
    text.classList.add("p-3", "font-bold", "max-w-[100%]", "hover:bg-zinc-800", "rounded-md", "m-2", "truncate")
    $("#history").prepend(text)


    text.addEventListener("click", () => {
      chat.innerHTML = ""
      contexto = [
        ...instrucciones]
      contexto.push(
        ...chat_property[i].chatcontexto

      )
      actual_chat = chat_property[i].id
      renderpush()
    })
  }



}
function renderpush() {
  for (let i = 0; i < contexto.length; i++) {

    rendermensaje(contexto[i].content, contexto[i].role)
  }
}

function rendermensaje(sms, role) {
  if (role === "user") {



    const userMsg = document.createElement('div');
    const loadercont = document.createElement('div');
    loadercont.classList.add("w-[100%]")
    loadercont.id = "loader" + idloader;
    const loader = document.createElement('div');
    loader.classList.add("loader", "mt-7", "ml-7")
    const userText = document.createElement('p');
    userMsg.className = "w-full flex justify-end";
    if (src) {
      let image = document.createElement("img")
      image.classList.add("w-[200px]", "p-1")

      image.src = src


      userText.appendChild(image)
      src = false
    }
    let text = document.createElement("p")
    userMsg.appendChild(userText);
    userText.appendChild(text)
    text.textContent += sms;
    userText.classList.add("bg-blue-600", "text-white", "p-3", "rounded-xl", "w-fit", "max-w-[80%]", "text-wrap", "mb-2", "break-words", "wrap-break-word");

    userMsg.id = "user" + id;
    ultima_pregunta = "user" + id;

    console.log(chat_property)
    chat.appendChild(userMsg);
    loadercont.appendChild(loader);
    chat.appendChild(loadercont);
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
    $("#stop").classList.remove("hidden");
    $("#stop").classList.add("flex");
    $(".run").classList.add("hidden");
    $(".run").classList.remove("flex");
    document.querySelector("#input").setAttribute("disabled", "true");



  } else if (role === "assistant") {

    const limpio = reemplazarCierrePersonalizado(sms);
    let html = marked.parse(limpio);
    const div = document.createElement('div');
    div.classList.add("z-50")
    div.className = "w-full flex flex-col";
    div.innerHTML = `<div class="markdown text-wrap w-full  wrap-break-word">${html}</div>`;

    document.querySelector("#loader" + idloader).remove();
    idloader++
    chat.appendChild(div);
    $("#stop").classList.add("hidden");
    $("#stop").classList.remove("flex");
    $(".run").classList.remove("hidden");
    $(".run").classList.add("flex");
    document.querySelector("#input").removeAttribute("disabled");







    // Reemplazar cada bloque <pre><code> por un editor Monaco en su posición original
    const preBlocks = div.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      const code = pre.querySelector("code");
      const lang = code.className.split('-')[1] || "javascript";
      const codeText = code.textContent;

      // Capturamos el id actual para usarlo en el callback
      const currentId = id++;
      // Creamos un contenedor para el editor
      const editorContainer = document.createElement("div");
      editorContainer.classList.add("max-w-[800px]", "mx-auto", "my-2", "bg-transparent")






      const nav = document.createElement("nav");
      nav.className = "flex justify-between items-center max-w-[800px] mx-auto bg-[#2f2f2f] p-2 px-4 text-amber-50 rounded-t-[6px]";

      // Izquierda (nombre del lenguaje)
      const langDiv = document.createElement("div");
      langDiv.className = "text-amber-50";
      langDiv.textContent = lang;

      // Derecha (botones)
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "flex items-center gap-5 px-2";

      // Botón copiar
      const copyBtn = document.createElement("button");
      copyBtn.className = "flex items-center gap-1 text-[12px]";
      copyBtn.innerHTML = `
      <svg onclick="copys()" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-copy">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
      </svg>
      copiar


      `;

      copyBtn.addEventListener("click", async function copiarAlPortapapeles(text) {

        try {
          // Método moderno usando la Clipboard API
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(codeText);
            copyBtn.innerHTML = `
       
    
          <svg  xmlns="http://www.w3.org/2000/svg"  width="15"  height="15"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /><path d="M11 14l2 2l4 -4" /></svg>
        
        copiado
          `;

            setTimeout(() => {

              copyBtn.innerHTML = `
            <svg onclick="copys()" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-copy">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
              <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
            </svg>
            copiar
      
      
       
            `;

            }, 500)
          }
        } catch (err) {
          console.error('Error al copiar:', err);
          return false;
        }
      })
      //   // Botón editor
      //   const editorBtn = document.createElement("button");
      //   editorBtn.className = "flex items-center gap-1 text-[12px]";
      //   editorBtn.innerHTML = `
      //   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
      //     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      //     <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      //     <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      //     <path d="M16 5l3 3" />
      //   </svg>
      //   editor
      // `;
      //buttonContainer.appendChild(editorBtn);
      // Botón visualizar (si es HTML)
      let viewBtn = null;
      if (lang === "html") {
        viewBtn = document.createElement("button");
        viewBtn.className = "flex items-center gap-1 text-[12px]";
        viewBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-package-export">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" />
          <path d="M12 12l8 -4.5" />
          <path d="M12 12v9" />
          <path d="M12 12l-8 -4.5" />
          <path d="M15 18h7" />
          <path d="M19 15l3 3l-3 3" />
        </svg>
        <p class="truncate">Visualizar</p>
      `;


        viewBtn.addEventListener("click", () => {
          let arm = `
          ${codeText}
          <script>
        
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = e.target.getAttribute('href');

        if (href && href.startsWith('#')) { // Solo ejecuta si el href tiene #
            e.preventDefault(); // Evita la navegación estándar
            const targetId = href.substring(1); // Obtiene el ID de la sección destino
            const targetElement = document.getElementById(targetId); // Busca el elemento
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente hacia la sección
            }
        }
    });
});
          </script>
          `
          $("#priview").srcdoc = arm;

          document.querySelector(".asiderun").classList.remove("w-[0%]");
          document.querySelector(".asiderun").classList.add("w-[70%]");


          document.querySelector(".asiderun").classList.add("max-md:w-[100vw]");
          document.querySelector(".asiderun").style.transition = "width 0.5s ease-in-out";
        })

      }


      // Añadir botones al contenedor
      buttonContainer.appendChild(copyBtn);
      // 
      if (viewBtn) buttonContainer.appendChild(viewBtn);

      // Montar todo al nav
      nav.appendChild(langDiv);
      nav.appendChild(buttonContainer);

      // Insertar en el contenedor principal
      editorContainer.innerHTML = "";
      editorContainer.appendChild(nav);

      const editorBox = document.createElement("div");
      editorBox.classList.add("-z-50")
      editorBox.classList.add("max-w-[800px]", "mx-auto", "rounded-b-[15px]", "overflow-hidden")

      editorBox.id = "editor" + currentId;
      // Altura inicial mínima


      // Reemplazamos el <pre> original por el contenedor del editor
      pre.parentNode.replaceChild(editorContainer, pre);
      editorContainer.appendChild(editorBox);


      //   editorContainer.appendChild(editorBox, pre);

      require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs' } });
      require(['vs/editor/editor.main'], function () {
        monaco.editor.defineTheme('smara', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#171717',
            'editorLineNumber.foreground': '#8b8b8b',
            'editorCursor.foreground': '#171717',
            'editor.lineHighlightBackground': '#171717'
          }
        });

        const container = document.getElementById("editor" + currentId);
        if (container) {
          const editor = monaco.editor.create(container, {
            value: codeText,
            language: lang,
            ...config
          });
          // Ajuste dinámico del alto del editor según el contenido (máximo 500px)
          const ajustarAlto = () => {
            const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
            const lineCount = editor.getModel().getLineCount();
            const altura = lineHeight * lineCount;
            container.style.height = `${altura}px`;
            editor.layout(); // Aplicar nuevo alto
            if (altura > 500) {
              container.style.height = `500px`;
              editor.layout(); // Aplicar nuevo alto
            }

          };

          // Llamar al cargar
          ajustarAlto();
          scroll.scrollTop = scroll.scrollHeight;
          // Escuchar cambios en el contenido
          editor.onDidChangeModelContent(() => {
            ajustarAlto();
          });
          // Activar Emmet para HTML, CSS y JSX
          emmetMonaco.emmetHTML(monaco);
          emmetMonaco.emmetCSS(monaco);
          emmetMonaco.emmetJSX(monaco);
          id++


        } else {
          console.error("No se encontró el contenedor:", "editor" + currentId);
        }
      });


    });

  }
  id++;
  console.log(chat_property)

}

function reemplazarCierrePersonalizado(markdown) {
  // Busca coincidencias como </ texto >
  return markdown.replace(/-!-\s*(.+?)\s*-!-/g, (match, texto) => {
    console.log(texto.trim())
    chat_property[actual_chat].titule = texto.trim()
    return "";
  });
}


const imageInput = document.getElementById('imageInput');
imageInput.addEventListener('change', function (event) {
  $(".wssw").innerHTML = ""
  console.log("Cargando imagen")
  $("#submit").setAttribute("disabled", "true")
  $(".wssw").classList.add("hidden", "mt-[-60px]", "xl:mt-[-80px]")
  $(".ssww").classList.remove("rounded-3xl")
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      $(".wssw").classList.remove("hidden")
      $("#submit").removeAttribute("disabled")

      imgage_url = e.target.result
      let imagen = document.createElement("img")
      src = e.target.result
      imagen.classList.add("w-[40px]", "m-2", "mt-4", "rounded-3xl", "h-[40px]")
      $(".ssww").classList.remove("rounded-3xl")
      imagen.src = e.target.result

      $(".wssw").appendChild(imagen)
      imagen.addEventListener("click", e => {
        $(".ssww").classList.add("rounded-3xl")
        $(".wssw").classList.remove("mt-[-60px]", "xl:mt-[-80px]")
        $(".wssw").classList.add("hidden")
        $(".wssw").innerHTML = ""
        imgage_url = ""
        imagen.remove()
      })
      imageInput.value = ""
    }

    reader.readAsDataURL(file);
  }

})

$("#des").addEventListener("click", e => {
  aside = true
  $("#des").classList.add("hidden")

  $(".ws").classList.remove("hidden")
  $(".ws2").classList.remove("hidden")
  $(".contaside").classList.add("w-[.1px]")
  $(".contaside").classList.remove("w-[300px]", "min-w-[300px]", "max-sm:w-[55%]")

})