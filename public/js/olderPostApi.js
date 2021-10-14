// AXIOS
let  page = []
const getHtmlContent = (data)=>{
    console.log(data.data.results);
    let posts = data.data.results
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
            <hr>`
        mainhtml.push(htmlContent)        
            $('#extra').html(mainhtml) 
        })
        
}
let olderPostBtn = document.querySelector("#ajaxGetReq");
const olderPost = async ()=>{
    let pages = '1'
    page.push(pages)
    let currentPage = {page:page.length}
    let paramsType = {header:{Accept:"application/json"},params:{currentPage:currentPage.page}}
    let data = await axios.get('/1234567890Jsonfile',paramsType)
    const finalData = getHtmlContent (data);
    finalData;
}

const getMorePost = async ()=>{
    await olderPost();
}

olderPostBtn.addEventListener('click', getMorePost)