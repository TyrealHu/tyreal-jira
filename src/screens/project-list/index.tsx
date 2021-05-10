import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debounceParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        let users = await response.json();
        setUsers(users);
      }
    });
  });

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        let list = await response.json();
        setList(list);
      }
    });
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
