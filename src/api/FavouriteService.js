import http from "../http-common"

const getFavoriteByUid=(id) => {
    return http.get(`/favourite/${id}`)
}

const addtoFavorite=(data) => {
  return http.post("/favourite", data);
}

const removeFromFavorite=(id) => {
    return http.delete(`/favourite/${id}`)

}

export {
    getFavoriteByUid,
    addtoFavorite,
    removeFromFavorite
}