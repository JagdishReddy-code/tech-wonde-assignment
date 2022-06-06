import { ConsoleLogger } from '@nestjs/common';

/**
 * A base abstract class which should be extended by any injectables.
 *
 * @author Jagdish Reddy
 */
export abstract class BaseService {

    /**
     * To prevent DDOS attach, the user should not be able to make more than this number of database records in
     * pagination.
     * @private
     */
    private static readonly PAGINATION_LIMIT_FOR_DDOS = 100;

    protected logger = new ConsoleLogger(this.constructor.name);

}
