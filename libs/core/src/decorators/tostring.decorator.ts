/**
 * A custom class developer decorator to generate a {@link Object#toString()} method to print. Usage-
 *
 * <code>
 * <pre>
 *     @ToString(['id', 'name'])
 *     export class User {
 *
 *         id: string;
 *         name: string;
 *         email: string;
 *
 *     }
 * </pre>
 * </code>
 * @param fields
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ToString(fields: string[]) {
    return function (target: any) {
        target.prototype.toString = function () {
            const fieldRepresentation = fields
                .map((field) => `${field}=${this[field]}`)
                .join(',');
            return `${target.name}{${fieldRepresentation}}`;
        };
    };
}
