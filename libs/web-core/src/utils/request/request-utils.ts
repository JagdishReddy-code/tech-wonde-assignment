/**
 * A utility class around HTTP request & response.
 * @author Jagdish Reddy
 */
export class RequestUtils {

    private static readonly SENSITIVE_FIELDS = [
        'password',
        'newPassword',
        'currentPassword',
    ];

    /**
   * Mask the given request data to obfuscate sensitive information like password or credit card number. This is
   * helpful in logging the data.
   *
   * @param data The data to mask.
   * @return Obfuscated data to log.
   */
    static mask(data: Record<string, any>): Record<string, any> {
    // Clone object to avoid updating the same
        const obfuscateRequest = JSON.parse(JSON.stringify(data));

        Object.keys(obfuscateRequest).forEach((key) => {
            if (obfuscateRequest[key]) {
                if (obfuscateRequest[key].constructor.name === 'Object') {
                    obfuscateRequest[key] = this.mask(obfuscateRequest[key]);
                } else if (this.SENSITIVE_FIELDS.includes(key)) {
                    obfuscateRequest[key] = '*******';
                }
            }
        });

        return obfuscateRequest;
    }

}
