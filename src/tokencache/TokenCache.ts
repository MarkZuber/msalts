import { ITokenCacheInternal } from "./ITokenCacheInternal";

export class TokenCache implements ITokenCacheInternal {
    public RemoveAccountAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
