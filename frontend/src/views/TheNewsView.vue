<script setup>
import NewsCategory from "@/components/news/NewsCategory.vue";
import { getNewsList } from "@/api/news.js";
import { ref, onMounted } from "vue";

const jeonseList = ref([]); // 사무실 -> 전세
const wolseList = ref([]); // 주택 -> 월세
const realEstateList = ref([]); // 상가 -> 부동산
const rebuildList = ref([]); // 주식 -> 재건축

const loading = ref(true);

// 현재 날짜를 가져오기
const currentDate = ref(
  new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
);

const getNews = async () => {
  try {
    jeonseList.value = (await getNewsList("%EC%A0%84%EC%84%B8")).slice(0, 5);
    wolseList.value = (await getNewsList("%EC%9B%94%EC%84%B8")).slice(0, 5);
    realEstateList.value = (await getNewsList("%EB%B6%80%EB%8F%99%EC%82%B0")).slice(0, 5);
    rebuildList.value = (await getNewsList("%EC%9E%AC%EA%B1%B4%EC%B6%95")).slice(0, 5);

    console.log("officeList.value........................:", jeonseList.value);
    console.log("houseList.value........................:", wolseList.value);
    console.log("retailList.value........................:", realEstateList.value);
    console.log("stockList.value........................:", rebuildList.value);
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getNews();
});
</script>

<template>
  <div class="cont">
    <div class="inner">
      <header class="title">
        <h2>오늘의 뉴스</h2>
        <p>{{ currentDate }}</p>
      </header>
      <section class="news-section title-container" v-if="!loading">
        <div class="news-grid">
          <div class="box">
            <NewsCategory v-if="jeonseList.length" title="전세" :news-items="jeonseList" />
          </div>
          <div class="box">
            <NewsCategory v-if="wolseList.length" title="월세" :news-items="wolseList" />
          </div>
          <div class="box">
            <NewsCategory
              v-if="realEstateList.length"
              title="부동산"
              :news-items="realEstateList"
            />
          </div>
          <div class="box">
            <NewsCategory v-if="rebuildList.length" title="재건축" :news-items="rebuildList" />
          </div>
        </div>
      </section>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  display: flex;
  justify-content: center;
}
.cont .inner {
  width: 80vw;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  overflow: hidden;
}

.header {
  background-color: #7468b6;
  color: white;
  text-align: center;
  padding: 10px 0; /* 패딩을 줄여 높이 감소 */
  border-radius: 10px;
}

.title {
  height: 10vh;
  flex-direction: column;
  align-content: center;
  margin-top: 50px;
  margin-bottom: 15px;
  padding-top: 3px;
  padding-bottom: 3px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #7468b6;
  text-align: center;
  color: white;
  border-radius: 10px; /* 모서리를 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.title h2 {
  margin: 0;
}
.title p {
  margin: 0;
}

.news-section {
  margin-top: 10px; /* 마진 감소 */
}

.news-grid {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  height: 100%;
  gap: 10px;
}

.box {
  flex: 1 1 50%; /* 너비와 높이를 각각 50%로 설정하여 4등분 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%; /* 높이를 전체 화면의 절반으로 설정 */
}

.loading {
  text-align: center;
  font-size: 1.5em;
  margin-top: 20px;
}
</style>
