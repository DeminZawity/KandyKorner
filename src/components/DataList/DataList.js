import { useEffect, useState } from "react";
import "./DataList.css";

export const DataList = () => {
  const [locations, findLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/locations`)
      .then((response) => response.json())
      .then((locationArray) => {
        findLocations(locationArray);
      });
  }, []);

  return (
    <>
    
      <h3>You Can Find Us At:</h3>

      <article className="locations">
        {locations.map((location) => {
          return (
            <section className="location">
              <header>Store Number : {location.id}</header>
              <div> Address : {location.address}</div>
              <footer>Square Footage : {location.sqFootage}</footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
