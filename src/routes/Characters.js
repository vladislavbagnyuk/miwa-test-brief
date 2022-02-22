import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import NavButton from "../components/NavButton";
import Button from "../components/styledComponents/Button";
import Character from "../components/Character";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  // 30 is too much in this example, there is not enough characters with shared homeworld for pagination it that case
  const charactersOnPage = 3;

  // Query for loading vehicles
  const { loading, error, data } = useQuery(gql`
    {
      allPeople {
        people {
          name
          height
          birthYear
          homeworld {
            name
          }
        }
      }
    }
  `);

  useEffect(() => {
    // If vehicles loaded
    if (loading === false && !error && data) {
      // Filtering and sorting characters client-side, because this API doesn't have server-side sorting and filtering
      // This API also doesn't have age, only birth year
      const allFetchedCharacters = data.allPeople.people.filter(
        (character) => character.homeworld.name === "Tatooine"
      );
      allFetchedCharacters.sort((a, b) => a.birthYear > b.birthYear);
      if (allFetchedCharacters.length > charactersOnPage) {
        // It would by much better to use pagination provided by GraphQL,
        // but this API doesn't support server-side sorting, so I have to fetch everything,
        // sort it and then split into pages
        const numberOfPages = Math.ceil(
          allFetchedCharacters.length / charactersOnPage
        );
        setMaxPage(numberOfPages);
      }
      setAllCharacters(allFetchedCharacters);
      const newCharacters = allFetchedCharacters.slice(0, charactersOnPage);
      setCurrentCharacters(newCharacters);
    }
  }, [loading, data, error]);

  const changePage = (currentPage) => {
    let newCharacters = [...allCharacters];
    // Show characters for next page
    newCharacters.splice(0, charactersOnPage * (currentPage - 1));
    newCharacters = newCharacters.slice(0, charactersOnPage);
    setCurrentCharacters(newCharacters);
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
      <h1>Characters</h1>
      <NavButton link="/">Back</NavButton>
      {currentCharacters.map((character) => (
        // It would be better to use character.id, but in this API all ID's are the same, so they are useless
        <Character key={character.name} {...character} />
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

export default Characters;
