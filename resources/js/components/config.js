export const base_url = window.location.origin.toString();

export const login_url = base_url + "/api/auth/login";
export const login_headers = {
    "Content-Type": "application/json"
};

export const logout_url = base_url + "/api/auth/logout";
