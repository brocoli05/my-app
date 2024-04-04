import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai"; // Importing useAtom hook
import { favouritesAtom, searchHistoryAtom } from "../store"; // Importing atoms
import { getFavourites, getHistory } from "../lib/userData"; // Importing functions from userData.js

export default function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistoryL, setSearchHistory] = useAtom(searchHistoryAtom);

  // Function to update atoms with data from backend
  async function updateAtoms() {
    try {
      // Fetch favourites and history from backend
      const favourites = await getFavourites();
      const history = await getHistory();

      // Update atoms with fetched data
      setFavouritesList(favourites);
      setSearchHistory(history);
    } catch (error) {
      console.error("Error updating atoms:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      // Once authenticated successfully, invoke updateAtoms function
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
