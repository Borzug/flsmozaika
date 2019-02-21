import { HOST, parentIDs } from "../appRouter";
import { IPage } from "../components/contracts";
import { ICredentials } from "../store/actions/userActions";
import { IUserProfile } from "../store/reducers/initialState";

const api = {
    getNews(perPage = 100, search = "", page = 1): Promise<IPage[]> {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&search=${search}`)
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((e) => reject(e));
        });
    },

    getMoreNews(perPage = 100, search = "", page = 1, offset?: number, exclude = 0) {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}/wp-json/wp/v2/posts?offset=${offset}&page=${page}&per_page=${perPage}&search=${search}`)
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((e) => reject(e));
        });
    },

    getNewsCount() {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}/wp-json/wp/v2/posts?per_page=1`)
                .then((response) => response.headers.get("x-wp-total"))
                .then((count) => resolve(count || "0"))
                .catch((e) => reject(e));
        });
    },

    getPages(search = "", exclude = "0", parentExclude = parentIDs.archiveArticles) {
        return new Promise<IPage[]>((resolve, reject) => {
            fetch(`${HOST}/wp-json/wp/v2/pages?per_page=100&search=${search}&exclude=${exclude}&parent_exclude=${parentExclude}`)
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((e) => reject(e));
        });
    },

    getFavorites(search = "") {
        return new Promise<IPage[]>((resolve, reject) => {
            fetch(`${HOST}/wp-json/wp/v2/pages?per_page=100&search=${search}&parent=${parentIDs.archiveArticles}`)
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((e) => reject(e));
        });
    },

    signup<T>({ username, password, email, name, employment, meta }: IUserProfile): Promise<T> {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}/custom-api/get_nonce/?controller=user&method=register`)
                .then((response) => response.json())
                .then((json) => {
                    fetch(
                        // tslint:disable-next-line:max-line-length
                        `${HOST}/custom-api/user/register/?username=${username}&email=${email}&nonce=${json.nonce}&display_name=${name}&user_pass=${password}&description=${employment}&notify=no&seconds=100`
                    )
                        .then((response) => response.json())
                        .then((dataJson) => {
                            resolve(dataJson);
                        })
                        .catch((error) => window.console.log(error));
                })
                .catch((error) => reject(error));
        });
    },

    login<T>({ username, password }: ICredentials): Promise<T> {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/wp-json/jwt-auth/v1/token`,
                {
                    headers: {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            )
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch((error) => reject(error));
        });
    },

    getUserData(token: string) {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/wp-json/wp/v2/users/me?context=edit`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                }
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json().then((json) => resolve(json));
                    } else {
                        return response.json().then((json) => reject(json));
                    }
                });
        });
    },

    setDefaultUserMeta(cookie: string) {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/custom-api/user/update_user_meta/?cookie=${cookie}&meta_key=subscriber&meta_value=1`
            );
        });
    },

    validateToken(token: string) {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/wp-json/jwt-auth/v1/token/validate`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    if (json.code === "jwt_auth_valid_token") {
                        resolve(true);
                    }
                    resolve(false);
                })
                .catch((error) => reject(error));
        });
    },

    updateUser(user: IUserProfile, token: string) {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/wp-json/wp/v2/users/me`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(
                        {
                            nickname: user.nickname,
                            name: user.name,
                            email: user.email,
                            description: user.description,
                            meta: {
                                subscriber: user.meta!.subscriber
                            }
                        }
                    )
                }
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json().then((json) => resolve(json));
                    } else {
                        return response.json().then((json) => reject(json));
                    }
                });
        });
    },

    retrievePassword(username: string) {
        return new Promise((resolve, reject) => {
            fetch(
                `${HOST}/custom-api/user/retrieve_password/?user_login=${username}`
            )
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === "ok") {
                        resolve(json);
                    } else {
                        reject("no_username_selected");
                    }
                })
                .catch((error) => window.console.log(error));
        });
    }
};

export { api };
