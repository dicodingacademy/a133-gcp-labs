/**
 *
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as stackdriver from '../../types/stackdriver';
export declare class StatusMessage implements stackdriver.StatusMessage {
    refersTo: stackdriver.Reference;
    description: stackdriver.FormatMessage;
    isError: boolean;
    /**
     * Status Message to be sent to the server
     * @constructor
     */
    constructor(refersTo: stackdriver.Reference, description: string, isError: boolean);
    static readonly UNSPECIFIED: stackdriver.Reference;
    static readonly BREAKPOINT_SOURCE_LOCATION: stackdriver.Reference;
    static readonly BREAKPOINT_CONDITION: stackdriver.Reference;
    static readonly BREAKPOINT_EXPRESSION: stackdriver.Reference;
    static readonly VARIABLE_NAME: stackdriver.Reference;
    static readonly VARIABLE_VALUE: stackdriver.Reference;
    static readonly BREAKPOINT_AGE: stackdriver.Reference;
}
