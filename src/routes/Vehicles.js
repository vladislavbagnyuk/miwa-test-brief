import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import NavButton from "../components/NavButton";
import Button from "../components/styledComponents/Button";
import Vehicle from "../components/Vehicle";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [allVehicles, setAllVehicles] = useState([]);
  const [currentVehicles, setCurrentVehicles] = useState([]);
  // 30 is too much in this example, there is not enough vehicles with shared vehicleClass for pagination it that case
  const vehiclesOnPage = 3;

  // Query for loading vehicles
  const { loading, error, data } = useQuery(gql`
    {
      allVehicles {
        vehicles {
          name
          maxAtmospheringSpeed
          cargoCapacity
          vehicleClass
        }
      }
    }
  `);

  useEffect(() => {
    // If vehicles loaded
    if (loading === false && !error && data) {
      // Sorting vehicles by speed, because this API doesn't have server-side sorting
      const allFetchedVehicles = data.allVehicles.vehicles.filter(
        (vehicle) => vehicle.vehicleClass === "repulsorcraft"
      );
      allFetchedVehicles.sort(
        (a, b) => a.maxAtmospheringSpeed < b.maxAtmospheringSpeed
      );
      // It would by much better to use pagination provided by GraphQL,
      // but this API doesn't support server-side sorting, so I have to fetch everything,
      // sort it and then split into pages
      if (allFetchedVehicles.length > vehiclesOnPage) {
        const numberOfPages = Math.ceil(
          allFetchedVehicles.length / vehiclesOnPage
        );
        setMaxPage(numberOfPages);
      }
      setAllVehicles(allFetchedVehicles);
      const newVehicles = allFetchedVehicles.slice(0, vehiclesOnPage);
      setCurrentVehicles(newVehicles);
    }
  }, [loading, data, error]);

  const changePage = (currentPage) => {
    // Show characters for next page
    let newVehicles = [...allVehicles];
    newVehicles.splice(0, vehiclesOnPage * (currentPage - 1));
    newVehicles = newVehicles.slice(0, vehiclesOnPage);
    setCurrentVehicles(newVehicles);
  };

  const nextPage = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      if (newPage <= maxPage) {
        changePage(prevPage + 1);
        return newPage;
      } else {
        return prevPage;
      }
    });
  };

  const previousPage = () => {
    setPage((prevPage) => {
      if (prevPage > 1) {
        const newPage = prevPage - 1;
        changePage(newPage);
        return newPage;
      } else {
        return prevPage;
      }
    });
  };

  return (
    <div>
      <h1>Vehicles</h1>
      <NavButton link="/">Back</NavButton>
      {currentVehicles.map((vehicle) => (
        // It would be better to use vehicle.id, but in this API all ID's are the same, so they are useless
        <Vehicle key={vehicle.name} {...vehicle} />
      ))}
      {maxPage && (
        <div>
          <Button onClick={previousPage} disabled={page === 1}>
            Previous page
          </Button>
          {page}
          <Button onClick={nextPage} disabled={page === maxPage}>
            Next page
          </Button>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
