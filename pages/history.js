import React from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "../lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    // setSearchHistory((current) => {
    //   let x = [...current];
    //   x.splice(index, 1);
    //   return x;
    // });
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <>
      <Card>
        <Card.Body>
          {parsedHistory.length === 0 ? (
            <h4>Nothing Here. Try searching for some artwork.</h4>
          ) : (
            <ListGroup>
              {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item
                  key={index}
                  className={styles.historyListItem}
                  onClick={(e) => historyClicked(e, index)}
                >
                  {Object.keys(historyItem).map((key) => (
                    <span key={key}>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </span>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
