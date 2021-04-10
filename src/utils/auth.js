import vue from 'vue'

const userInfo = 'mt-username'

export function getInfo() {
  return vue.$cookies.get(userInfo);
  // return localStorage.getItem(userInfo)
}

export function setInfo(username) {
  return vue.$cookies.set(userInfo, username);
  // return localStorage.setItem(userInfo, username)
}

export function removeInfo() {
  return vue.$cookies.remove(userInfo);
  // return localStorage.removeItem(userInfo)
}