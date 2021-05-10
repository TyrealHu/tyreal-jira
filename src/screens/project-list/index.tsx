import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { useTFetch } from "../../utils/http";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const tFetch = useTFetch();

  const debounceParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useMount(async () => {
    let users = await tFetch("users");
    setUsers(users);
  });

  useEffect(() => {
    tFetch("projects", { data: cleanObject(debounceParam) }).then((list) => {
      setList(list);
    });
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
