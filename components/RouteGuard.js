import { getFavourites, getHistory } from "../lib/userData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const handleRouteChange = async (url) => {
      await authCheck(url);
    };

    const authCheck = async (url) => {
      const path = url.split("?")[0];
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        router.push("/login");
      } else {
        setAuthorized(true);
        try {
          const favourites = await getFavourites();
          const history = await getHistory();
          setFavouritesList(favourites);
          setSearchHistory(history);
        } catch (err) {
          console.log("Error fetching user data:", err);
        }
      }
    };
    authCheck(router.asPath);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setFavouritesList, setSearchHistory]);

  return authorized ? children : null;
}
