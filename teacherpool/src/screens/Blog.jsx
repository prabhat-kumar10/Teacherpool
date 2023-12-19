import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../styles/Blog.css";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = () => {
    fetch(
      "https://blog.apps.secureserver.net/v1/website/a0fb218c-b6ac-43bb-8f77-eaa26520a828/feed"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        setData(data.feed);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <>
      <NavBar />
      <div className="blog-body">
        <div className="search-box">
          <span>Blogs from Teacher Pool</span>
          <input
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
        {data.length > 0 && searchInput.length > 1
          ? filteredResults.map((blog) => {
            return (
              <Card
                image={blog.featuredImage}
                date={blog.date.substring(0, 10)}
                title={blog.title}
                content={blog.content}
                categories={blog.categories}
              />
            );
          })
          : data.map((blog) => (
            <Card
              image={blog.featuredImage}
              date={blog.date.substring(0, 10)}
              title={blog.title}
              content={blog.content}
              categories={blog.categories}
            />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
