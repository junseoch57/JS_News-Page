// const API_KEY = `696e0d245c8c4603ab6d3a1b5a332335`; 원래 api키

let newsList = [];

const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
                        
    const response = await fetch(url); // fetch로 url 데이터 요청   
    const data = await response.json();

    newsList = data.articles;
    
    render(); // newsList가 확정된 다음 써야함
    console.log("dddd", newsList);

};

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

getLatestNews();

// 코드 추가 필요...

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };