import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import Link from "next/link";
import useSWR from "swr";
import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Error from "next/error";
import { addToFavourites, removeFromFavourites } from "../lib/userData";

export default function ArtWorkCard({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  // const [showAdded, setShowAdded] = useState("favouritesList.includes(objectID)");
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  const favouritesClicked = async () => {
    if (showAdded) {
      // Remove objectID from favouritesList
      await removeFromFavourites(objectID);
      setFavouritesList((current) => current.filter((fav) => fav !== objectID));
    } else {
      // Add objectID to favouritesList
      await addToFavourites(objectID);
      setFavouritesList((current) => [...current, objectID]);
    }
    setShowAdded(!showAdded);
  };

  // To ensure that SWR only starts the request for Artwork Card Detail if it has an objectID
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  //If an "error" occurs when making the SWR request, render the "Error" component from "next/error"
  if (error) {
    return <Error statusCode={404} />;
  }

  //If the SWR request doesn't return data (but is not in error), simply return null
  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            primaryImage ||
            `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`
          }
          alt={title || `N/A`}
        />
        <Card.Body>
          <Card.Title>{title || `N/A`}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {objectDate || `N/A`}
            <br />
            <strong>Classification: </strong>
            {classification || `N/A`}
            <br />
            <strong>Medium: </strong>
            {medium || `N/A`}
            <br />
            <br />
            <strong>Artist: </strong>
            {artistDisplayName || `N/A`}{" "}
            {artistWikidata_URL && (
              <>
                ({" "}
                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                  wiki
                </a>{" "}
                )
              </>
            )}
            <br />
            <strong>Credit Line: </strong>
            {creditLine || `N/A`}
            <br />
            <strong>Dimensions: </strong>
            {dimensions || `N/A`}
          </Card.Text>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
