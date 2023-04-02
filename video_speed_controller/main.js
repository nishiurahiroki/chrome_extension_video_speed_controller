const buttons = document.getElementById('buttons')

Array
  .from({length: (10 - 1) / 0.5 + 1}, (_, i) => (i * 0.5) + 1)
  .forEach((number) => {
    const newButton = document.createElement('button')
    newButton.textContent = '>> ' + number
    newButton.setAttribute('data-speed', number)

    buttons.appendChild(newButton)
  });

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click',async (e) => {
    const speed = Number(e.target.getAttribute('data-speed'))

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target:{tabId:tab.id},
      func:changeSpeed,
      args : [speed]
    })
  })
})
function changeSpeed(speed)
{
  document.querySelector('video').playbackRate = speed
}

document.getElementById('close').addEventListener('click', () => window.close())