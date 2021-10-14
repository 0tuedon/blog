$(document).ready(()=>{
// Get and changed the share button when Liked
$("#likeButton").on('click',()=>{
    $("#likeButton").toggleClass('btn-primary')
    $('#likeButton').toggleClass('btn-outline-primary');
    let postId = $("#postId").text();
    $.ajax({
       type:'POST',
       data:{postId:postId},
       url:'/post/like'
    })
})

})



function increaseLikes(){

}