/**
 * @description Basic Data to respond to login.
 * @author Jagdish Reddy
 * @since 0.0.1
 */
export class BasicDataDto {

    accessToken?: string;

    constructor(accessToken?: string) {
        this.accessToken = accessToken;
    }

}
