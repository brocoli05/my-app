import { getFavourites, getHistory } from "../lib/userData";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";

const PUBLIC_PATHS = ["/register"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

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

  useEffect(() => {
    updateAtoms();
  }, []);

  return <>{props.children}</>;
}
