class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {

          throw new Error(`Error: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error("Error en deleteCard:", error); 
        throw error; 
      });
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
      });
  }
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => this._checkResponse(res))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_08",
  headers: {
    authorization: "cebd400e-cb13-478f-a576-1969697c9570",
    "Content-Type": "application/json",
  },
});
