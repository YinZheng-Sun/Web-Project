import Single from './Single';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
declare function create(ecModel: GlobalModel, api: ExtensionAPI): Single[];
declare const singleCreator: {
    create: typeof create;
    dimensions: string[];
};
export default singleCreator;
