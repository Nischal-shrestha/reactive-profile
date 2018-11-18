export const base_url = window.location.origin.toString();
export const base_api_url = base_url + "/api";

export const login_url = base_api_url + "/auth/login";
export const login_headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

export const register_url = base_api_url + "/auth/register";
export const register_headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

export const logout_url = base_api_url + "/auth/logout";

export const user_data_url = base_api_url + "/auth/me";

export const refresh_token_url = base_api_url + "/auth/refresh";

export const user_data_id_url = base_api_url + "/auth/user/";
