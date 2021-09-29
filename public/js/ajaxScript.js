

// ***script.js(Client file)***
$(document).ready(function(){
   let  page = []
      
            $('#ajaxGetReq').on('click',(e)=>{
                let pages = '1'
                page.push(pages)
                let currentPage = {page:page.length}
                $.ajax({
                    type:'GET',
                    data:$.param(currentPage),
                    url:'/1234567890Jsonfile',
                    contentType:"application/json",
                    currentPage:currentPage,
                    success:(data)=>{
                       let posts = data.results
                       let mainhtml = []
                      posts.forEach(post => {
                        let htmlContent =
                        `<div class="post-preview">
                            <a href="/post/${post._id}">
                                <h2 class="post-title">
                                    ${post.title}
                                </h2>
                                <h3 class="post-subtitle">
                                    ${post.description}
                                </h3>
                            </a>
                            <p class="post-meta">Posted by
                                <a href="#"><em>${post.username}<em></a>
                                ${post.date}
                            </p>
                        </div>
                        <hr>
                        `
                        mainhtml.push(htmlContent)
        
                            $('#extra').html(mainhtml) 
                      })
                      
                    },
                    error:(error)=>{
                      reject(error)
                    },
                    complete:()=>{
                       
                    }
                    
                        
                    })
                   
                    
                })
            })

        
    

