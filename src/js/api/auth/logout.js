export function logout() {
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName');
if (accessToken) {  
  document.getElementById('logout-btn').classList.remove('d-none');
} 

document.getElementById('logout-btn').addEventListener('click', function () { 
  localStorage.removeItem('accessToken'); 
  localStorage.removeItem('userName');
  localStorage.removeItem('avatar');
  this.classList.add('d-none');   
  window.location.href = '../index.html';
});  
}

logout();
