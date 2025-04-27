
renderihistori()
const renderer = new marked.Renderer();
renderer.image = function (href) {
  return `<img src="${href.href}" class="mi-clase-de-imagen w-64 h-64 object-cover gradient-loading" draggable="false"> `;
};
marked.use({ renderer: renderer });

async function generativetext(text, idloader) {

  try {
    if (imgage_url) {
      contexto.push({
        role: "user",
        "content": [
          {
            "type": "text",
            "text": text,
          },
          {
            "type": "image_url",
            "image_url": {
              "url": imgage_url
            },
          },
        ],
      });

      imgage_url = false
      $(".ssww").classList.add("rounded-3xl")
      $(".wssw").classList.add("hidden")

    } else {
      chat_property[actual_chat].chatcontexto.push({ role: "user", content: text })
      contexto.push({ role: "user", content: text }); // Se agrega el mensaje del usuario antes de la petición

    }




    // Se agrega el mensaje del usuario antes de la petición



    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "gemini-2.0-flash",
        messages: [

          ...contexto,]
      })
    });
    const data = await response.json();


    let mensajeIA = data.choices?.[0]?.message?.content || "No hubo respuesta.";
    contexto.push({ role: "assistant", content: mensajeIA });
    chat_property[actual_chat].chatcontexto.push({ role: "assistant", content: mensajeIA })

    rendermensaje(mensajeIA, "assistant")
    renderihistori()
  } catch (err) {
    console.error("Error al hacer la petición:", err);
  }
}










form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;
  rendermensaje(msg, "user")
  generativetext(msg, id);

  id++
});
newCHAT()






$(".closet").addEventListener("click", () => {
  document.querySelector(".asiderun").classList.add("w-[0%]");
  document.querySelector(".asiderun").classList.remove("w-[70%]");

  $("#priview").srcdoc = ""
  document.querySelector(".asiderun").classList.remove("max-md:w-[100vw]");



})

