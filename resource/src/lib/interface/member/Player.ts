export interface IPlayer {
  extra?: { device: 0; domain: string; end_at: string; ip: string; start_at: string };
  user?: {
    alias: string;
    bankrupt: Boolean;
    birthday: string;
    blacklist_modified_at: string;
    checked: boolean;
    client_os: string;
    content_rating: Boolean;
    created_at: string;
    created_city: string;
    created_country: string;
    created_ip: string;
    currency: string;
    custom: Boolean;
    custom_image: string;
    default: Boolean;
    display_vip: Boolean;
    domain: string;
    email: string;
    enable: Boolean;
    err_num: string;
    failed: Boolean;
    first_deposit: Boolean;
    gender: Boolean;
    has_bind_agent: Boolean;
    id: string;
    image: Boolean;
    ingroup_transfer: Boolean;
    last_city_id: string;
    last_country: string;
    last_ip: string;
    last_login: string;
    last_online: string;
    locked: Boolean;
    login_at: string;
    login_city: string;
    login_city_id: string;
    login_country: string;
    login_ip: string;
    modified_at: string;
    name: string;
    parent: string;
    password_expire_at: string;
    password_reset: string;
    phone: string;
    qq_num: string;
    show_alias: Boolean;
    show_promotion: Boolean;
    show_real_time: Boolean;
    sub: Boolean;
    tied: Boolean;
    tied_at: string;
    upper_id: string;
    user_id: string;
    username: string;
    weixin: string;
    withdraw_verify: Boolean;
  };
}
