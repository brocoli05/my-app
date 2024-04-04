import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import Link from "next/link";
import {
  NavDropdown,
  Navbar,
  Nav,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import { addToHistory } from "../lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

function NavScrollExample() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);

    let searchField = e.target.search?.value;

    // let queryString = `title=true&q=${searchField}`;
    // setSearchHistory((current) => [...current, queryString]);
    // Update search history atom with addToHistory function
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));

    router.push(`/artwork?title=true&q=${searchField}`);
  };

  // "toggle" a Boolean value in JS using someBoolean = !someBoolean
  const toggleExpanded = () => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  // Close the navbar on nav link click
  const handleLinkClick = (e) => {
    setIsExpanded(false);
  };

  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg fixed-top bg-dark"
        data-bs-theme="dark"
        expanded={isExpanded}
      >
        <Container fluid>
          <Navbar.Brand>Minji Kim</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={toggleExpanded}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={{ handleLinkClick }}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLinkClick}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  name="search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={handleLinkClick}
                >
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName}>
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      href="/favourites"
                      active={router.pathname === "/favourites"}
                      onClick={handleLinkClick}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      href="/history"
                      active={router.pathname === "/history"}
                      onClick={handleLinkClick}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/" passHref legacyBehavior>
                    <NavDropdown.Item href="/" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}
            &nbsp;
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLinkClick}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLinkClick}
                    active={router.pathname === "/login"}
                  >
                    Log In
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default NavScrollExample;
