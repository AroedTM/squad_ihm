class Accueil {
    static logout() {
        window.localStorage.removeItem("auth_token");
        window.location.href = "/auth";
    }
}