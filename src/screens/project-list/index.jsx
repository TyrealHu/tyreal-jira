import {SearchPanel} from "./search-panel";
import {List} from "./list";
import * as qs from 'qs'
import {useEffect, useState} from "react";
import {cleanObject} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const [users, setUsers] = useState([])

    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
            if (response.ok) {
                let list = await response.json()
                setList(list)
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                let users = await response.json()
                setUsers(users)
            }
        })
    }, [])

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}/>
            <List users={users} list={list}/>
        </div>
    )
}
