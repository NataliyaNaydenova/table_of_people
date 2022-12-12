import { useState, useEffect } from "react";
import "./TableOfPeople.css";

const ENDPOINT = "http://apis.chromeye.com:9191";

function TableOfPeople() {
  const [data, setData] = useState([]);
  const [viewPerPage, setViewPerPage] = useState("3");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    return fetch(`${ENDPOINT}/people`)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setResult(data?.slice((page-1) * viewPerPage, viewPerPage === "all" ? data.length : page * viewPerPage ));    
  }, [data, viewPerPage, page]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Department</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {result
            .map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img src={`${ENDPOINT}${item.avatar.url}`} alt="avatar" />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.company.name}</td>
                  <td>{item.company.department}</td>
                  <td>{item.company.startDate}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
            <button onClick={() => {return page > 1 ? setPage(page-1) : ""}}>Prev</button>
            {page}
            <button onClick={() => {return page < (data.length / viewPerPage) ? setPage(page+1) : ""}}>Next</button>
            
            <select onChange={(e) => {setViewPerPage(e.target.value)}}>
              <option>3</option>
              <option>5</option>
              <option>all</option>
            </select>
      </div>
    </div>
  );
}

export default TableOfPeople;
