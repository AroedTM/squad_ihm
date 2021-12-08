class Accueil {
    static logout() {
        try {
            window.localStorage.removeItem("auth_token");
        } catch (error) {
            console.log("auth_token doesn't exist");
        }
        window.location.href = "/auth";
    }
}