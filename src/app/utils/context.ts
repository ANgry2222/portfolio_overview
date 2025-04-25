import { createContext } from "react";
import { IShortAssetProps } from "../components/ShortAsset/ShortAsset";

export const CurrenciesContext = createContext<IShortAssetProps[]>([]);

export default CurrenciesContext;
