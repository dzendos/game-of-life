/**
 * Game Of Life API
 * The game of life api that allows you to compute the next state of some population.  ### Check out its features:  * Send the state of the game to evaluate 🧬 * Send query to change number of replicas 📈 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from './ApiClient';
import MapInner from './model/MapInner';
import ConfigurationApi from './api/ConfigurationApi';
import LogicApi from './api/LogicApi';


/**
* The game of life api that allows you to compute the next state of some population.  ### Check out its features:  * Send the state of the game to evaluate 🧬 * Send query to change number of replicas 📈 .<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var GameOfLifeApi = require('index'); // See note below*.
* var xxxSvc = new GameOfLifeApi.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new GameOfLifeApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new GameOfLifeApi.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new GameOfLifeApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The MapInner model constructor.
     * @property {module:model/MapInner}
     */
    MapInner,

    /**
    * The ConfigurationApi service constructor.
    * @property {module:api/ConfigurationApi}
    */
    ConfigurationApi,

    /**
    * The LogicApi service constructor.
    * @property {module:api/LogicApi}
    */
    LogicApi
};