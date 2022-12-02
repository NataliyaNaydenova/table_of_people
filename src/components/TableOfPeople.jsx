import { useState, useEffect } from "react";
import "./TableOfPeople.css";

const ENDPOINT = "http://apis.chromeye.com:9191";

function TableOfPeople() {
  const [data, setData] = useState([]);
  const [viewPerPage, setViewPerPage] = useState("3");

  const fetchData = () => {
    return fetch(`${ENDPOINT}/people`)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {data
            ?.splice(0, viewPerPage === "all" ? data.length : viewPerPage)
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
      {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> */}
    </div>
  );
}

export default TableOfPeople;
