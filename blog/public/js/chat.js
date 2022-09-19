const userList = document.getElementById('users')
const messageListWrapper = document.getElementById('message-list-wrapper')
const form = document.getElementById('chat-form')
const input = document.getElementById('chat-input')

const socket = io()

let user, selectedUser

socket.on('user_connected', data => {
  user = data
  console.log(user)
})

socket.on('message', data => {
  addMessage(data)
})

getPersons().then(persons => {
  persons.forEach(person => createUserChat(person))
})

form.addEventListener('submit', event => {
  event.preventDefault()

  if (!input.value) return

  if (!selectedUser) {
    return alert('Please select a user for start chatting')
  }

  const data = {
    from: user.id,
    to: selectedUser.id,
    message: input.value
  }

  socket.emit('message', data)
  input.value = ''
  input.focus()
})

function addMessage (data, type = 'append', scrollElement) {
  const message = document.createElement('div')
  message.classList.add('message')

  const text = document.createElement('text')
  text.textContent = data.message

  const time = document.createElement('div')
  time.textContent = data.createdAt
  time.classList.add('time')

  message.appendChild(text)
  message.appendChild(time)

  message.setAttribute('message-id', data.id)

  if (data.from === user.id) {
    message.classList.add('owner')
  }

  const elementId = user.id === data.from ? data.to : data.from

  const messages = document.getElementById(`messages-${elementId}`)

  if (type === 'append') {
    messages.appendChild(message)
  } else {
    messages.prepend(message)
  }

  if (scrollElement) {
    scrollElement.scrollIntoView()
  } else {
    messages.scrollTop = messages.scrollHeight
  }
}

function createUserChat (person) {
  const userWrapper = document.createElement('div')
  userWrapper.textContent = person.username
  userWrapper.addEventListener('click', event => {
    selectedUser = person
    document.querySelector('#users > .active')?.classList.remove('active')
    document.querySelector('.message-list.active')?.classList.remove('active')

    event.target.classList.add('active')

    const messages = document.getElementById(`messages-${person.id}`)
    messages.classList.add('active')

    loadMessage(messages)
  })

  userList.append(userWrapper)

  const messageWrapper = document.createElement('div')
  messageWrapper.setAttribute('id', `messages-${person.id}`)
  messageWrapper.classList.add('message-list')
  messageWrapper.addEventListener('scroll', event => {
    const element = event.target
    if (element.scrollTop === 0) {
      loadMessageByScroll(element)
    }
  })

  messageListWrapper.appendChild(messageWrapper)
}

function getPersons () {
  return fetch('/api/person').then(response => response.json())
}

function loadMessage (messageWrapper) {
  if (messageWrapper.childNodes.length) return

  getMessage().then(messages => {
    messages.forEach(message => addMessage(message, 'prepend'))
  })
}

function loadMessageByScroll (messageWrapper) {
  const { firstChild } = messageWrapper
  const messageId = firstChild.getAttribute('message-id')

  getMessage({ messageId }).then(messages => {
    messages.forEach(message => addMessage(message, 'prepend', firstChild))
  })
}

function getMessage (options) {
  const url =
    `/api/message?` +
    new URLSearchParams({
      selectedUser: selectedUser.id,
      ...options
    })

  return fetch(url).then(response => response.json())
}
