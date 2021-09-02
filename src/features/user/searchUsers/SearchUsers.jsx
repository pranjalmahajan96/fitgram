import { useState } from "react"

export const SearchUsers = () => {

    const [search, setSearch] = useState("");
    
    return <div>
        <input type="text" placeholder="search users" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
}