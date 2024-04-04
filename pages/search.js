import React from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import { addToHistory } from "../lib/userData";

export default function AdvancedSearch() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitForm = async (data) => {
    let queryString = "";
    const { q, searchBy, geoLocation, medium, isHighlight, isOnView } = data;

    // Append searchBy parameter
    queryString +=
      `${searchBy}=true` +
      (geoLocation ? `&geoLocation=${geoLocation}` : "") +
      (medium ? `&medium=${medium}` : "") +
      `&isOnView=${isOnView || false}` +
      `&isHighlight=${isHighlight || false}` +
      `&q=${q || false}`;

    // Redirect to /artwork with the generated queryString
    router.push(`/artwork?${queryString}`);

    // Add queryString value to the searchHistory
    // setSearchHistory((current) => [...current, queryString]);
    setSearchHistory(await addToHistory(queryString));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                {...register("q", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select
              name="searchBy"
              className="mb-3"
              {...register("searchBy")}
            >
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="geoLocation"
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;,
                &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                &quot;New York&quot;, etc.), with multiple values separated by
                the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="medium"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;,
                &quot;Furniture&quot;, &quot;Paintings&quot;,
                &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
