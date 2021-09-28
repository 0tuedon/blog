// ***script.js(Client file)***
$(document).ready(function(){
  
    $('#ajaxGetReq').on('click',(e)=>{
        $.ajax({
            type:'GET',
            url:'/1234567890Jsonfile',
            contentType:"application/json",
            success:(data)=>{
                console.log(data);
               let posts = data
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
                console.log(error);
            },
            complete:()=>{
                console.log('In the Complete Function')
            }
            
                
            })
           
            
        })
    })

