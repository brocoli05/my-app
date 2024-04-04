import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";
import { Button, Card } from "react-bootstrap";

export default function ArtWorkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  //If an "error" occurs when making the SWR request, render the "Error" component from "next/error"
  if (error) {
    return <Error statusCode={404} />;
  }

  //If the SWR request doesn't return data (but is not in error), simply return null
  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            primaryImageSmall ||
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
          </Card.Text>
          <Link href={`/artwork/${objectID}`} passhref="true">
            <Button variant="primary">
              <strong>ID: </strong>
              {objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
