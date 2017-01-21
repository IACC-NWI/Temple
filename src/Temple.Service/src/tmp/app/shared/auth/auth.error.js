"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AuthError = (function (_super) {
    __extends(AuthError, _super);
    function AuthError(message) {
        _super.call(this, message);
        this.name = AuthError.ERROR_NAME;
        this.message = message;
    }
    AuthError.ERROR_NAME = 'AuthenticationError';
    return AuthError;
}(Error));
exports.AuthError = AuthError;

//# sourceMappingURL=auth.error.js.map
