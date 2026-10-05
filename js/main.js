document.querySelector('#press').addEventListener('click', getName)

function getName(){

  const anime=document.querySelector("#anime").value
  const game=document.querySelector("#game").value
  const color=document.querySelector("#color").value
  const sport=document.querySelector("#sport").value
  const food=document.querySelector("#food").value

  fetch(`/api?anime=${anime}&game=${game}&color=${color}&sport=${sport}&food=${food}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#generatedName").textContent = `Your Wu-Tang name is: ${data.name}`
    });
}
