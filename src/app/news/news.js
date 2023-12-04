import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

const News = ({ articles }) => {
  // State to hold the articles
  const [newsArticles, setNewsArticles] = useState(articles);

  useEffect(() => {
    // Function to fetch news data
    const fetchNews = async () => {
      try {
        const response = await fetch("YOUR_NEWS_API_ENDPOINT");
        const data = await response.json();
        // Set the fetched articles in state
        setNewsArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {/* Display fetched articles */}
        {newsArticles.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Fetch initial data on the server-side
export async function getServerSideProps() {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=Apple&from=2023-12-02&sortBy=popularity&apiKey=509d626dcb8b4818acad7e42ea773a8e"
    );
    const data = await response.json();
    return {
      props: {
        articles: data.articles,
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: {
        articles: [], // Set an empty array if fetching fails
      },
    };
  }
}

export default News;
