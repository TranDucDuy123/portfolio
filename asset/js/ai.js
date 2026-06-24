const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Tư vấn cho tôi về website",
    page: {
      title: document.title,
      url: window.location.href,
      content: document.body.innerText.slice(0, 3000)
    }
  })
});

const data = await response.json();
console.log(data.reply);