class Accueil {
    static logout() {
        window.localStorage.removeItem("token");
        window.location.href = "/auth";
    }
}