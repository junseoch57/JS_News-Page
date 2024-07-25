// const API_KEY = `696e0d245c8c4603ab6d3a1b5a332335`; 원래 api키

let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))  // forEach(배열함수)
);

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);

let totalResults = 0 
let page = 1
const pageSize = 10
const groupSize = 5

const getNews = async() => { // getNews : 뉴스를 다시 가져옴

  try {
    // url을 호출하기 전에 붙인 다음에 호출을 해야함

    // 받는 url 뒤에다 page,pageSize를 더 붙이고 fetch를 함
    url.searchParams.set("page",page) // &page = page   
    url.searchParams.set("pageSize",pageSize) 

    const response = await fetch(url); // fetch로 url 데이터 요청  

    const data = await response.json();
    console.log("Ddd",data);

    if (response.status == 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search") // 검색 결과 없을 경우
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    }
    else{
      throw new Error(data.message);
    }
    
  } catch (error) {
      errorRender(error.message); // errorRender 함수를 호출할때마다 error.message를 매개변수로 보내줌 
  }
  
  
}

const getLatestNews = async () => {
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
                        
    getNews();
    
   // render(); // newsList가 확정된 다음 써야함
};

const getNewsByCategory = async (event) => {

    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
      getNews();

}

const getNewsByKeyword = async() => {

  const keyword = document.getElementById("search-input").value
  
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`);
  // `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}` 
      getNews();

}

const render = () => {
    const newsHTML = newsList.map(news =>`  <div class="row news">
        <!--가로줄-->
        <div class="col-lg-4">
          <!--컬럼의 화면이 large 사이즈면 4을 줌-->
          <img class="news-img-size" src = "${news.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkdGbj-QrUuNqhXP7DtY3-t8yD6H1Tk4uFg&s'}"/>
        </div>     <!--이미지가 없으면 no image라는 사진을 보여줌 -->

        <div class="col-lg-8">
          <!--컬럼의 화면이 large 사이즈면 4을 줌-->
          <h2>${news.title}</h2>
          <p>
              ${news.description}
          </p>  
          <div>
              ${news.source.name} * ${news.publishedAt} 
          </div>
        </div>
      </div>`).join(''); // array를 String으로

    document.getElementById("news-board").innerHTML = newsHTML;
    // 어디에 뉴스들을 붙여야 하는지
}

const errorRender = (errorMessage) => { // 매개변수 errorMessage를 받아옴
  const errorHTML = `<div class="alert alert-danger" role="alert"> 
    ${errorMessage}
  </div>`; // js이기 때문에 HTML에 넣어줘야함
  document.getElementById("news-board").innerHTML = errorHTML;
}

const paginationRender = () => {
    // totalResult
    // page(내가 속한 페이지)
    // pageSize
    // groupSize(pagination을 몇 개씩 보여주는지)

    // totalPages
    const totalPages = Math.ceil(totalResults / pageSize);

    // pageGroup(내가 몇 번째 그룹에 속해있는지)
    const pageGroup = Math.ceil(page/groupSize); // 올림
    // lastPage
    const lastPage = pageGroup * groupSize;
    // 마지막 페이지그룹이 그룹사이즈보다 작다? lastPage = totalPage
    if(lastPage > totalPages){
      lastPage = totalPages;
    }

    // firstPage
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = ``

    for(let i = firstPage; i <= lastPage ; i++){
      paginationHTML += `<li class="page-item ${i === page ? "active" : ""}  "onclick = "moveToPage(${i})"><a class="page-link">${i}</a></li>`
    } // i 값 전달


    document.querySelector(".pagination").innerHTML = paginationHTML = `
    <li class="page-item ${page === 1 ? "disabled" : ""}"><a class = "page-link" onclick = "moveToPage(1)">&lt;&lt;</a></li>
    <li class="page-item ${page === 1 ? "disabled" : ""}"><a class = "page-link" onclick = "moveToPreviousPage()">&lt;</a></li>  
    ${paginationHTML}
    <li class="page-item ${page === totalPages ? "disabled" : ""}"><a class = "page-link" onclick = "moveToNextPage()">&gt;</a></li>
    <li class="page-item ${page === totalPages ? "disabled" : ""}"><a class = "page-link" onclick = "moveToPage(${totalPages})">&gt;&gt;</a></li>`

  //   <nav aria-label="Page navigation example">
  //    <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  //  </nav>

}

const moveToPage = (pageNum) => {  // 보낸 i를 pageNum로 받음
  console.log("move", pageNum);
  page = pageNum;
  getNews();  // getNews에 pageNum의 정보를 같이 줘야함

}

const moveToNextPage = () => {
  const totalPages =  Math.ceil(totalResults / pageSize);
  if (page < totalResults){
    page = page + 1;
    getNews();
  }
}

const moveToPreviousPage = () => {
  if(page > 1) { 
    page = page - 1; 
    getNews();
  }
}


getLatestNews();

// 코드 추가 필요...

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  // 1. 버튼들에 클릭이벤트 주기
  // 2. 카테고리별 뉴스 가져오기
  // 3. 그 뉴스 보여주기