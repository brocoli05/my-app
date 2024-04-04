import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtWorkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  // decrease the value of page by 1 (if page > 1)
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  //increase the value of page by 1 (if page < artworkList.length)
  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtWorkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  //If the 'artworkList' state value is null / undefined, simply render null
  if (!artworkList) {
    return null;
  }

  return (
    <>
      {artworkList.length > 0 && (
        <Row className="gy-4">
          {artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      )}

      {artworkList.length === 0 && (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for something else.
          </Card.Body>
        </Card>
      )}

      {artworkList.length > 0 && (
        <Row className="gy-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
