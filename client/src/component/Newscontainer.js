
import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import TrendingNews from './Trending';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import './css/Newscontainer.css';
import InfiniteScroll from "react-infinite-scroll-component";

const Newscontainer = ({ apikey, q, pagesize = 8, setprogress, category }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editorialLinks, setEditorialLinks] = useState([]);

    // Fetch news articles from API
    const fetchNews = async (pageNumber = 1) => {
        try {
            setprogress(10);
            setLoading(true);
            // const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apikey}&page=${pageNumber}&pagesize=${pagesize}`;
            const url=`http://localhost:5000/user/api/news?q=${q}&page=${pageNumber}&pagesize=${pagesize}`
             setprogress(30);
            const res = await fetch(url);
            const data = await res.json();
            setprogress(70);
            if (pageNumber === 1) {
                setArticles(data.articles);
            } else {
                setArticles(prev => [...prev, ...data.articles]);
            }
            setTotalResults(data.totalResults);
            setLoading(false);
            setprogress(100);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    // Initial fetch on mount or query change
    useEffect(() => {
        fetchNews(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);

    // Load more articles for infinite scroll
    const fetchMoreData = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchNews(nextPage);
    };

    // Get editorial links from localStorage once
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('editorialLinks')) || [];
        setEditorialLinks(stored);
        // console.log("Loaded from localStorage:", stored);

    }, []); // this stays a fixed array

    // Filter last 3 editorial links by category
    const categoryEditorialLinks = editorialLinks
        .filter(link => link.category === category)
        .slice(-5)
        .reverse(); // latest first
        // console.log("categoryEditorialLinks", categoryEditorialLinks); 

        // console.log("Filtered for category:", category, categoryEditorialLinks);

    return (
        <>
              {loading && <Spinner />}

              <div className="news-container-wrapper"> {/* ✅ Flex container */}
                <div className="trending-left">
                    <TrendingNews newsList={categoryEditorialLinks} />
                </div>
              <div className="main-news-right">
            {Array.isArray(articles) && (
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className=" d-flex flex-column align-items-center">
                
                    {articles.map((element, idx) => (
                        <div className="col-md-5 my-2 newsitem" key={idx}>
                            <Newsitem
                                name={element.source.name}
                                author={element.author}
                                time={element.publishedAt}
                                title={element.title ? element.title.slice(0, 44) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage || 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png'}
                                newsUrl={element.url}
                            />
                        </div>
                    ))}
                    </div>
            </InfiniteScroll>

            )}
            </div>
        </div>
        </>
    );
};

Newscontainer.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
    setprogress: PropTypes.func.isRequired,
};

export default Newscontainer;
