export function hideCreatePost() {
  const accessToken = localStorage.getItem("accessToken");
  const createPost = document.getElementById("hideID");  

  if (!accessToken) {
    createPost.classList.add("d-none");    
  } else if (createPost) {
    createPost.classList.remove("d-none");
  }  
};
