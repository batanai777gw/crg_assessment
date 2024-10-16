import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    // Fetching data from the Timeline.php endpoint
    fetch("https://arthurfrost.qflo.co.za/php/getTimeline.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setTimelineData(jsonData.Timeline);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Calculating the index of the first and last item for the current page for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = timelineData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(timelineData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="content">
        <ul className="card">
          {currentItems.map((item) => (
            <li className="item" key={item.Id}>
              <img
                className="image"
                src={`https://arthurfrost.qflo.co.za/${item.Image}`}
                alt={item.Title}
                width="100"
              />
              <div className="content">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      padding: "20px",
                      width: "45%",
                      height: "200px",
                    }}
                  >
                    <h3 className="title">
                      <span className="label">Title : </span>
                      {item.Title}
                    </h3>
                    <h3 className="title">
                      <span className="label">Media Name: </span>
                      {item.MediaName}
                    </h3>
                    <h3 className="title">
                      <span className="label">Media: </span>
                      {item.Media}
                    </h3>
                    <h3 className="title">
                      <span className="label">Createed Date: </span>
                      {item.CreateDate}
                    </h3>
                  </div>

                  <div
                    style={{
                      padding: "20px",
                      width: "45%",
                      height: "200px",
                    }}
                  >
                    <h3 className="title">
                      <span className="label">Epoch: </span>
                      {item.Epoch}
                    </h3>
                    <h3 className="title">
                      <span className="label">Status: </span>
                      {item.Status}
                    </h3>
                    <h3 className="title">
                      <span className="label">Status: </span>
                      {item.Status}
                    </h3>
                    <h3 className="title">
                      <span className="label">isActive?: </span>
                      {item.isActive}
                    </h3>
                    <h3 className="title">
                      <span className="label">Remote ID: </span>
                      {item.RemoteId}
                    </h3>
                  </div>
                </div>
                <h3
                  className="title"
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <span className="label">Audio Size: </span>
                  {item.AudioSize}
                </h3>

                <audio controls style={{ marginTop: "15px" }}>
                  <source
                    src={`https://arthurfrost.qflo.co.za/${item.Audio}`}
                    type="audio/mpeg"
                  />
                </audio>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <div style={{ marginTop: "20px" }}>
          <button
            className="paginationbtn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px", color: "#f5911e" }}>
            Page {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(timelineData.length / itemsPerPage)
            }
            className="paginationbtn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
