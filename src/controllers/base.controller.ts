import { ConsoleLogger, Controller, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

/**
 * Base controller to be extended by every controller.
 *
 * @author Jagdish Reddy
 * @since 0.0.1
 */
@Controller()
export abstract class BaseController {

    protected logger = new ConsoleLogger(this.constructor.name);

    @Inject(REQUEST) private request: Record<string, unknown>;

    protected get headers(): Record<string, any> {
        return this.request.headers;
    }

    /**
   * Write the given data to HTTP response.
   *
   * @param data The data to respond.
   * @return The data to respond
   * @protected
   */
    protected respond(data: any): any {
        return data;
    }

}
