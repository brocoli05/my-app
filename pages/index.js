/*********************************************************************************
 *  WEB422 – Assignment 6
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: __Minji Kim__ Student ID: __112030226__ Date: __APR/04/2024__
 *
 *  Vercel App (Deployed) Link: _____________________________________________________
 *
 ********************************************************************************/

import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import MainNav from "@/components/MainNav";

export default function Home() {
  return (
    <>
      <MainNav></MainNav>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="Metropolitan Museum of Art"
        fluid
        rounded
      />
      <Row className="mt-3">
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art (The Met) is one of the largest and
            most comprehensive art museums in the world. It is located in
            Central Park, NYC. The museum&apos;s collection spans over 5,000
            years of art from various cultures and civilizations.
          </p>
        </Col>

        <Col md={6}>
          <p>
            The Met&apos;s mission is to collect, preserve, study, exhibit, and
            encourage appreciation for works that collectively represent the
            broad spectrum of human achievement and creativity. Explore the rich
            history and diverse art forms housed within The Met.
          </p>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <p>
            Learn more about The Metropolitan Museum of Art on{" "}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia
            </a>
            .
          </p>
        </Col>
      </Row>
    </>
  );
}
