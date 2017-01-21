var urlRoot = window.location.protocol + '//' + window.location.host;

settings = {
    authority: 'http://localhost:30020/identity/.well-known/openid-configuration',
    client_id: 'iacc-nwi-temple',
    redirect_uri: urlRoot + '/',
    response_type: 'id_token token',
    scope: 'openid profile iacc-temple',
    silent_redirect_uri: urlRoot + '/silentcallback.html',
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: false,
    popup_redirect_uri: urlRoot + '/callback.html',
    post_logout_redirect_uri: urlRoot + '/logout',
    metadata: {
        issuer: 'http://identity.iacc-nwi',
        authorization_endpoint: 'http://localhost:30020/identity/connect/authorize',
        userinfo_endpoint: 'http://localhost:30020/identity/connect/userinfo',
        end_session_endpoint: 'http://localhost:30020/identity/connect/endsession',
        jwks_uri: 'http://localhost:30020/identity/.well-known/jwks'
    }
};
SERVICE_URL = {
    TEMPLE_SERVICE : 'http://localhost:30010'
}