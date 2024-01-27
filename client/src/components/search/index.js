import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

export default function SearchPost() {
    const [keyword, setKeyword] = useState("");

    const dispatch = useDispatch();

    const onClickSearchPost = useCallback((e) => {
        if (keyword !== "") {
            dispatch(
                actions.getPosts.getPostsRequest({ searchValue: keyword })
            );
            setKeyword("");
        }
    });

    const onKeySearchPost = e => {
        if (e.key === "Enter") {
            onClickSearchPost();
        }
    }

    return (
        <>
            <div class="d-flex" role="search">
                <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onKeyDown={onKeySearchPost}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    class="btn btn-outline-success"
                    type="submit"
                    onClick={onClickSearchPost}
                >
                    Recherche
                </button>
            </div>
        </>
    );
}
