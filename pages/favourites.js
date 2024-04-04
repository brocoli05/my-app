import React from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  return (
    <>
      {favouritesList.length > 0 && (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}

      {favouritesList.length === 0 && (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      )}

      {favouritesList.length > 0 && (
        <Row className="gy-4">
          <Col className="d-flex justify-content-center"></Col>
        </Row>
      )}
    </>
  );
}
